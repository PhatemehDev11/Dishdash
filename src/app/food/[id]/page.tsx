import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FoodDetails } from "@/features/food/FoodDetails";
import { RelatedItems } from "@/features/food/RelatedItems";
import { getFoodById, getRelatedFood } from "@/lib/food";

export default async function FoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getFoodById(id);

  if (!result) {
    notFound();
  }

  const { item, restaurant } = result;
  const related = await getRelatedFood(restaurant.id, item.id);

  return (
    <>
      <Navbar />
      <main>
      <FoodDetails item={item} restaurant={restaurant} />
     <RelatedItems items={related} restaurant={restaurant} />
      </main>
      <Footer />
    </>
  );
}