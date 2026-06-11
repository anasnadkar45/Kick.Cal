"use client";

import { AddMatchAlarmButton } from "@/components/AddMatchAlarmButton";
import { formatIST, getISTMatchLabel } from "@/lib/utils";
import { Match } from "./Schedule";
import { CalendarDotsIcon, TrophyIcon } from "@phosphor-icons/react";
import { ScrollArea } from "./ui/scroll-area";
import { useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";

const MatchList = ({ matches }: { matches: Match[] }) => {
    const [searchInput, setSearchInput] = useState("");
    const groupedMatches = matches.reduce<Record<string, Match[]>>((acc, match) => {
        const dateKey = new Intl.DateTimeFormat("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            timeZone: "Asia/Kolkata",
        }).format(new Date(match.utcDate));

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        acc[dateKey].push(match);
        return acc;
    }, {});

    const filteredMatches = useMemo(() => {
        const input = searchInput.trim().toLowerCase()

        if (!input) {
            return groupedMatches
        }
        const filteredEntries = Object.entries(groupedMatches)
            .map(([date, dateMatches]) => {
                const filteredDateMatches = dateMatches.filter((match) => {
                    const homeTeam = match.homeTeamName?.toLowerCase() || "";
                    const awayTeam = match.awayTeamName?.toLowerCase() || "";

                    return homeTeam.includes(input) || awayTeam.includes(input);
                });

                return [date, filteredDateMatches] as const;
            })
            .filter(([, dateMatches]) => dateMatches.length > 0);

        return Object.fromEntries(filteredEntries);
    }, [groupedMatches, searchInput])
    const dates = Object.keys(filteredMatches);
    const [activeDate, setActiveDate] = useState(dates[0]);

    const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});

    function scrollToDate(date: string) {
        setActiveDate(date);

        dateRefs.current[date]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Schedule{" "}
                        <span className="text-sm font-medium text-muted-foreground">
                            {matches.length}
                        </span>
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        FIFA World Cup match alarms
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search team..."
                        className="w-full sm:max-w-xs rounded-2xl corner-squircle"
                    />                    {/* <button className="flex size-10 items-center justify-center rounded-2xl border bg-card text-card-foreground shadow-sm transition hover:bg-accent">
                        <CalendarDotsIcon weight="duotone" size={22} />
                    </button>

                    <button className="flex size-10 items-center justify-center rounded-2xl border bg-card text-card-foreground shadow-sm transition hover:bg-accent">
                        <TrophyIcon weight="duotone" size={22} />
                    </button> */}
                </div>
            </div>

            {/* Date Tabs */}
            <div className="sticky top-0 z-20 mb-7 bg-background py-3">
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-3 pb-2">
                        {dates.map((date) => {
                            const [weekday, day, month] = date.replace(",", "").split(" ");
                            const isActive = activeDate === date;

                            return (
                                <Button
                                    key={date}
                                    onClick={() => scrollToDate(date)}
                                    className={`h-auto min-w-[68px] flex-col rounded-4xl border px-3 py-3 text-center transition duration-300 corner-squircle ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-muted-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                        }`}
                                >
                                    <span className="text-xs font-medium">{weekday}</span>
                                    <span className="mt-1 text-lg font-bold leading-none">
                                        {day}
                                    </span>
                                    <span className="mt-1 text-[10px] uppercase">{month}</span>
                                </Button>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>

            {/* Timeline */}
            <div className="relative space-y-10">
                <div className="absolute left-[15px] top-0 h-full w-px bg-border" />

                {Object.entries(filteredMatches).map(([date, dateMatches]) => (
                    <div
                        key={date}
                        ref={(el) => {
                            dateRefs.current[date] = el;
                        }}
                        className="relative scroll-mt-28"
                    >
                        <div className="mb-4 flex items-center gap-4">
                            <div className="relative z-10 flex size-8 items-center justify-center rounded-full border bg-background text-primary">
                                <CalendarDotsIcon weight="duotone" size={17} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-foreground">
                                    {date}
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    {dateMatches.length} matches
                                </p>
                            </div>
                        </div>

                        <div className="ml-11 grid gap-4 md:grid-cols-2">
                            {dateMatches.map((match, index) => {
                                const isFeatured = index === 0;

                                return (
                                    <div
                                        key={match.id}
                                        className={`flex h-full flex-col justify-between rounded-[42px] border p-4 shadow-sm transition hover:shadow-md corner-squircle ${isFeatured
                                            ? "bg-primary/90 text-primary-foreground"
                                            : "bg-card text-card-foreground"
                                            }`}
                                    >
                                        {/* Top */}
                                        <div>
                                            <div className="mb-5 flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p
                                                        className={`text-xs font-semibold uppercase tracking-wide ${isFeatured
                                                            ? "text-primary-foreground/70"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {match.stage || "Match"}{" "}
                                                        {match.group ? `• ${match.group}` : ""}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold corner-squircle ${isFeatured
                                                        ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground"
                                                        : "bg-secondary text-secondary-foreground"
                                                        }`}
                                                >
                                                    {match.status}
                                                </span>
                                            </div>

                                            {/* Teams */}
                                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                                                <div className="min-w-0 flex flex-col justify-center items-center text-center">
                                                    <Image
                                                        src={match.homeTeamCrest || "/Placeholder.jpg"}
                                                        alt={match.homeTeamName || "Home team"}
                                                        width={100}
                                                        height={100}
                                                        className="w-auto h-[100px] object-contain"
                                                    />

                                                    <p className="mt-2 truncate text-sm font-bold">
                                                        {match.homeTeamName || "TBD"}
                                                    </p>
                                                </div>

                                                <div
                                                    className={`rounded-full px-3 py-1 text-xs font-bold ${isFeatured
                                                        ? "bg-primary-foreground/10 text-primary-foreground"
                                                        : "bg-secondary text-secondary-foreground"
                                                        }`}
                                                >
                                                    {match.homeScore !== null &&
                                                        match.awayScore !== null
                                                        ? `${match.homeScore} - ${match.awayScore}`
                                                        : "VS"}
                                                </div>

                                                <div className="min-w-0 flex flex-col justify-center items-center text-center">
                                                    <Image
                                                        src={match.awayTeamCrest || "/Placeholder.jpg"}
                                                        alt={match.awayTeamName || "Home team"}
                                                        width={100}
                                                        height={100}
                                                        className="w-auto h-[100px] object-contain"
                                                    />

                                                    <p className="mt-2 truncate text-sm font-bold">
                                                        {match.awayTeamName || "TBD"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom */}
                                        <div className="mt-6">
                                            <div className="flex items-end justify-between gap-4">
                                                <div>
                                                    <p
                                                        className={`text-xs ${isFeatured
                                                            ? "text-primary-foreground/70"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {formatIST(match.utcDate)} IST
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold">
                                                        Match alarm
                                                    </p>
                                                </div>

                                                <p
                                                    className={`max-w-[120px] text-right text-xs ${isFeatured
                                                        ? "text-primary-foreground/70"
                                                        : "text-muted-foreground"
                                                        }`}
                                                >
                                                    {getISTMatchLabel(match.utcDate)}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <AddMatchAlarmButton matchId={match.id} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchList;