import { POPULAR_DISHES } from "@/lib/constants/home";
import DishCard from "./DishCard";


export default function PopularFoods() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    
        <div className="text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
            Popular
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Popular Dishes
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Crowd favorites, picked by thousands of hungry customers this week.
          </p>
        </div>

       
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