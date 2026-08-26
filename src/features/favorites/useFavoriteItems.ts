"use client";

import { useState, useEffect } from "react";

export interface FavoriteFood {
  id: string;
  name: string;
  price: number;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  restaurant: { slug: string; name: string };
}

export interface FavoriteItem {
  id: string;
  food: FavoriteFood;
}

async function fetchFavoriteItems(): Promise<FavoriteItem[]> {
  const res = await fetch("/api/favorites?full=true");
  const data = await res.json();
  return data.items ?? [];
}

export function useFavoriteItems() {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const result = await fetchFavoriteItems();
      if (!ignore) {
        setItems(result);
        setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // Optimistically removes the card immediately, then confirms with the
  // server (reusing the same toggle endpoint the heart buttons use).
  async function removeFavorite(foodId: string) {
    setItems((prev) => prev.filter((item) => item.food.id !== foodId));

    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foodId }),
    });
  }

  return { items, loading, removeFavorite };
}
