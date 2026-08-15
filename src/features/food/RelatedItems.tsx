import Link from "next/link";
import { Star } from "lucide-react";
import type { MenuItem, RestaurantDetail } from "@/types/restaurant";
import { Reveal } from "@/components/shared/Reveal";
import { getFoodIcon } from "@/lib/icons";

export function RelatedItems({
  items,
  restaurant,
}: {
  items: MenuItem[];
  restaurant: RestaurantDetail;
}) {
  if (items.length === 0) return null;

  return (
    <section className="pb-20 md:pb-[100px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-tight mb-6">
          More from {restaurant.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
          {items.map((item, i) => {
           
            const Icon = getFoodIcon(item.icon);
            return (
              <Reveal key={item.id} delay={i * 0.06}>
                <Link
                  href={`/food/${item.id}`}
                  className="group block bg-white rounded-3xl border border-[#EEF0F2] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(17,24,39,0.08)] hover:-translate-y-1"
                >
                  <div
                    className="h-[120px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(150deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    }}
                  >
                    <Icon className="w-10 h-10 text-secondary/70" strokeWidth={1.3} />
                  </div>
                  <div className="px-4 pt-3.5 pb-4">
                    <h4 className="text-[14.5px] font-semibold mb-1.5">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-danger font-extrabold text-[14px]">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="flex items-center gap-1 text-[12.5px] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={0} />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
