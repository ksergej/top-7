import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/prisma/prisma-client";
import {compare, hash} from "bcrypt";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
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
          id: String(findUser.id),
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
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = findUser.id;
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },

  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    signingKey: process.env.NEXTAUTH_SECRET,
    encryptionKey: process.env.NEXTAUTH_SECRET,
  },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};