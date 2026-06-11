"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowLeftIcon, MailboxIcon, User, UserCircleIcon, UserIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function UserButton() {
    const router = useRouter();

    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    async function handleLogout() {
        try {
            setLogoutLoading(true);

            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setOpenUserDialog(false);
                        router.push("/login");
                        router.refresh();
                    },
                },
            });
        } finally {
            setLogoutLoading(false);
        }
    }

    const signIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };
    return (
        <>
            <Button
                onClick={() => setOpenUserDialog(true)}
                aria-label="Open user menu"
                variant={"secondary"}
                size={"icon-lg"}
                className="rounded-full corner-squircle"
            >
                {isPending ? (
                    <div className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : user?.image ? (
                    <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={100}
                        height={100}
                        className="size-6"
                    />
                ) : user ? (
                    <span className="flex size-full items-center justify-center bg-white text-sm font-bold uppercase text-primary">
                        {(user.name || user.email || "U").charAt(0)}
                    </span>
                ) : (
                    <UserIcon weight="duotone" size={40} />
                )}
            </Button>

            <Dialog open={openUserDialog} onOpenChange={setOpenUserDialog}>
                <DialogContent className="max-w-sm overflow-hidden rounded-[80px] corner-squircle border bg-background p-0">
                    <div className="bg-primary px-6 py-7 text-primary-foreground">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                                {user ? "Your Profile" : "Sign in required"}
                            </DialogTitle>

                            <DialogDescription className="text-primary-foreground/80">
                                {user
                                    ? "Manage your account and match reminders."
                                    : "Sign in to add match alarms to your Google Calendar."}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="px-6 py-5">
                        {isPending ? (
                            <div className="flex items-center justify-center py-8">
                                <p className="text-sm text-muted-foreground">
                                    Checking session...
                                </p>
                            </div>
                        ) : user ? (
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-[80px] corner-squircle bg-primary/10">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name || "User"}
                                                fill
                                                className="object-cover rounded-[80px] corner-squircle"
                                            />
                                        ) : (
                                            <UserCircleIcon
                                                weight="duotone"
                                                size={34}
                                                className="text-primary"
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0 ">
                                        <p className="truncate text-base font-semibold">
                                            {user.name || "User"}
                                        </p>
                                        <p className="truncate text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 rounded-[80px] corner-squircle border bg-muted/30 p-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <User weight="duotone" size={16} className="text-muted-foreground" />
                                        <span className="truncate">{user.name || "No name"}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <MailboxIcon weight="duotone" size={16} className="text-muted-foreground" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleLogout}
                                    disabled={logoutLoading}
                                    variant={"destructive"}
                                    className={"w-full rounded-[80px] corner-squircle"}
                                >
                                    <ArrowLeftIcon weight="duotone" size={16} />
                                    {logoutLoading ? "Logging out..." : "Logout"}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-5 text-center">
                                <div className="mx-auto flex size-16 items-center justify-center rounded-[80px] corner-squircle bg-primary/10">
                                    <UserIcon
                                        weight="duotone"
                                        size={40}
                                        className="text-primary"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">Login to continue</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        You need an account to save match alarms and sync them with
                                        Google Calendar.
                                    </p>
                                </div>

                                <Button
                                    onClick={() => {
                                        setOpenUserDialog(false);
                                        signIn()
                                    }}
                                    size={"lg"}
                                    className={"rounded-[80px] corner-squircle w-full"}
                                >
                                    Sign in
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}