import { prisma } from "@/lib/prisma";

export async function adminGetAllRestaurants() {
  return prisma.restaurant.findMany({ orderBy: { name: "asc" } });
}

export async function adminGetRestaurant(id: string) {
  return prisma.restaurant.findUnique({ where: { id } });
}

export interface RestaurantInput {
  slug: string;
  name: string;
  icon: string;
  coverFrom: string;
  coverTo: string;
  deliveryTime: string;
  distance: string;
  deliveryFee: string;
  isOpen: boolean;
  address: string;
  description: string;
}

export async function adminCreateRestaurant(data: RestaurantInput) {
  return prisma.restaurant.create({
    data: { ...data, rating: 0, reviewCount: 0 },
  });
}

export async function adminUpdateRestaurant(id: string, data: RestaurantInput) {
  return prisma.restaurant.update({ where: { id }, data });
}

export async function adminDeleteRestaurant(id: string) {
  return prisma.restaurant.delete({ where: { id } });
}
