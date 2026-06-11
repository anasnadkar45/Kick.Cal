import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIST(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

export function getISTMatchLabel(date: string | Date) {
  const matchDate = new Date(date);

  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(matchDate)
  );

  if (hour >= 0 && hour < 5) return "Late night match 🌙";
  if (hour >= 5 && hour < 9) return "Early morning match 🌅";
  if (hour >= 18 && hour < 23) return "Prime time match 🔥";

  return "Day match";
}
