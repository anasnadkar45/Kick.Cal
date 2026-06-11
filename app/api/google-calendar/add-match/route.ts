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

    if (!matchId) {
      return NextResponse.json(
        { error: "Match id is required" },
        { status: 400 }
      );
    }

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
        {
          error:
            "Google Calendar access token not found. Please sign in again with Google Calendar permission.",
          needsGoogleReconnect: true,
        },
        { status: 401 }
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

    const startDate = new Date(match.utcDate);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const eventSummary = `KickCal: FIFA World Cup - ${
      match.homeTeamName || "TBD"
    } vs ${match.awayTeamName || "TBD"}`;

    const appEventKey = `kickcal-match-${match.id}`;

    let existingEvents;

    try {
      existingEvents = await calendar.events.list({
        calendarId: "primary",
        timeMin: new Date(startDate.getTime() - 10 * 60 * 1000).toISOString(),
        timeMax: new Date(endDate.getTime() + 10 * 60 * 1000).toISOString(),
        singleEvents: true,
        showDeleted: false,
        privateExtendedProperty: [`appEventKey=${appEventKey}`],
      });
    } catch (error: any) {
      console.error("Google Calendar list error:", error);

      if (error?.code === 401 || error?.status === 401) {
        return NextResponse.json(
          {
            error:
              "Google Calendar access expired or missing. Please sign in again with Google Calendar permission.",
            needsGoogleReconnect: true,
          },
          { status: 401 }
        );
      }

      throw error;
    }

    const existingCalendarEvent = existingEvents.data.items?.[0];

    if (existingCalendarEvent) {
      await prisma.calendarEvent.upsert({
        where: {
          userId_matchId: {
            userId: session.user.id,
            matchId,
          },
        },
        update: {
          googleEventId: existingCalendarEvent.id!,
          googleEventLink: existingCalendarEvent.htmlLink,
        },
        create: {
          userId: session.user.id,
          matchId,
          googleEventId: existingCalendarEvent.id!,
          googleEventLink: existingCalendarEvent.htmlLink,
        },
      });

      return NextResponse.json(
        {
          alreadyAdded: true,
          message: "This match is already added to your Google Calendar",
          calendarLink: existingCalendarEvent.htmlLink,
          googleEventId: existingCalendarEvent.id,
        },
        { status: 409 }
      );
    }

    let event;

    try {
      event = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: eventSummary,
          description: "Match reminder added from KickCal.",
          start: {
            dateTime: startDate.toISOString(),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: endDate.toISOString(),
            timeZone: "Asia/Kolkata",
          },
          extendedProperties: {
            private: {
              appEventKey,
              matchId: match.id,
              source: "kickcal",
            },
          },
          reminders: {
            useDefault: false,
            overrides: [
              {
                method: "popup",
                minutes: 30,
              },
              {
                method: "popup",
                minutes: 60,
              },
              {
                method: "popup",
                minutes: 120,
              },
              {
                method: "email",
                minutes: 60,
              },
            ],
          },
        },
      });
    } catch (error: any) {
      console.error("Google Calendar insert error:", error);

      if (error?.code === 401 || error?.status === 401) {
        return NextResponse.json(
          {
            error:
              "Google Calendar access expired or missing. Please sign in again with Google Calendar permission.",
            needsGoogleReconnect: true,
          },
          { status: 401 }
        );
      }

      throw error;
    }

    if (!event.data.id) {
      return NextResponse.json(
        { error: "Google Calendar event was created without an event id" },
        { status: 500 }
      );
    }

    await prisma.calendarEvent.upsert({
      where: {
        userId_matchId: {
          userId: session.user.id,
          matchId,
        },
      },
      update: {
        googleEventId: event.data.id,
        googleEventLink: event.data.htmlLink,
      },
      create: {
        userId: session.user.id,
        matchId,
        googleEventId: event.data.id,
        googleEventLink: event.data.htmlLink,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Match added to Google Calendar",
      calendarLink: event.data.htmlLink,
      googleEventId: event.data.id,
    });
  } catch (error) {
    console.error("Google Calendar error:", error);

    return NextResponse.json(
      { error: "Failed to add match to Google Calendar" },
      { status: 500 }
    );
  }
}