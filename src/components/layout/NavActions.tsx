import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavActions() {
  return (
    <div className="flex items-center gap-2   hidden items-center gap-2 lg:flex">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-full">
        <ShoppingCart className="h-5 w-5" />
      </Button>

      <Button className="rounded-full px-6">
        Get Started
      </Button>
    </div>
  );
}