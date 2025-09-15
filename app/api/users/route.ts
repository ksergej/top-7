import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {Prisma} from "@prisma/client";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  let user;
  try {
    user = await prisma.user.create({data});
  } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            return NextResponse.json(
              {error: `Duplicate value for field: ${error.meta?.target}`},
              {status: 400}
            );
          }
        }
    console.error('Error creating user:', error);
    throw error;
  }
  return NextResponse.json(user);
}