import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { region } = body;

    // Prevent duplicate votes
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId,
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You already voted" },
        { status: 400 }
      );
    }

    // Save vote
    const vote = await prisma.vote.create({
      data: {
        userId,
        region,
      },
    });

    return NextResponse.json(vote);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}   
