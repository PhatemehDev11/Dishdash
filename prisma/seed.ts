import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { restaurantDetails } from "../src/lib/constants/restaurant";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const r of Object.values(restaurantDetails)) {
    const restaurant = await prisma.restaurant.create({
      data: {
        slug: r.slug,
        name: r.name,
        icon: r.icon,
        coverFrom: r.coverFrom,
        coverTo: r.coverTo,
        rating: r.rating,
        reviewCount: r.reviewCount,
        deliveryTime: r.deliveryTime,
        distance: r.distance,
        deliveryFee: r.deliveryFee,
        isOpen: r.isOpen,
        address: r.address,
        description: r.description,
        openingHours: {
          create: r.openingHours.map((oh) => ({ day: oh.day, hours: oh.hours })),
        },
        menu: {
          create: r.menu.map((item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            icon: item.icon,
            category: item.category,
            gradientFrom: item.gradientFrom,
            gradientTo: item.gradientTo,
            rating: item.rating,
            reviewCount: item.reviewCount,
            ingredients: item.ingredients,
          })),
        },
      },
    });

    console.log(`✓ Seeded restaurant: ${restaurant.name}`);
  }
}

main()
  .then(async () => {
    console.log("Seeding finished.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
