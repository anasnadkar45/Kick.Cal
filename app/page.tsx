"use client";

import { AddMatchAlarmButton } from "@/components/AddMatchAlarmButton";
import { formatIST, getISTMatchLabel } from "@/lib/utils";
import { useEffect, useState } from "react";

type Match = {
  id: string;
  utcDate: string;
  status: string;
  stage: string | null;
  group: string | null;
  homeTeamName: string | null;
  awayTeamName: string | null;
  homeScore: number | null;
  awayScore: number | null;
};

export default function WorldCupMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function getMatches() {
      const res = await fetch("/api/worldcup/matches");
      const data = await res.json();

      setMatches(data.matches || []);
    }

    getMatches();
  }, []);

  

  return (
    <div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Kolkata",
              }).format(new Date(match.utcDate))}
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="font-medium">{match.homeTeamName || "TBD"}</p>

              <p className="text-sm text-muted-foreground">
                {match.homeScore !== null && match.awayScore !== null
                  ? `${match.homeScore} - ${match.awayScore}`
                  : "vs"}
              </p>

              <p className="font-medium">{match.awayTeamName || "TBD"}</p>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {match.stage} {match.group ? `• ${match.group}` : ""}
            </p>

            <div className="rounded-2xl border p-4">
              <p className="text-sm text-muted-foreground">
                {formatIST(match.utcDate)} IST
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="font-semibold">{match.homeTeamName || "TBD"}</p>
                <p className="text-sm text-muted-foreground">vs</p>
                <p className="font-semibold">{match.awayTeamName || "TBD"}</p>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {getISTMatchLabel(match.utcDate)}
              </p>
              <AddMatchAlarmButton matchId={match.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}