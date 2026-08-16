import { prisma } from "@/lib/prisma";


export async function getFoodById(id: string) {
  const foodWithRestaurant = await prisma.food.findUnique({
    where: { id },
    include: { restaurant: true },
  });

  if (!foodWithRestaurant) return null;

  const { restaurant, ...item } = foodWithRestaurant;
  return { item, restaurant };
}


export async function getRelatedFood(restaurantId: string, excludeId: string, limit = 3) {
  return prisma.food.findMany({
    where: { restaurantId, NOT: { id: excludeId } },
    take: limit,
  });
}


export async function getPopularFood(limit = 4) {
  return prisma.food.findMany({
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: limit,
  });
}

export type FoodLookupResult = NonNullable<Awaited<ReturnType<typeof getFoodById>>>;
export type FoodItem = FoodLookupResult["item"];
export type FoodRestaurant = FoodLookupResult["restaurant"];