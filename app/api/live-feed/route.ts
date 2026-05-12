import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const votes = await prisma.votes.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return NextResponse.json(votes);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch live feed" },
      { status: 500 }
    );

  }
}
