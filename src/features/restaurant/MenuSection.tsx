/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import type { RestaurantDetail, MenuItem } from "@/types/restaurant";
import { Reveal } from "@/components/shared/Reveal";
import { getFoodIcon } from "@/lib/icons";

export function MenuSection({ restaurant }: { restaurant: RestaurantDetail }) {
  const [activeCategory, setActiveCategory] = useState(restaurant.categories[0]);

  const filteredMenu =
    activeCategory === "Popular"
      ? restaurant.menu
      : restaurant.menu.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 md:py-20">
      <div className="max-w-[1240px] mx-auto px-8">
        <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-tight mb-6">Menu</h2>

        <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-secondary text-white"
                  : "bg-white border border-[#EEF0F2] text-muted-foreground hover:border-secondary hover:text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
ِ
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
          {filteredMenu.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.05, 0.3)}>
              <MenuCard item={item} />
            </Reveal>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-10">No items in this category yet.</p>
        )}
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const [liked, setLiked] = useState(false);
  const Icon = getFoodIcon(item.icon);

  return (
    <div className="group bg-white rounded-3xl border border-[#EEF0F2] overflow-hidden flex gap-0 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(17,24,39,0.08)] hover:-translate-y-1">
      <div
        className="relative w-[110px] flex-none flex items-center justify-center"
        style={{ background: `linear-gradient(150deg, ${item.gradientFrom}, ${item.gradientTo})` }}
      >
        <Icon className="w-9 h-9 text-secondary/70" strokeWidth={1.3} />
        <button
          aria-label="Save to favorites"
          onClick={() => setLiked((v) => !v)}
          className="absolute top-2 right-2 w-[26px] h-[26px] rounded-full bg-white/85 flex items-center justify-center"
        >
          <Heart
            className={`w-3 h-3 ${liked ? "fill-danger text-danger" : "text-secondary"}`}
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="flex-1 px-4 py-3.5 flex flex-col justify-between">
        <div>
          <h4 className="text-[14.5px] font-semibold leading-snug">{item.name}</h4>
          <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2.5">
          <span className="text-danger font-extrabold text-[14.5px]">
            ${item.price.toFixed(2)}
          </span>
          <button
            aria-label="Add to cart"
            className="bg-secondary text-white w-[28px] h-[28px] rounded-full transition-all duration-300 group-hover:w-[76px] group-hover:rounded-2xl overflow-hidden flex items-center justify-center flex-none"
          >
            <Plus className="w-3.5 h-3.5 group-hover:hidden" strokeWidth={2.5} />
            <span className="hidden group-hover:inline text-[11px] font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}