import { getPopularFood } from "@/lib/food";
import DishCard from "./DishCard";
import { SectionHead } from "@/components/shared/SectionHead";

export default async function PopularFoods() {
  const dishes = await getPopularFood(4);

  return (
    <section id="popular-dishes" className="py-20">
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
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="
                min-w-[280px]
                snap-start
                sm:min-w-0
              "
            >
              <DishCard
                id={dish.id}
                name={dish.name}
                category={dish.category}
                price={dish.price}
                icon={dish.icon}
                gradientFrom={dish.gradientFrom}
                gradientTo={dish.gradientTo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}