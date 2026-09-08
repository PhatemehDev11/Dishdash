"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RestaurantForm, type RestaurantFormValues } from "@/features/admin/RestaurantForm";

export default function NewRestaurantPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(data: RestaurantFormValues) {
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(result.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin/restaurants");
    router.refresh();
  }

  return (
    <div className="max-w-[560px]">
      <h1 className="text-2xl font-extrabold mb-8">New Restaurant</h1>
      <RestaurantForm onSubmit={handleSubmit} saving={saving} error={error} />
    </div>
  );
}
