"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function fetchFavoriteIds(): Promise<string[]> {
  const res = await fetch("/api/favorites");
  const data = await res.json();
  return data.foodIds ?? [];
}

export function useFavorites() {
  const { status } = useSession();
  const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const ids = status === "authenticated" ? await fetchFavoriteIds() : [];
      if (!ignore) {
        setFavoriteIds(ids);
        setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [status]);

  async function toggleFavorite(foodId: string) {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    // Optimistic update so the heart flips instantly
    setFavoriteIds((prev) =>
      prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );

    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foodId }),
    });
  }

  function isFavorited(foodId: string) {
    return favoriteIds.includes(foodId);
  }

  return { favoriteIds, loading, toggleFavorite, isFavorited };
}
