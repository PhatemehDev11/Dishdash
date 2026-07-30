import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

type LogoProps = {
  showText?: boolean;
};

export default function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <UtensilsCrossed className="h-5 w-5" />
      </div>

      {showText && (
        <span className="text-2xl font-bold tracking-tight">
          Dish<span className="text-primary">Dash</span>
        </span>
      )}
    </Link>
  );
}