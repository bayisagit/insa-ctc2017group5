import { PrismaClient, Role as PrismaRole } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

/**
 * Add / adjust users here. Keep email unique.
 */
const userSeeds: Array<{
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: PrismaRole;
}> = [
  // Core (existing) users
  { id: "admin-0001", name: "Mekin Jemal",      email: "mekinjemal999@gmail.com", emailVerified: true, role: PrismaRole.ADMIN },
  { id: "owner-0001", name: "Store Owner One",  email: "owner1@example.com",      emailVerified: true, role: PrismaRole.STORE_OWNER },
  { id: "customer-0001", name: "Customer One",  email: "customer1@example.com",   emailVerified: true, role: PrismaRole.CUSTOMER },
  { id: "driver-0001", name: "Driver One",      email: "driver1@example.com",     emailVerified: true, role: PrismaRole.DRIVER },

  // Additional sample admins
  { id: "admin-0002", name: "Second Admin",     email: "admin2@example.com",      emailVerified: true, role: PrismaRole.ADMIN },

  // Additional store owners
  { id: "owner-0002", name: "Store Owner Two",  email: "owner2@example.com",      emailVerified: true, role: PrismaRole.STORE_OWNER },

  // More customers
  { id: "customer-0002", name: "Customer Two",  email: "customer2@example.com",   emailVerified: true, role: PrismaRole.CUSTOMER },
  { id: "customer-0003", name: "Customer Three",email: "customer3@example.com",   emailVerified: false, role: PrismaRole.CUSTOMER },

  // More drivers
  { id: "driver-0002", name: "Driver Two",      email: "driver2@example.com",     emailVerified: true, role: PrismaRole.DRIVER },
];

async function upsertUser(u: (typeof userSeeds)[number]) {
  return prisma.user.upsert({
    where: { email: u.email },
    update: {
      name: u.name,
      role: u.role,
      emailVerified: u.emailVerified,
      updatedAt: new Date(),
    },
    create: {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      emailVerified: u.emailVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

async function seedUsers() {
  console.log(`Seeding ${userSeeds.length} users...`);
  await Promise.all(
    userSeeds.map(async (u) => {
      await upsertUser(u);
      console.log(`Upserted user: ${u.email} (${u.role})`);
    })
  );
  console.log("Users seeded.");
}

/* ================== PLACEHOLDER SEEDERS (Uncomment & adapt to your models) ==================

async function seedStores() {
  // Example (adjust field names):
  // const stores = [
  //   { id: "store-0001", name: "Alpha Store", ownerId: "owner-0001" },
  //   { id: "store-0002", name: "Beta Store",  ownerId: "owner-0002" },
  // ];
  // for (const s of stores) {
  //   await prisma.store.upsert({
  //     where: { id: s.id },
  //     update: { name: s.name, ownerId: s.ownerId },
  //     create: { ...s, createdAt: new Date(), updatedAt: new Date() },
  //   });
  // }
}

async function seedCategories() {
  // const categories = [{ id: "cat-0001", name: "Beverages" }, { id: "cat-0002", name: "Snacks" }];
  // for (const c of categories) {
  //   await prisma.category.upsert({
  //     where: { id: c.id },
  //     update: { name: c.name },
  //     create: { ...c, createdAt: new Date(), updatedAt: new Date() },
  //   });
  // }
}

async function seedProducts() {
  // const products = [
  //   { id: "prod-0001", name: "Cola", price: 25, storeId: "store-0001", categoryId: "cat-0001" },
  //   { id: "prod-0002", name: "Chips", price: 15, storeId: "store-0001", categoryId: "cat-0002" },
  // ];
  // for (const p of products) {
  //   await prisma.product.upsert({
  //     where: { id: p.id },
  //     update: { name: p.name, price: p.price, storeId: p.storeId, categoryId: p.categoryId },
  //     create: { ...p, createdAt: new Date(), updatedAt: new Date() },
  //   });
  // }
}

async function seedOrders() {
  // const orders = [
  //   { id: "order-0001", customerId: "customer-0001", storeId: "store-0001", total: 40, status: "PENDING" },
  // ];
  // for (const o of orders) {
  //   await prisma.order.upsert({
  //     where: { id: o.id },
  //     update: { status: o.status, total: o.total },
  //     create: { ...o, createdAt: new Date(), updatedAt: new Date() },
  //   });
  // }
}

async function seedOrderItems() {
  // const items = [
  //   { orderId: "order-0001", productId: "prod-0001", quantity: 1, unitPrice: 25 },
  //   { orderId: "order-0001", productId: "prod-0002", quantity: 1, unitPrice: 15 },
  // ];
  // for (const it of items) {
  //   await prisma.orderItem.upsert({
  //     where: { orderId_productId: { orderId: it.orderId, productId: it.productId } },
  //     update: { quantity: it.quantity, unitPrice: it.unitPrice },
  //     create: { ...it },
  //   });
  // }
}

async function seedAddresses() {
  // const addresses = [
  //   { id: "addr-0001", userId: "customer-0001", line1: "123 Main St", city: "Addis", country: "ET" },
  // ];
  // for (const a of addresses) {
  //   await prisma.address.upsert({
  //     where: { id: a.id },
  //     update: { line1: a.line1, city: a.city, country: a.country },
  //     create: { ...a, createdAt: new Date(), updatedAt: new Date() },
  //   });
  // }
}

============================================================================================== */

async function main() {
  console.log("Starting seeding...");
  await seedUsers();
  // await seedStores();
  // await seedCategories();
  // await seedProducts();
  // await seedOrders();
  // await seedOrderItems();
  // await seedAddresses();
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
