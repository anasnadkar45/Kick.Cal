
import MatchList from "./MatchList";

export type Match = {
  id: string;
  utcDate: string;
  status: string;
  stage: string | null;
  group: string | null;
  homeTeamName: string | null;
  awayTeamName: string | null;
  homeScore: number | null;
  awayScore: number | null;
  homeTeamCrest:string | null;
  awayTeamCrest:string | null;
};

async function getMatches(): Promise<Match[]> {
  const baseUrl =
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/worldcup/matches`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch matches");
  }

  const data = await res.json();

  return data.matches || [];
}

export default async function Schedule() {
  const matches = await getMatches();

  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed p-8 text-center">
        <p className="font-medium">No matches found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Matches will appear here once the schedule is available.
        </p>
      </div>
    );
  }

  return (
    <div>
        <MatchList matches={matches as Match[]}/>
    </div>
  );
}