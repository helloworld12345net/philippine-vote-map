import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { email, signature, region } = body;

    // VALIDATION
    if (!email || !signature || !region) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // CHECK IF EMAIL ALREADY VOTED
    const existingVote = await prisma.vote.findUnique({
      where: {
        email,
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "This email has already voted" },
        { status: 400 }
      );
    }

    // SAVE VOTE
    const vote = await prisma.vote.create({
      data: {
        email,
        signature,
        region,
      },
    });

    return NextResponse.json(vote);

} catch (error) {

  console.log(error);

  return NextResponse.json(
    {
      error: String(error),
    },
    { status: 500 }
  );

}  }
}
