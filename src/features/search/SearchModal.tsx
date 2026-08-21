"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Search as SearchIcon, Loader2 } from "lucide-react";
import { getFoodIcon } from "@/lib/icons";

interface RestaurantResult {
  slug: string;
  name: string;
  icon: string;
  coverFrom: string;
  coverTo: string;
}

interface FoodResult {
  id: string;
  name: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  price: number;
  restaurant: { slug: string; name: string };
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantResult[]>([]);
  const [food, setFood] = useState<FoodResult[]>([]);
 
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setRestaurants(data.restaurants ?? []);
        setFood(data.food ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

 
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) return null;


  const displayRestaurants = query.trim() ? restaurants : [];
  const displayFood = query.trim() ? food : [];
  const hasResults = displayRestaurants.length > 0 || displayFood.length > 0;

  function handleQueryChange(value: string) {
    setQuery(value);
    setLoading(value.trim().length > 0);
  }

  function handleClose() {
    setQuery("");
    setRestaurants([]);
    setFood([]);
    onClose();
  }

  function goTo(href: string) {
    handleClose();
    router.push(href);
  }

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-start justify-center bg-white/30 backdrop-blur-md pt-24 px-4">
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      <div className="relative w-full max-w-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EEF0F2]">
          <SearchIcon className="w-5 h-5 text-muted-foreground flex-none" strokeWidth={2} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search restaurants or dishes..."
            className="flex-1 outline-none text-[15px] bg-transparent"
          />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          <button
            aria-label="Close search"
            onClick={handleClose}
            className="text-muted-foreground hover:text-secondary"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {!query.trim() && (
            <p className="text-sm text-muted-foreground text-center py-10">
              Start typing to search restaurants and dishes.
            </p>
          )}

          {query.trim() && !loading && !hasResults && (
            <p className="text-sm text-muted-foreground text-center py-10">
              No results for &quot;{query}&quot;.
            </p>
          )}

          {displayRestaurants.length > 0 && (
            <div className="px-3 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                Restaurants
              </p>
              {displayRestaurants.map((r) => {
                const Icon = getFoodIcon(r.icon);
                return (
                  <button
                    key={r.slug}
                    onClick={() => goTo(`/restaurants/${r.slug}`)}
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-[#F5F6F8] text-left"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                      style={{
                        background: `linear-gradient(140deg, ${r.coverFrom}, ${r.coverTo})`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-secondary/70" strokeWidth={1.5} />
                    </div>
                    <span className="text-[14px] font-semibold">{r.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {displayFood.length > 0 && (
            <div className="px-3 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                Dishes
              </p>
              {displayFood.map((item) => {
                const Icon = getFoodIcon(item.icon);
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(`/food/${item.id}`)}
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-[#F5F6F8] text-left"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                      style={{
                        background: `linear-gradient(140deg, ${item.gradientFrom}, ${item.gradientTo})`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-secondary/70" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[14px] font-semibold block truncate">
                        {item.name}
                      </span>
                      <span className="text-[12px] text-muted-foreground">
                        {item.restaurant.name} · ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}