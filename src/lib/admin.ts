import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [restaurantCount, foodCount, orderCount, userCount, revenueAgg] = await Promise.all([
    prisma.restaurant.count(),
    prisma.food.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  return {
    restaurantCount,
    foodCount,
    orderCount,
    userCount,
    revenue: revenueAgg._sum.total ?? 0,
  };
}
