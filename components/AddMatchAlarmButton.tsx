"use client";

import { useState } from "react";

export function AddMatchAlarmButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const [calendarLink, setCalendarLink] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function addMatchToCalendar() {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/google-calendar/add-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId }),
      });

      const data = await res.json();

      if (res.status === 409 && data.alreadyAdded) {
        setMessage("Already added to your Google Calendar");
        setCalendarLink(data.calendarLink || null);
        return;
      }

      if (!res.ok) {
        setMessage(data.error || "Failed to add match alarm");
        return;
      }

      setMessage("Match alarm added to Google Calendar");
      setCalendarLink(data.calendarLink || null);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={addMatchToCalendar}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Checking..." : "Add Match Alarm"}
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}

      {calendarLink && (
        <a
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-sm text-blue-600 underline"
        >
          Open in Google Calendar
        </a>
      )}
    </div>
  );
}