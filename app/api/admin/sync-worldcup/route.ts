import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

type FootballDataMatch = {
  id: number;
  utcDate: string;
  status: string;
  matchday?: number;
  stage?: string;
  group?: string;
  homeTeam: {
    id?: number;
    name?: string;
    crest?: string;
  };
  awayTeam: {
    id?: number;
    name?: string;
    crest?: string;
  };
  score: {
    winner?: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
};

export async function POST() {
  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches?season=2026",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY!,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();

      return NextResponse.json(
        {
          error: "Failed to fetch World Cup matches",
          status: res.status,
          details: errorText,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    const matches: FootballDataMatch[] = data.matches || [];

    for (const match of matches) {
      await prisma.match.upsert({
        where: {
          externalId: match.id,
        },
        update: {
          utcDate: new Date(match.utcDate),
          status: match.status,
          matchday: match.matchday ?? null,
          stage: match.stage ?? null,
          group: match.group ?? null,

          homeTeamId: match.homeTeam?.id ?? null,
          homeTeamName: match.homeTeam?.name ?? "TBD",
          homeTeamCrest: match.homeTeam?.crest ?? null,

          awayTeamId: match.awayTeam?.id ?? null,
          awayTeamName: match.awayTeam?.name ?? "TBD",
          awayTeamCrest: match.awayTeam?.crest ?? null,

          homeScore: match.score?.fullTime?.home ?? null,
          awayScore: match.score?.fullTime?.away ?? null,

          winner: match.score?.winner ?? null,
        },
        create: {
          externalId: match.id,
          competitionCode: "WC",

          utcDate: new Date(match.utcDate),
          status: match.status,
          matchday: match.matchday ?? null,
          stage: match.stage ?? null,
          group: match.group ?? null,

          homeTeamId: match.homeTeam?.id ?? null,
          homeTeamName: match.homeTeam?.name ?? "TBD",
          homeTeamCrest: match.homeTeam?.crest ?? null,

          awayTeamId: match.awayTeam?.id ?? null,
          awayTeamName: match.awayTeam?.name ?? "TBD",
          awayTeamCrest: match.awayTeam?.crest ?? null,

          homeScore: match.score?.fullTime?.home ?? null,
          awayScore: match.score?.fullTime?.away ?? null,

          winner: match.score?.winner ?? null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "World Cup schedule synced successfully",
      totalMatches: matches.length,
    });
  } catch (error) {
    console.error("World Cup sync error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while syncing World Cup matches",
      },
      { status: 500 }
    );
  }
}