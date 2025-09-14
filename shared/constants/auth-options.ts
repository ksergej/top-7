import NextAuth, {AuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import {UserRole} from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/prisma/prisma-client";
import {compare, hashSync} from "bcrypt";
import toast from "react-hot-toast";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'E-Mail', type: 'text', placeholder: 'user@test.ru'},
        password: {label: 'Пароль', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) return null;

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) return null;

        if (!findUser.verified) return null;

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({token}) {

      if (!token.email) return token;

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = findUser.id.toString();
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({session, token}) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },

    async signIn({user, account}) {

      let result = false;

      try {
        if (account?.provider === 'credentials') {
          return result = true;
        }

        if (!user.email) {
          return result = true;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {provider: account?.provider, providerId: account?.providerAccountId},
              {email: user.email},
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return result = true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            phone: '1234567890',
          },
        });

        return result = true;
      } catch (error) {
        console.log('Error [SIGNIN]', error);
        return false;
      } finally {
      // TODO: это ничего не работает. нужно потом подумать как сделать по-другому ...
        // if (result) {
        //   toast.success('Вы успешно вошли в аккаунт', {
        //     icon: '✅',
        //   });
        // } else {
        //   toast.error('Не удалось войти', {
        //     icon: '❌',
        //   });
        // }
      }
    },
  },
};
