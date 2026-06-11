"use client";

import { HouseSimpleIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import UserButton from "@/components/UserButton";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";

const BottomBar = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-[200px]  p-2 shadow-2xl bg-primary corner-squircle">
      <Button
        onClick={() => router.push("/")}
        variant={"secondary"}
        className="rounded-full corner-squircle"
        aria-label="Go to home"
        size={"icon-lg"}
      >
        <HouseSimpleIcon weight="duotone" />
      </Button>
      <ModeToggle />
      <UserButton />
    </div>
  );
};

export default BottomBar;