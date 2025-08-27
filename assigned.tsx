// // pages/driver/deliveries/assigned.tsx
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export async function getServerSideProps() {
//   const deliveries = await prisma.order.findMany({
//     where: { driverId: "driver-id", status: { in: ["OUT_FOR_DELIVERY"] } },
//     include: { deliveryAddress: true, restaurant: true },
//   });
//   return { props: { deliveries } };
// }