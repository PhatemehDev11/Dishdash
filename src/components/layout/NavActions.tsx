"use client";

import { useState } from "react";
import { Search, ShoppingCart, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { SearchModal } from "@/features/search/SearchModal";
import { useCart } from "@/features/Cart/useCart";

export default function NavActions() {
  const { data: session, status } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Search"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <Link href="/cart" aria-label="Cart" className="relative">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 bg-danger rounded-full border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">
            {count}
          </span>
        )}
      </Link>

      {status === "loading" ? null : session?.user ? (
        <div className="flex items-center gap-2 pl-1">
          <div
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold"
            title={session.user.name ?? ""}
          >
            {session.user.name?.charAt(0).toUpperCase()}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Sign out"
            title="Sign out"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
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
