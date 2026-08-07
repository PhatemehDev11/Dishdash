import { Search, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NavActions() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Button className="rounded-full px-4 sm:px-6">
        <span className="hidden sm:inline">
          Get Started
        </span>

        <span className="sm:hidden">
          Start
        </span>
      </Button>

    </div>
  );
}