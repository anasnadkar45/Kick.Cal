import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">KickCal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: June 2026
          </p>
        </div>

        <div className="space-y-6 rounded-[32px] border bg-card p-6 text-card-foreground shadow-sm corner-squircle md:p-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              By using KickCal, you agree to these Terms & Conditions. If you do
              not agree, please do not use the app.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. About KickCal</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              KickCal provides sports schedules and allows users to add match
              reminders to their Google Calendar. The app is built to help fans
              follow upcoming matches more easily.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Account Sign In</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Some features require Google sign in. You are responsible for
              keeping your account secure and for all activity under your
              account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Calendar Reminders</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              When you add a match alarm, KickCal may create an event in your
              Google Calendar. You can edit or delete these events directly from
              your Google Calendar at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Accuracy of Information</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We try to keep match schedules accurate and updated, but we cannot
              guarantee that all dates, times, teams, venues, or statuses will
              always be correct. Match schedules may change due to official
              updates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. User Responsibilities</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              You agree not to misuse the app, interfere with its operation,
              attempt unauthorized access, or use KickCal for illegal or harmful
              purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Third-Party Services</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              KickCal uses third-party services such as Google Sign-In and
              Google Calendar. Your use of those services is also subject to
              their respective terms and policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              KickCal is provided on an &quot;as is&quot; basis. We are not
              responsible for missed matches, incorrect schedules, calendar
              issues, service interruptions, or any losses resulting from your
              use of the app.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Changes to Terms</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We may update these Terms & Conditions from time to time. Continued
              use of KickCal after changes means you accept the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">10. Contact</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              For questions about these Terms, contact us at{" "}
              <a
                href="mailto:anasnadkar23@gmail.com"
                className="font-medium text-primary underline"
              >
                anasnadkar23@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Back to home
          </Link>

          <Link href="/privacy" className="font-medium text-primary underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}