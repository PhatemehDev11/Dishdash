import { prisma } from "@/lib/prisma";

export async function getUserAddresses(userId: string) {
  return prisma.address.findMany({
    where: { userId },
    orderBy: { isDefault: "desc" },
  });
}

export async function createAddress(
  userId: string,
  data: { label: string; street: string; city: string; details?: string }
) {
  const existingCount = await prisma.address.count({ where: { userId } });

  return prisma.address.create({
    data: {
      userId,
      label: data.label,
      street: data.street,
      city: data.city,
      details: data.details,
      isDefault: existingCount === 0,
    },
  });
}

export async function deleteAddress(userId: string, addressId: string) {
  return prisma.address.deleteMany({ where: { id: addressId, userId } });
}

export async function setDefaultAddress(userId: string, addressId: string) {
  await prisma.$transaction([
    prisma.address.updateMany({ where: { userId }, data: { isDefault: false } }),
    prisma.address.updateMany({ where: { id: addressId, userId }, data: { isDefault: true } }),
  ]);
}
