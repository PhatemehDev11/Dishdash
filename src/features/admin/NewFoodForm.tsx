"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FoodForm, type FoodFormValues } from "./FoodForm";

export function NewFoodForm({ restaurants }: { restaurants: { id: string; name: string }[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit({
    values,
    ingredients,
  }: {
    values: FoodFormValues;
    ingredients: string[];
  }) {
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId: values.restaurantId,
        name: values.name,
        description: values.description,
        price: values.price,
        icon: values.icon,
        category: values.category,
        gradientFrom: values.gradientFrom,
        gradientTo: values.gradientTo,
        ingredients,
      }),
    });

    const result = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(result.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin/foods");
    router.refresh();
  }

  return (
    <FoodForm restaurants={restaurants} onSubmit={handleSubmit} saving={saving} error={error} />
  );
}
