import { prisma } from "@/lib/prisma";

export async function searchAll(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return { restaurants: [], food: [] };

  const [restaurants, food] = await Promise.all([
    prisma.restaurant.findMany({
      where: { name: { contains: trimmed, mode: "insensitive" } },
      take: 5,
    }),
    prisma.food.findMany({
      where: { name: { contains: trimmed, mode: "insensitive" } },
      include: { restaurant: { select: { slug: true, name: true } } },
      take: 5,
    }),
  ]);

  return { restaurants, food };
}
