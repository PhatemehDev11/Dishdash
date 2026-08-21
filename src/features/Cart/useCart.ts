"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface CartFood {
  id: string;
  name: string;
  price: number;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  restaurant: { slug: string; name: string };
}

export interface CartItemWithFood {
  id: string;
  quantity: number;
  food: CartFood;
}

async function fetchCartItems(): Promise<CartItemWithFood[]> {
  const res = await fetch("/api/cart");
  const data = await res.json();
  return data.items ?? [];
}

export function useCart() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<CartItemWithFood[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let ignore = false;

    async function load() {
      const nextItems = status === "authenticated" ? await fetchCartItems() : [];
      if (!ignore) {
        setItems(nextItems);
        setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [status]);

  const refetch = useCallback(async () => {
    const nextItems = status === "authenticated" ? await fetchCartItems() : [];
    setItems(nextItems);
    setLoading(false);
  }, [status]);

  async function addItem(foodId: string, quantity = 1) {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foodId, quantity }),
    });
    await refetch();
  }

  async function updateQuantity(itemId: string, quantity: number) {
    await fetch(`/api/cart/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    await refetch();
  }

  async function removeItem(itemId: string) {
    await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
    await refetch();
  }

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.food.price * i.quantity, 0);

  return { items, loading, addItem, updateQuantity, removeItem, count, total };
}