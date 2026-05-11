import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({
        voted: false,
      });
    }

    const vote = await prisma.vote.findUnique({
      where: {
        userId,
      },
    });

    if (!vote) {
      return NextResponse.json({
        voted: false,
      });
    }

    return NextResponse.json({
      voted: true,
      region: vote.region,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}