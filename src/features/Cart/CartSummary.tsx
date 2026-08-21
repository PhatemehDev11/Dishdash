"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const DELIVERY_FEE = 2.99;

export function CartSummary({ itemCount, subtotal }: { itemCount: number; subtotal: number }) {
  const deliveryFee = itemCount > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white border border-[#EEF0F2] rounded-3xl p-6 sticky top-[110px]">
      <h3 className="text-[16.5px] font-bold mb-5">Order Summary</h3>

      <div className="space-y-3 text-[13.5px]">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-secondary font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery Fee</span>
          <span className="text-secondary font-medium">
            {deliveryFee === 0 ? "—" : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="h-px bg-[#EEF0F2] my-4" />

      <div className="flex justify-between items-center mb-5">
        <span className="font-bold text-[15px]">Total</span>
        <span className="text-danger font-extrabold text-[22px]">${total.toFixed(2)}</span>
      </div>

      <Button
        render={<Link href="/checkout" />}
        nativeButton={false}
        className={`w-full justify-center ${itemCount === 0 ? "pointer-events-none opacity-40" : ""}`}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
