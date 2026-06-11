"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  CalendarPlusIcon,
  CheckCircleIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react";

type AddMatchCalendarResponse = {
  success?: boolean;
  alreadyAdded?: boolean;
  message?: string;
  calendarLink?: string | null;
  googleEventId?: string;
  error?: string;
  needsGoogleReconnect?: boolean;
};

export function AddMatchAlarmButton({ matchId }: { matchId: string }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calendarLink, setCalendarLink] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function addMatchToCalendar() {
    try {
      setMessage("");
      setCalendarLink(null);

      if (isPending) {
        setMessage("Checking login status...");
        return;
      }

      if (!session?.user) {
        setOpenLoginDialog(true);
        return;
      }

      setLoading(true);

      const res = await fetch("/api/google-calendar/add-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId }),
      });

      const data: AddMatchCalendarResponse = await res.json();

      if (res.status === 401 || data.needsGoogleReconnect) {
        setAlreadyAdded(false);
        setMessage(
          data.error ||
            "Google Calendar access expired. Please sign in again."
        );
        return;
      }

      if (res.status === 409 && data.alreadyAdded) {
        setAlreadyAdded(true);
        setMessage(data.message || "Already added to your Google Calendar");
        setCalendarLink(data.calendarLink || null);
        return;
      }

      if (!res.ok) {
        setAlreadyAdded(false);
        setMessage(data.error || "Failed to add match alarm");
        return;
      }

      setAlreadyAdded(true);
      setMessage(data.message || "Match added to Google Calendar");
      setCalendarLink(data.calendarLink || null);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return (
      <div className="mt-4">
        <Button
          disabled
          className="gap-2 rounded-2xl corner-squircle"
          size="lg"
        >
          Checking...
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4">
        <Button
          onClick={addMatchToCalendar}
          disabled={loading || isPending}
          className="gap-2 rounded-2xl corner-squircle"
          size="lg"
          variant={alreadyAdded ? "secondary" : "default"}
        >
          {loading || isPending ? (
            "Checking..."
          ) : alreadyAdded ? (
            <>
              <CheckCircleIcon weight="duotone" size={18} />
              Added to Calendar
            </>
          ) : (
            <>
              <CalendarPlusIcon weight="duotone" size={18} />
              Add Match Alarm
            </>
          )}
        </Button>

        {message && (
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        )}

        {calendarLink && (
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline"
          >
            Open in Google Calendar
            <ArrowSquareOutIcon weight="duotone" size={15} />
          </a>
        )}
      </div>

      <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              Please sign in to add this match alarm to your Google Calendar.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenLoginDialog(false)}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                setOpenLoginDialog(false);
                router.push("/login");
              }}
            >
              Sign in
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}