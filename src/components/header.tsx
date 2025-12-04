"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuth, useUser } from "@/firebase";
import { Button } from "./ui/button";
import { EcoSweepLogo } from "./icons";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User as UserIcon, LogOut } from "lucide-react";

export function AppHeader() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const renderUserAuth = () => {
    if (isUserLoading) {
      return <Skeleton className="h-10 w-24" />;
    }

    if (user) {
      return (
        <div className="flex items-center gap-4">
           <Button asChild>
            <Link href="/payment">Make a Payment</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">My Account</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <EcoSweepLogo className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl font-headline text-primary tracking-tight">
            EcoSweep
          </span>
        </a>
        <nav>
          {renderUserAuth()}
        </nav>
      </div>
    </header>
  );
}
