import { notFound } from "next/navigation";
import  Navbar  from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FoodDetails } from "@/features/food/FoodDetails";
import { RelatedItems } from "@/features/food/RelatedItems";
import { getFoodItemById, getAllFoodItemIds, getRelatedItems } from "@/lib/food";

export function generateStaticParams() {
  return getAllFoodItemIds().map((id) => ({ id }));
}

export default async function FoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = getFoodItemById(id);

  if (!result) {
    notFound();
  }

  const { item, restaurant } = result;
  const related = getRelatedItems(restaurant, item.id);

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
