// prisma/seed.ts

import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial data...");

  // Optionally clear existing users and accounts to avoid duplication
  await prisma.user.deleteMany({
    where: { email: "mekinjemal999@gmail.com" },
  });

  // Create the admin user
  await prisma.user.create({
    data: {
      id: "admin-mekin-001", // optional static ID for predictability
      name: "Mekin Jemal",
      email: "mekinjemal999@gmail.com",
      emailVerified: true,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("Created admin user: mekinjemal999@gmail.com");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
