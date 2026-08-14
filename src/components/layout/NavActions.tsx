import { Search, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavActions() {
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

      <Button className="rounded-full px-4 sm:px-6">
        <span className="hidden sm:inline">Get Started</span>

        <span className="sm:hidden">Start</span>
      </Button>
    </div>
  );
}
