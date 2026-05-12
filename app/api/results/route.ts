import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const votes = await prisma.votes.groupBy({
      by: ["region"],
      _count: {
        region: true,
      },
    });

    return NextResponse.json(votes);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );

  }
}
