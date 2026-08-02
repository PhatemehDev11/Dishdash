import { Search, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NavActions() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon">
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-5 w-5" />
      </Button>

      <Button>Sign In</Button>
    </div>
  );
}