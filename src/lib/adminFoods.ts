import { prisma } from "@/lib/prisma";

export async function adminGetAllFoods() {
  return prisma.food.findMany({
    include: { restaurant: { select: { name: true } } },
    orderBy: { name: "asc" },
  });
}

export async function adminGetFood(id: string) {
  return prisma.food.findUnique({ where: { id } });
}

export interface FoodInput {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  gradientFrom: string;
  gradientTo: string;
  ingredients: string[];
}

export async function adminCreateFood(data: FoodInput) {
  return prisma.food.create({ data: { ...data, rating: 0, reviewCount: 0 } });
}

export async function adminUpdateFood(id: string, data: FoodInput) {
  return prisma.food.update({ where: { id }, data });
}

export async function adminDeleteFood(id: string) {
  return prisma.food.delete({ where: { id } });
}
