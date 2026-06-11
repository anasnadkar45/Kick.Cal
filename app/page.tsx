import { Suspense } from "react";
import Schedule from "@/components/Schedule";
import ScheduleSkeleton from "@/components/ScheduleSkeleton";

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground">
            FIFA World Cup
          </p>
          <h1 className="text-2xl font-bold">Match Schedule</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your favourite matches directly to Google Calendar.
          </p>
        </div>

        <Suspense fallback={<ScheduleSkeleton />}>
          <Schedule />
        </Suspense>
      </div>
    </main>
  );
}