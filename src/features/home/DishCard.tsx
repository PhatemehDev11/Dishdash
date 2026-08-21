/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { getFoodIcon } from "@/lib/icons";

type DishCardProps = {
  id: string;
  category: string;
  name: string;
  price: number;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
};

export default function DishCard({
  id,
  category,
  name,
  price,
  icon,
  gradientFrom,
  gradientTo,
}: DishCardProps) {
  const Icon = getFoodIcon(icon);

  return (
    <Link
      href={`/food/${id}`}
      className="group block overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className="relative flex h-40 items-center justify-center"
        style={{ background: `linear-gradient(150deg, ${gradientFrom}, ${gradientTo})` }}
      >
        <button
          type="button"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
          aria-label={`Add ${name} to favorites`}
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4 text-slate-300" />
        </button>

        <Icon className="h-16 w-16 text-foreground/60" strokeWidth={1.3} />
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground">
          {category}
        </p>

        <h3 className="mt-2 text-base font-bold">{name}</h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-red-500">${price.toFixed(2)}</span>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
            aria-label={`Add ${name} to cart`}
            onClick={(e) => e.preventDefault()}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}