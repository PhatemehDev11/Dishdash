import { notFound } from "next/navigation";
import { adminGetFood } from "@/lib/adminFoods";
import { adminGetAllRestaurants } from "@/lib/adminRestaurants";
import { EditFoodForm } from "@/features/admin/EditFoodForm";

export default async function EditFoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [food, restaurants] = await Promise.all([adminGetFood(id), adminGetAllRestaurants()]);

  if (!food) {
    notFound();
  }

  return (
    <div className="max-w-[560px]">
      <h1 className="text-2xl font-extrabold mb-8">Edit Food</h1>
      <EditFoodForm
        id={food.id}
        restaurants={restaurants.map((r) => ({ id: r.id, name: r.name }))}
        initialValues={{
          restaurantId: food.restaurantId,
          name: food.name,
          description: food.description,
          price: food.price,
          icon: food.icon,
          category: food.category,
          gradientFrom: food.gradientFrom,
          gradientTo: food.gradientTo,
          ingredientsText: food.ingredients.join(", "),
        }}
      />
    </div>
  );
}
