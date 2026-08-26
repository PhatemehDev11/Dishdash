import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { auth } from "@/lib/auth";
import { getUserFavorites } from "@/lib/favorites";
import { getFoodIcon } from "@/lib/icons";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as { id: string }).id;
  const favorites = await getUserFavorites(userId);

  return (
    <>
      <Navbar />
      <main className="pt-[150px] pb-20 min-h-[70vh]">
        <div className="max-w-[900px] mx-auto px-8">
          <h1 className="text-2xl font-extrabold mb-8">Your Favorites</h1>

          {favorites.length === 0 ? (
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
              {favorites.map((fav) => {
                const Icon = getFoodIcon(fav.food.icon);
                return (
                  <Link
                    key={fav.id}
                    href={`/food/${fav.food.id}`}
                    className="block bg-white border rounded-3xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className="h-[130px] flex items-center justify-center"
                      style={{
                        background: `linear-gradient(150deg, ${fav.food.gradientFrom}, ${fav.food.gradientTo})`,
                      }}
                    >
                      <Icon className="w-10 h-10 text-secondary/70" strokeWidth={1.3} />
                    </div>
                    <div className="px-4 py-3.5">
                      <h4 className="text-[14.5px] font-semibold mb-1">{fav.food.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {fav.food.restaurant.name}
                      </p>
                      <span className="text-destructive font-extrabold text-sm">
                        ${fav.food.price.toFixed(2)}
                      </span>
                    </div>
                  </Link>
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
