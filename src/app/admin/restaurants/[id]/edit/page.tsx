import { notFound } from "next/navigation";
import { adminGetRestaurant } from "@/lib/adminRestaurants";
import { EditRestaurantForm } from "@/features/admin/EditRestaurantForm";

export default async function EditRestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await adminGetRestaurant(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="max-w-[560px]">
      <h1 className="text-2xl font-extrabold mb-8">Edit Restaurant</h1>
      <EditRestaurantForm id={restaurant.id} initialValues={restaurant} />
    </div>
  );
}
