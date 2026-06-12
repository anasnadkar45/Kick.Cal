import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import BottomBar from "@/components/layout/BottomBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KickCal - FIFA World Cup Match Schedule & Calendar Alarms",
    template: "%s | KickCal",
  },
  description:
    "KickCal helps football fans follow FIFA World Cup match schedules and add match alarms directly to Google Calendar.",
  keywords: [
    "KickCal",
    "FIFA World Cup",
    "World Cup schedule",
    "football match calendar",
    "match reminders",
    "Google Calendar sports",
    "football fixtures",
    "India football fans",
  ],
  authors: [
    {
      name: "Anas Nadkar",
      url: "https://anascodes.online",
    },
  ],
  creator: "Anas Nadkar",
  publisher: "KickCal",
  metadataBase: new URL(process.env.BETTER_AUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "KickCal - FIFA World Cup Match Schedule",
    description:
      "Follow FIFA World Cup fixtures and add match alarms directly to your Google Calendar.",
    url: "/",
    siteName: "KickCal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KickCal - FIFA World Cup Match Schedule",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KickCal - FIFA World Cup Match Schedule",
    description:
      "Add FIFA World Cup match alarms directly to your Google Calendar.",
    images: ["/og-image.png"],
    creator: "@NadkarAnas45",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Analytics/>
        <SpeedInsights/>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WM1EB7WKZY"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WM1EB7WKZY');
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}