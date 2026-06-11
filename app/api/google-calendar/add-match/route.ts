import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { matchId } = await req.json();

    const match = await prisma.match.findUnique({
      where: {
        id: matchId,
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    const tokenData = await auth.api.getAccessToken({
      body: {
        providerId: "google",
      },
      headers: req.headers,
    });

    if (!tokenData?.accessToken) {
      return NextResponse.json(
        { error: "Google Calendar access token not found" },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2();

    oauth2Client.setCredentials({
      access_token: tokenData.accessToken,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const existingCalendarEvent = await prisma.calendarEvent.findUnique({
      where: {
        userId_matchId: {
          userId: session.user.id,
          matchId,
        },
      },
    });

    if (existingCalendarEvent) {
      return NextResponse.json(
        {
          alreadyAdded: true,
          message: "This match is already added to your Google Calendar",
          calendarLink: existingCalendarEvent.googleEventLink,
        },
        { status: 409 }
      );
    }

    const startDate = new Date(match.utcDate);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `FIFA World Cup: ${match.homeTeamName || "TBD"} vs ${match.awayTeamName || "TBD"
          }`,
        description: "Wake up! Match starts soon. Added from CupClock India.",
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 30,
            },
            {
              method: "email",
              minutes: 60,
            },
          ],
        },
      },
    });

    await prisma.calendarEvent.create({
      data: {
        userId: session.user.id,
        matchId,
        googleEventId: event.data.id!,
        googleEventLink: event.data.htmlLink,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Match added to Google Calendar",
      calendarLink: event.data.htmlLink,
    });
  } catch (error) {
    console.error("Google Calendar error:", error);

    return NextResponse.json(
      { error: "Failed to add match to Google Calendar" },
      { status: 500 }
    );
  }
}