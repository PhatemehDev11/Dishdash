import Link from "next/link";
import { Star, Clock, MapPin, Bike, Circle } from "lucide-react";
import { restaurantDetails } from "@/lib/constants/restaurant";
import { getFoodIcon } from "@/lib/icons";
import { Reveal } from "@/components/shared/Reveal";

export function RestaurantsGrid() {
  const list = Object.values(restaurantDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((r, i) => {
        const Icon = getFoodIcon(r.icon);
        return (
          <Reveal key={r.slug} delay={i * 0.08}>
            <Link
              href={`/restaurants/${r.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-[#EEF0F2] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(17,24,39,0.14)]"
            >
              <div
                className="relative h-[170px] flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.08]"
                style={{
                  background: `linear-gradient(140deg, ${r.coverFrom}, ${r.coverTo})`,
                }}
              >
                <Icon
                  className="w-16 h-16 text-secondary/70"
                  strokeWidth={1.2}
                />
                {r.isOpen && (
                  <span className="absolute top-3 left-3 bg-white text-primary-dark text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Circle
                      className="w-2 h-2 fill-primary text-primary"
                      strokeWidth={0}
                    />
                    Open Now
                  </span>
                )}
              </div>
              <div className="px-5 pt-4.5 pb-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[16.5px] font-bold">{r.name}</h4>
                  <span className="flex items-center gap-1 text-[13px] font-bold">
                    <Star
                      className="w-3.5 h-3.5 fill-accent text-accent"
                      strokeWidth={0}
                    />
                    {r.rating}
                  </span>
                </div>
                <div className="flex gap-3.5 text-muted-foreground text-[12.5px] font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" strokeWidth={2} />{" "}
                    {r.deliveryTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2} />{" "}
                    {r.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5" strokeWidth={2} />{" "}
                    {r.deliveryFee}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
