"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function NavActions() {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Link
        href="/cart"
        aria-label="Cart"
        className="relative w-10 h-10 rounded-full bg-white border border-[#EEF0F2] flex items-center justify-center text-secondary"
      >
        <Button variant="ghost" size="icon" className="rounded-full">
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Link>

      {status === "loading" ? null : session?.user ? (
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm font-medium">
            Hi, {session.user.name?.split(" ")[0]}
          </span>
          <Button
            variant="ghost"
            className="rounded-full px-4 sm:px-6  text-red-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Button
          className="rounded-full px-4 sm:px-6"
          render={<Link href="/login" />}
          nativeButton={false}
        >
          <span className="hidden sm:inline">Get Started</span>
          <span className="sm:hidden">Start</span>
        </Button>
      )}
    </div>
  );
}