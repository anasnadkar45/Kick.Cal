"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

export default function Page() {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div>
      <Button onClick={signIn}>Login with Google</Button>
    </div>
  );
}