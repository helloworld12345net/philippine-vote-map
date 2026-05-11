import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const votes = await prisma.vote.groupBy({
      by: ["region"],
      _count: {
        region: true,
      },
    });

    return NextResponse.json(votes);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}