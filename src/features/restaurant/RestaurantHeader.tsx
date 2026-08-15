/* eslint-disable react-hooks/static-components */
import { Star, Clock, MapPin, Bike, Circle } from "lucide-react";
import type { RestaurantDetail } from "@/types/restaurant";
import { Reveal } from "@/components/shared/Reveal";
import { getFoodIcon } from "@/lib/icons";

export function RestaurantHeader({ restaurant }: { restaurant: RestaurantDetail }) {
  const Icon = getFoodIcon(restaurant.icon);

  return (
    <section className="pt-[110px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <Reveal>
          <div
            className="relative rounded-3xl overflow-hidden h-[220px] md:h-[280px] flex items-center justify-center"
            style={{
              background: `linear-gradient(140deg, ${restaurant.coverFrom}, ${restaurant.coverTo})`,
            }}
          >
            <Icon className="w-24 h-24 text-secondary/60" strokeWidth={1.1} />
            <span
              className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                restaurant.isOpen ? "bg-white text-primary-dark" : "bg-white text-danger"
              }`}
            >
              <Circle
                className={`w-2 h-2 ${restaurant.isOpen ? "fill-primary text-primary" : "fill-danger text-danger"}`}
                strokeWidth={0}
              />
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-start justify-between gap-6 mt-7">
            <div className="max-w-[56ch]">
              <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-tight">
                {restaurant.name}
              </h1>
              <p className="text-muted-foreground text-[14.5px] leading-relaxed mt-2">
                {restaurant.description}
              </p>
              <p className="text-muted-foreground text-[13px] mt-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                {restaurant.address}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <InfoPill icon={<Star className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={0} />} label={`${restaurant.rating} (${restaurant.reviewCount})`} />
              <InfoPill icon={<Clock className="w-3.5 h-3.5" strokeWidth={2} />} label={restaurant.deliveryTime} />
              <InfoPill icon={<MapPin className="w-3.5 h-3.5" strokeWidth={2} />} label={restaurant.distance} />
              <InfoPill icon={<Bike className="w-3.5 h-3.5" strokeWidth={2} />} label={restaurant.deliveryFee} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-4 mt-6 mb-2">
            {restaurant.openingHours.map((oh) => (
              <div
                key={oh.day}
                className="bg-white  border border-[#EEF0F2] rounded-2xl px-4.5 py-3 text-[13px]"
              >
                <b className="font-semibold">{oh.day}:</b>{" "}
                <span className="text-muted-foreground">{oh.hours}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white border border-[#EEF0F2] rounded-2xl px-4.5 py-3 flex items-center gap-2 text-[13.5px] font-semibold">
      {icon}
      {label}
    </div>
  );
}