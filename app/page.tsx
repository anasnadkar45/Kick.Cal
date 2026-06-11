import { Suspense } from "react";
import Link from "next/link";
import Schedule from "@/components/Schedule";
import ScheduleSkeleton from "@/components/ScheduleSkeleton";
import { CalendarPlusIcon, MagnifyingGlassIcon, BellRingingIcon } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Hero / App Purpose Section */}
        <section className="mb-10 rounded-[42px] border bg-card p-6 text-card-foreground shadow-sm corner-squircle md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">
              KickCal
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              FIFA World Cup match schedule with Google Calendar alarms.
            </h1>

            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              KickCal helps football fans view upcoming FIFA World Cup fixtures,
              search matches by team, and add match reminders directly to Google
              Calendar so they do not miss important games.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border bg-background p-5 corner-squircle">
              <CalendarPlusIcon weight="duotone" size={28} />
              <h2 className="mt-4 font-semibold">View match schedule</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse FIFA World Cup fixtures with match date and time shown in
                Indian Standard Time.
              </p>
            </div>

            <div className="rounded-3xl border bg-background p-5 corner-squircle">
              <BellRingingIcon weight="duotone" size={28} />
              <h2 className="mt-4 font-semibold">Add calendar alarms</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Add selected matches to your Google Calendar with match reminder
                notifications.
              </p>
            </div>

            <div className="rounded-3xl border bg-background p-5 corner-squircle">
              <MagnifyingGlassIcon weight="duotone" size={28} />
              <h2 className="mt-4 font-semibold">Search by team</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Quickly find matches by team and avoid adding duplicate calendar
                events.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>

            <Link href="/terms" className="text-primary underline">
              Terms & Conditions
            </Link>

            <a
              href="mailto:anasnadkar23@gmail.com"
              className="text-primary underline"
            >
              Contact Support
            </a>
          </div>
        </section>

        {/* Schedule Section */}
        <section>
          <div className="mb-6">
            <p className="text-sm font-medium text-muted-foreground">
              FIFA World Cup
            </p>

            <h2 className="text-2xl font-bold">Match Schedule</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your favourite matches directly to Google Calendar.
            </p>
          </div>

          <Suspense fallback={<ScheduleSkeleton />}>
            <Schedule />
          </Suspense>
        </section>
      </div>
    </main>
  );
}