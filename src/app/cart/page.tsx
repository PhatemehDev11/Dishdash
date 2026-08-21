"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/Cart/useCart";
import { CartItemRow } from "@/features/Cart/CartItemRow";
import { CartSummary } from "@/features/Cart/CartSummary";

export default function CartPage() {
  const { items, loading, updateQuantity, removeItem, total } = useCart();

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 md:pb-[100px] min-h-[60vh]">
        <div className="max-w-[1100px] mx-auto px-8">
          <h1 className="text-[28px] md:text-[34px] font-extrabold tracking-tight mb-8">
            Your Cart
          </h1>

          {loading ? (
            <p className="text-center text-muted-foreground py-20">Loading your cart...</p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <ShoppingCart className="w-7 h-7 text-primary-dark" strokeWidth={1.5} />
              </div>
              <h2 className="text-lg font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground text-[14px] mb-6 max-w-[36ch]">
                Looks like you haven&apos;t added anything yet. Browse restaurants and find
                something delicious.
              </p>
              <Button render={<Link href="/restaurants" />} nativeButton={false}>
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-start">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
                <Link
                  href="/restaurants"
                  className="inline-block text-[13.5px] font-semibold text-primary-dark hover:underline mt-2"
                >
                  + Add more items
                </Link>
              </div>

              <CartSummary itemCount={items.length} subtotal={total} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
