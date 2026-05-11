import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    return NextResponse.json({
      voted: !!vote,
      region: vote?.region || null,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        voted: false,
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}