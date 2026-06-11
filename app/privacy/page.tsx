import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">KickCal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: June 2026
          </p>
        </div>

        <div className="space-y-6 rounded-[32px] border bg-card p-6 text-card-foreground shadow-sm corner-squircle md:p-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              KickCal helps users view sports schedules and add match reminders
              to their Google Calendar. This Privacy Policy explains what
              information we collect, how we use it, and how we protect it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              When you use KickCal, we may collect basic account information
              such as your name, email address, and profile image when you sign
              in using Google. We may also store match reminder details such as
              the match ID and Google Calendar event ID to prevent duplicate
              calendar entries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">
              3. Google Calendar Access
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              KickCal requests Google Calendar permission only to create match
              reminders in your calendar and check whether a match reminder has
              already been added. We do not read unrelated calendar events for
              advertising or profiling purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. How We Use Your Data</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We use your information to authenticate your account, add match
              reminders to your calendar, avoid duplicate reminders, improve the
              app experience, and maintain app security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Data Sharing</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We do not sell your personal data. Your data may be processed by
              trusted service providers required to run the app, such as
              authentication, database, hosting, and Google Calendar services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Data Retention</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We keep your account and reminder data only as long as needed to
              provide the service. You may request deletion of your data by
              contacting us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. Your Choices</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              You can revoke KickCal&apos;s Google access anytime from your
              Google Account permissions page. You can also stop using the app
              or request account data deletion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">8. Security</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We use reasonable technical and organizational measures to protect
              your data. However, no online service can guarantee complete
              security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">9. Contact</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              If you have questions about this Privacy Policy, contact us at{" "}
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

          <Link href="/terms" className="font-medium text-primary underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </main>
  );
}