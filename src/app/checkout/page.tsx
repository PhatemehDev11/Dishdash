"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Plus, Loader2 } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/Cart/useCart";
import { useAddresses } from "@/features/checkout/UseAddresses";

const DELIVERY_FEE = 2.99;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, loading: cartLoading } = useCart();
  const { addresses, loading: addressesLoading, addAddress } = useAddresses();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", street: "", city: "", details: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const grandTotal = total + (items.length > 0 ? DELIVERY_FEE : 0);
  const effectiveSelectedId =
    selectedId ?? addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null;

  async function handleAddAddress(e: FormEvent) {
    e.preventDefault();
    const newAddress = await addAddress(form);
    setSelectedId(newAddress.id);
    setShowForm(false);
    setForm({ label: "", street: "", city: "", details: "" });
  }

  async function handlePlaceOrder() {
    if (!effectiveSelectedId) return;
    setPlacing(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId: effectiveSelectedId }),
    });

    const data = await res.json();
    setPlacing(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push(`/orders/${data.order.id}`);
  }

  if (!cartLoading && items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-[150px] pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Button render={<Link href="/restaurants" />} nativeButton={false}>
            Browse Restaurants
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 min-h-[70vh]">
        <div className="max-w-[560px] mx-auto px-8">
          <h1 className="text-2xl font-extrabold mb-8">Checkout</h1>

          <h3 className="font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Delivery Address
          </h3>

          {addressesLoading ? (
            <p className="text-sm text-muted-foreground mb-6">Loading addresses...</p>
          ) : (
            <div className="space-y-3 mb-4">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`block border rounded-2xl p-4 cursor-pointer transition-colors ${
                    effectiveSelectedId === addr.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    className="sr-only"
                    checked={effectiveSelectedId === addr.id}
                    onChange={() => setSelectedId(addr.id)}
                  />
                  <span className="font-semibold text-sm block">{addr.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {addr.street}, {addr.city}
                  </span>
                </label>
              ))}
            </div>
          )}

          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-8"
            >
              <Plus className="w-4 h-4" /> Add new address
            </button>
          ) : (
            <form onSubmit={handleAddAddress} className="space-y-3 mb-8 border rounded-2xl p-4">
              <input
                required
                placeholder="Label (e.g. Home)"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                required
                placeholder="Street address"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                placeholder="Details (optional)"
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 justify-center">
                  Save Address
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="border rounded-2xl p-5 mb-6 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span>${items.length > 0 ? DELIVERY_FEE.toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t">
              <span>Total</span>
              <span className="text-destructive">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <Button
            onClick={handlePlaceOrder}
            disabled={!effectiveSelectedId || placing}
            className="w-full justify-center"
          >
            {placing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Placing order...
              </span>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
