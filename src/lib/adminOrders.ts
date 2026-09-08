import { prisma } from "@/lib/prisma";

export type OrderStatusValue =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

export async function adminGetAllOrders() {
  return prisma.order.findMany({
    include: {
      items: true,
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function adminUpdateOrderStatus(id: string, status: OrderStatusValue) {
  return prisma.order.update({ where: { id }, data: { status } });
}
