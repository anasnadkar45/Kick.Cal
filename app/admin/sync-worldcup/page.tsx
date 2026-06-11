"use client";

import { useState } from "react";

export default function SyncWorldCupPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [totalMatches, setTotalMatches] = useState<number | null>(null);

  async function handleSync() {
    try {
      setLoading(true);
      setMessage("");
      setTotalMatches(null);

      const res = await fetch("/api/admin/sync-worldcup", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to sync World Cup schedule");
        return;
      }

      setMessage(data.message || "World Cup schedule synced successfully");
      setTotalMatches(data.totalMatches || 0);
    } catch (error) {
      setMessage("Something went wrong while syncing");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <p className="text-sm font-medium text-emerald-400">
          Admin Action
        </p>

        <h1 className="mt-2 text-2xl font-bold">
          Sync FIFA World Cup Schedule
        </h1>

        <p className="mt-3 text-sm text-slate-300">
          This will fetch the World Cup schedule from football-data.org and save
          or update all matches in your database.
        </p>

        <button
          onClick={handleSync}
          disabled={loading}
          className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Syncing..." : "Sync Schedule"}
        </button>

        {message && (
          <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm">{message}</p>

            {totalMatches !== null && (
              <p className="mt-2 text-sm text-slate-300">
                Total matches synced: {totalMatches}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}