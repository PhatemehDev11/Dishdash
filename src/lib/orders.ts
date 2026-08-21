import { prisma } from "@/lib/prisma";

const DELIVERY_FEE = 2.99;

export async function createOrder(userId: string, addressId: string) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { food: true },
  });

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  const order = await prisma.order.create({
    data: {
      userId,
      addressId,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      items: {
        create: cartItems.map((item) => ({
          foodId: item.foodId,
          name: item.food.name,
          price: item.food.price,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  // Checkout clears the cart once the order is placed
  await prisma.cartItem.deleteMany({ where: { userId } });

  return order;
}

export async function getOrderById(userId: string, orderId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      items: true,
      address: true,
    },
  });
}
