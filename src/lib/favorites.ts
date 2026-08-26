import { prisma } from "@/lib/prisma";

export async function getFavoriteFoodIds(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { foodId: true },
  });
  return favorites.map((f) => f.foodId);
}

export async function getUserFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      food: {
        include: { restaurant: { select: { slug: true, name: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/** Adds the favorite if it doesn't exist, removes it if it does. */
export async function toggleFavorite(userId: string, foodId: string) {
  const existing = await prisma.favorite.findUnique({
    where: { userId_foodId: { userId, foodId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { favorited: false };
  }

  await prisma.favorite.create({ data: { userId, foodId } });
  return { favorited: true };
}
