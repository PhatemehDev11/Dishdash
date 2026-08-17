import Link from "next/link";
import { Star, Clock, MapPin, Bike, Circle } from "lucide-react";
import { getFoodIcon } from "@/lib/icons";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { getFeaturedRestaurants } from "@/lib/restaurant";

export default async function FeaturedRestaurants() {
  const restaurants = await getFeaturedRestaurants(3);

  if (restaurants.length === 0) return null;

  return (
    <section id="featured-restaurants" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Featured"
          title=" Top Rated Restaurants"
          description=" Handpicked kitchens with the best ratings on DishDash."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r, i) => {
            const Icon = getFoodIcon(r.icon);
            return (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link
                  href={`/restaurants/${r.slug}`}
                  className="group block overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden">
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(140deg, ${r.coverFrom}, ${r.coverTo})`,
                      }}
                    >
                      <Icon className="h-14 w-14 text-foreground/60" strokeWidth={1.2} />
                    </div>

                    {r.isOpen && (
                      <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-primary">
                        <Circle className="h-2 w-2 fill-primary text-primary" strokeWidth={0} />
                        Open Now
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="text-base font-bold">{r.name}</h4>
                      <span className="flex items-center gap-1 text-sm font-bold">
                        <Star
                          className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                          strokeWidth={0}
                        />
                        {r.rating}
                      </span>
                    </div>
                    <div className="flex gap-3.5 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" strokeWidth={2} /> {r.deliveryTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" strokeWidth={2} /> {r.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bike className="h-3.5 w-3.5" strokeWidth={2} /> {r.deliveryFee}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/restaurants" className="text-sm font-semibold text-primary hover:underline">
            See all restaurants →
          </Link>
        </div>
      </div>
    </section>
  );
}