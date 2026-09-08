"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RestaurantForm, type RestaurantFormValues } from "./RestaurantForm";

export function EditRestaurantForm({
  id,
  initialValues,
}: {
  id: string;
  initialValues: RestaurantFormValues;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(data: RestaurantFormValues) {
    setSaving(true);
    setError("");

    const res = await fetch(`/api/admin/restaurants/${id}`, {
      method: "PATCH",
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
    <RestaurantForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      saving={saving}
      error={error}
    />
  );
}
