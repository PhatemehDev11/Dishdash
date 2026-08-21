import { prisma } from "@/lib/prisma";

export async function getCartItems(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      food: {
        include: { restaurant: { select: { slug: true, name: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function addToCart(userId: string, foodId: string, quantity: number) {
  return prisma.cartItem.upsert({
    where: { userId_foodId: { userId, foodId } },
    update: { quantity: { increment: quantity } },
    create: { userId, foodId, quantity },
  });
}

export async function updateCartItemQuantity(userId: string, itemId: string, quantity: number) {
  if (quantity <= 0) {
    return prisma.cartItem.deleteMany({ where: { id: itemId, userId } });
  }
  return prisma.cartItem.updateMany({
    where: { id: itemId, userId },
    data: { quantity },
  });
}

export async function removeCartItem(userId: string, itemId: string) {
  return prisma.cartItem.deleteMany({ where: { id: itemId, userId } });
}

export type CartItemWithFood = Awaited<ReturnType<typeof getCartItems>>[number];
