import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { fingerprintId, signature, region } = body;

    // GET USER IP
    const forwardedFor = req.headers.get("x-forwarded-for");

    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "unknown";

    // VALIDATION
    if (!fingerprintId || !signature || !region) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // CHECK FINGERPRINT DUPLICATE
    const existingFingerprint = await prisma.votes.findUnique({
      where: {
        fingerprintId,
      },
    });

    if (existingFingerprint) {
      return NextResponse.json(
        { error: "This device has already voted" },
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
        { error: "This network has already voted" },
        { status: 400 }
      );
    }

    // SAVE VOTE
    const vote = await prisma.votes.create({
      data: {
        fingerprintId,
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
