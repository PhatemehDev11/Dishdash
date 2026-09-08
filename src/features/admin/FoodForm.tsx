"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface FoodFormValues {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  gradientFrom: string;
  gradientTo: string;
  ingredientsText: string;
}

const defaultValues: FoodFormValues = {
  restaurantId: "",
  name: "",
  description: "",
  price: 0,
  icon: "default",
  category: "Popular",
  gradientFrom: "#DCFCE7",
  gradientTo: "#BBF7D0",
  ingredientsText: "",
};

const inputClass =
  "w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary";

export function FoodForm({
  restaurants,
  initialValues,
  onSubmit,
  saving,
  error,
}: {
  restaurants: { id: string; name: string }[];
  initialValues?: Partial<FoodFormValues>;
  onSubmit: (data: { values: FoodFormValues; ingredients: string[] }) => void;
  saving: boolean;
  error: string;
}) {
  const [values, setValues] = useState<FoodFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  function set<K extends keyof FoodFormValues>(key: K, value: FoodFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    const ingredients = values.ingredientsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({ values, ingredients });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      <Field label="Restaurant">
        <select
          required
          value={values.restaurantId}
          onChange={(e) => set("restaurantId", e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Select a restaurant
          </option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Name">
        <input
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          required
          rows={2}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Price ($)">
          <input
            required
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
            className={inputClass}
          />
        </Field>
        <Field label="Category (menu tab)">
          <input
            required
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Icon key (see lib/icons.ts — e.g. fish, beef, salad, soup, drink, default)">
        <input
          value={values.icon}
          onChange={(e) => set("icon", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Gradient color from">
          <input
            type="color"
            value={values.gradientFrom}
            onChange={(e) => set("gradientFrom", e.target.value)}
            className={`${inputClass} h-11 p-1`}
          />
        </Field>
        <Field label="Gradient color to">
          <input
            type="color"
            value={values.gradientTo}
            onChange={(e) => set("gradientTo", e.target.value)}
            className={`${inputClass} h-11 p-1`}
          />
        </Field>
      </div>

      <Field label="Ingredients (comma-separated)">
        <input
          placeholder="e.g. Beef patty, Cheddar, Lettuce, Tomato"
          value={values.ingredientsText}
          onChange={(e) => set("ingredientsText", e.target.value)}
          className={inputClass}
        />
      </Field>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Food"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
