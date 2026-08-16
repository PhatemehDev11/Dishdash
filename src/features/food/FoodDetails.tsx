/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Minus, Plus, ChevronLeft } from "lucide-react";
import type { FoodItem, FoodRestaurant } from "@/lib/food";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { getFoodIcon } from "@/lib/icons";
import { useCartStore } from "@/lib/store/Cart";

export function FoodDetails({
  item,
  restaurant,
}: {
  item: FoodItem;
  restaurant: FoodRestaurant;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const Icon = getFoodIcon(item.icon);

  function handleAddToCart() {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        icon: item.icon,
        gradientFrom: item.gradientFrom,
        gradientTo: item.gradientTo,
        restaurantSlug: restaurant.slug,
        restaurantName: restaurant.name,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="pt-[110px] pb-16 md:pb-20">
      <div className="max-w-[1240px] mx-auto px-8">
        <Link
          href={`/restaurants/${restaurant.slug}`}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground hover:text-secondary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          Back to {restaurant.name}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div
              className="rounded-3xl h-[320px] md:h-[420px] flex items-center justify-center shadow-[0_24px_60px_rgba(17,24,39,0.14)]"
              style={{
                background: `linear-gradient(140deg, ${item.gradientFrom}, ${item.gradientTo})`,
              }}
            >
              <Icon className="w-32 h-32 text-secondary/60" strokeWidth={1.1} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-flex text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-primary/10 text-primary-dark">
              {item.category}
            </span>

            <h1 className="text-[28px] md:text-[38px] font-extrabold tracking-tight mt-3.5 mb-3">
              {item.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(item.rating)
                        ? "fill-accent text-accent"
                        : "text-[#E5E7EB]"
                    }`}
                    strokeWidth={0}
                  />
                ))}
              </div>
              <b className="text-[14.5px]">{item.rating}</b>
              <span className="text-muted-foreground text-sm">
                ({item.reviewCount} reviews)
              </span>
            </div>

            <p className="text-muted-foreground text-[15px] leading-[1.7] mb-5 max-w-[48ch]">
              {item.description}
            </p>

            <div className="mb-6">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-white border border-[#EEF0F2] rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground text-[13.5px] mb-2">
              From{" "}
              <Link
                href={`/restaurants/${restaurant.slug}`}
                className="font-semibold text-secondary hover:text-primary-dark transition-colors"
              >
                {restaurant.name}
              </Link>
            </p>

            <div className="flex items-center justify-between gap-6 mt-6 flex-wrap">
              <span className="text-danger font-extrabold text-[28px]">
                ${(item.price * quantity).toFixed(2)}
              </span>

              <div className="flex items-center gap-3.5 flex-wrap">
                <div className="flex items-center gap-3.5 bg-white border border-[#EEF0F2] rounded-full px-2 py-2">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F6F8] transition-colors"
                  >
                    <Minus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <span className="w-5 text-center font-semibold text-[14.5px]">
                    {quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F6F8] transition-colors"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>

                <Button onClick={handleAddToCart} className="!px-8">
                  {added ? "Added ✓" : "Add to Cart"}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
