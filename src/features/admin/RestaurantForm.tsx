"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface RestaurantFormValues {
  slug: string;
  name: string;
  icon: string;
  coverFrom: string;
  coverTo: string;
  deliveryTime: string;
  distance: string;
  deliveryFee: string;
  isOpen: boolean;
  address: string;
  description: string;
}

const defaultValues: RestaurantFormValues = {
  slug: "",
  name: "",
  icon: "default",
  coverFrom: "#DCFCE7",
  coverTo: "#BBF7D0",
  deliveryTime: "20 min",
  distance: "1.5 km",
  deliveryFee: "$1.99",
  isOpen: true,
  address: "",
  description: "",
};

const inputClass =
  "w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary";

export function RestaurantForm({
  initialValues,
  onSubmit,
  saving,
  error,
}: {
  initialValues?: Partial<RestaurantFormValues>;
  onSubmit: (data: RestaurantFormValues) => void;
  saving: boolean;
  error: string;
}) {
  const [values, setValues] = useState<RestaurantFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  function set<K extends keyof RestaurantFormValues>(key: K, value: RestaurantFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="space-y-4"
    >
      <Field label="Name">
        <input
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Slug (used in the URL, e.g. sakura-house)">
        <input
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Icon key (see lib/icons.ts — e.g. fish, beef, salad, soup, default)">
        <input
          value={values.icon}
          onChange={(e) => set("icon", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Cover color from">
          <input
            type="color"
            value={values.coverFrom}
            onChange={(e) => set("coverFrom", e.target.value)}
            className={`${inputClass} h-11 p-1`}
          />
        </Field>
        <Field label="Cover color to">
          <input
            type="color"
            value={values.coverTo}
            onChange={(e) => set("coverTo", e.target.value)}
            className={`${inputClass} h-11 p-1`}
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Field label="Delivery time">
          <input
            value={values.deliveryTime}
            onChange={(e) => set("deliveryTime", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Distance">
          <input
            value={values.distance}
            onChange={(e) => set("distance", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Delivery fee">
          <input
            value={values.deliveryFee}
            onChange={(e) => set("deliveryFee", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Address">
        <input
          required
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          required
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={values.isOpen}
          onChange={(e) => set("isOpen", e.target.checked)}
        />
        Open now
      </label>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Restaurant"}
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
