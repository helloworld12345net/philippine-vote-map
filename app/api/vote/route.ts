import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { email, signature, region } = body;

    // GET USER IP
    const forwardedFor = req.headers.get("x-forwarded-for");

    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "unknown";

    // VALIDATION
    if (!email || !signature || !region) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // CHECK EMAIL DUPLICATE
    const existingEmailVote = await prisma.votes.findUnique({
      where: {
        email,
      },
    });

    if (existingEmailVote) {
      return NextResponse.json(
        { error: "This email has already voted" },
        { status: 400 }
      );
    }

    // CHECK IP DUPLICATE
    const existingIpVote = await prisma.votes.findFirst({
      where: {
        ipAddress,
      },
    });

    if (existingIpVote) {
      return NextResponse.json(
        { error: "This IP address has already voted" },
        { status: 400 }
      );
    }

    // SAVE VOTE
    const vote = await prisma.votes.create({
      data: {
        email,
        signature,
        region,
        ipAddress,
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

  }
}
