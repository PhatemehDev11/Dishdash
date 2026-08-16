import { notFound } from "next/navigation";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantHeader } from "@/features/restaurant/RestaurantHeader";
import { MenuSection } from "@/features/restaurant/MenuSection";
import { getRestaurantBySlug } from "@/lib/restaurant";
 
export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
 
  if (!restaurant) {
    notFound();
  }
 
  return (
    <>
      <Navbar />
      <main>
        <RestaurantHeader restaurant={restaurant} />
        <MenuSection restaurant={restaurant} />
      </main>
      <Footer />
    </>
  );
}
 