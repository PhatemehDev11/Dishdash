/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/lib/store/Cart";
import { getFoodIcon } from "@/lib/icons";

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
 
 
  const Icon = getFoodIcon(item.icon);

  return (
    <div className="flex items-center gap-4 bg-white border border-[#EEF0F2] rounded-3xl p-4">
      <div
        className="w-[76px] h-[76px] flex-none rounded-2xl flex items-center justify-center"
        style={{ background: `linear-gradient(150deg, ${item.gradientFrom}, ${item.gradientTo})` }}
      >
        <Icon className="w-7 h-7 text-secondary/70" strokeWidth={1.3} />
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/food/${item.id}`}
          className="text-[14.5px] font-semibold hover:text-primary-dark transition-colors line-clamp-1"
        >
          {item.name}
        </Link>
        <Link
          href={`/restaurants/${item.restaurantSlug}`}
          className="text-[12px] text-muted-foreground hover:text-secondary transition-colors"
        >
          {item.restaurantName}
        </Link>
        <div className="flex items-center gap-3 mt-2.5">
          <div className="flex items-center gap-2.5 bg-[#F5F6F8] rounded-full px-1.5 py-1.5">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            >
              <Minus className="w-3 h-3" strokeWidth={2.5} />
            </button>
            <span className="w-4 text-center text-[13px] font-semibold">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
            >
              <Plus className="w-3 h-3" strokeWidth={2.5} />
            </button>
          </div>
          <button
            aria-label="Remove item"
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground hover:text-danger transition-colors"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <span className="text-danger font-extrabold text-[15px] flex-none">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
}