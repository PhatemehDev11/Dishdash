import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantsGrid } from "@/features/restaurant/RestaurantsGrid";
import { SectionHead } from "@/components/shared/SectionHead";
import { getAllRestaurants } from "@/lib/restaurant";
 
export default async function RestaurantsListPage() {
  const restaurants = await getAllRestaurants();
 
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[150px] pb-20 md:pb-[100px]">
          <div className="max-w-[1240px] mx-auto px-8">
            <SectionHead
              eyebrow="All Restaurants"
              title="Find Your Next Meal"
              description="Browse every restaurant on DishDash and order in a few taps."
            />
            <RestaurantsGrid restaurants={restaurants} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
 