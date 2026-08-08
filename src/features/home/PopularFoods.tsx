import { POPULAR_DISHES } from "@/lib/constants/home";
import DishCard from "./DishCard";
import { SectionHead } from "@/components/shared/SectionHead";

export default function PopularFoods() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Popular"
          title=" Popular Dishes"
          description="  Crowd favorites, picked by thousands of hungry customers this week."
        />

        <div
          className=" mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide
            sm:grid sm:grid-cols-2 sm:overflow-visible
            lg:grid-cols-4
          "
        >
          {POPULAR_DISHES.map((dish) => (
            <div
              key={dish.name}
              className="
                min-w-[280px]
                snap-start
                sm:min-w-0
              "
            >
              <DishCard {...dish} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
