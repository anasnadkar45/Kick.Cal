import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      where: {
        competitionCode: "WC",
      },
      orderBy: {
        utcDate: "asc",
      },
    });

    return NextResponse.json({
      matches,
    });
  } catch (error) {
    console.error("Fetch matches error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch matches",
      },
      { status: 500 }
    );
  }
}