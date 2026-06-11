import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient();

const requestGoogleCalendarAccess = async () => {
  await authClient.linkSocial({
    provider: "google",
    scopes: [""],
  });
};
