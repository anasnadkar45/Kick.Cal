"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="secondary"
      onClick={toggleTheme}
      className="rounded-full corner-squircle"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <MoonIcon weight="duotone" className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <SunIcon weight="duotone" className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}