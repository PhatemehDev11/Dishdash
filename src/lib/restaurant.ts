import { prisma } from "@/lib/prisma";

export async function getAllRestaurants() {
  return prisma.restaurant.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getFeaturedRestaurants(limit = 3) {
  return prisma.restaurant.findMany({
    orderBy: { rating: "desc" },
    take: limit,
  });
}

export async function getRestaurantBySlug(slug: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      menu: true,
      openingHours: true,
    },
  });

  if (!restaurant) return null;


  const categories = Array.from(
    new Set(restaurant.menu.map((item) => item.category).filter((c) => c !== "Popular"))
  );

  return {
    ...restaurant,
    categories: ["Popular", ...categories],
  };
}

export type RestaurantListItem = Awaited<ReturnType<typeof getAllRestaurants>>[number];
export type RestaurantWithMenu = NonNullable<Awaited<ReturnType<typeof getRestaurantBySlug>>>;
export type MenuFoodItem = RestaurantWithMenu["menu"][number];