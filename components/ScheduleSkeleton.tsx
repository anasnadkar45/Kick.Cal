export default function ScheduleSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-44 animate-pulse rounded-full bg-muted" />
            </div>

            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          </div>

          <div className="mt-5 rounded-2xl border bg-muted/20 p-4">
            <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />

            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
              <div className="h-7 w-12 animate-pulse rounded-full bg-muted" />
              <div className="ml-auto h-5 w-24 animate-pulse rounded-full bg-muted" />
            </div>

            <div className="mt-3 h-3 w-40 animate-pulse rounded-full bg-muted" />
            <div className="mt-4 h-10 w-36 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}