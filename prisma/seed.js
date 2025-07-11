import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async () => {
  for (let i = 0; i < 9; i++) {
    await prisma.product.create({
      data: {
        price: +faker.commerce.price({ min: 10000, max: 1000000 }),
        description: faker.commerce.productDescription(),
        title: faker.commerce.productName(),
        photo: faker.image.urlPicsumPhotos(),
        created_at: new Date(),
        user: {
          connect: {
            id: 7,
          },
        },
      },
    });
  }
})();
