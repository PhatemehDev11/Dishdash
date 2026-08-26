"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart, X } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getFoodIcon } from "@/lib/icons";
import { useFavoriteItems } from "@/features/favorites/useFavoriteItems";

export default function FavoritesPage() {
  const { status } = useSession();
  const router = useRouter();
  const { items, loading, removeFavorite } = useFavoriteItems();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 min-h-[70vh]">
        <div className="max-w-[900px] mx-auto px-8">
          <h1 className="text-2xl font-extrabold mb-8">Your Favorites</h1>

          {loading ? (
            <p className="text-center text-muted-foreground py-16">Loading...</p>
          ) : items.length === 0 ? (
            <div className="text-center py-16 border rounded-3xl">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-muted-foreground text-sm mb-5">No favorites yet.</p>
              <Link href="/restaurants" className="text-primary font-semibold text-sm hover:underline">
                Browse Restaurants
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => {
                const Icon = getFoodIcon(item.food.icon);
                return (
                  <div
                    key={item.id}
                    className="relative block bg-white border rounded-3xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      type="button"
                      aria-label="Remove from favorites"
                      onClick={() => removeFavorite(item.food.id)}
                      className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                    </button>

                    <Link href={`/food/${item.food.id}`}>
                      <div
                        className="h-[130px] flex items-center justify-center"
                        style={{
                          background: `linear-gradient(150deg, ${item.food.gradientFrom}, ${item.food.gradientTo})`,
                        }}
                      >
                        <Icon className="w-10 h-10 text-secondary/70" strokeWidth={1.3} />
                      </div>
                      <div className="px-4 py-3.5">
                        <h4 className="text-[14.5px] font-semibold mb-1">{item.food.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1.5">
                          {item.food.restaurant.name}
                        </p>
                        <span className="text-destructive font-extrabold text-sm">
                          ${item.food.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
