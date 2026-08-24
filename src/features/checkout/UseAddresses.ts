"use client";

import { useState, useEffect, useCallback } from "react";

export interface AddressItem {
  id: string;
  label: string;
  street: string;
  city: string;
  details: string | null;
  isDefault: boolean;
}

async function fetchAddresses(): Promise<AddressItem[]> {
  const res = await fetch("/api/addresses");
  const data = await res.json();
  return data.addresses ?? [];
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const result = await fetchAddresses();
      if (!ignore) {
        setAddresses(result);
        setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const refetch = useCallback(async () => {
    const result = await fetchAddresses();
    setAddresses(result);
  }, []);

  async function addAddress(data: {
    label: string;
    street: string;
    city: string;
    details?: string;
  }) {
    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    await refetch();
    return result.address as AddressItem;
  }


  async function deleteAddress(id: string): Promise<string | null> {
    const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return data?.error ?? "Could not delete address.";
    }

    await refetch();
    return null;
  }

  async function setDefault(id: string) {
    await fetch(`/api/addresses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDefault: true }),
    });
    await refetch();
  }

  return { addresses, loading, addAddress, deleteAddress, setDefault };
}