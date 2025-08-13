import { betterAuth } from "better-auth";
import { PrismaClient } from "./generated/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin, organization } from "better-auth/plugins"
import { ac, ADMIN, STORE_OWNER, DRIVER, CUSTOMER } from "./permissions";
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  plugins: [
    organization(),
    adminPlugin({
      ac,
      roles: {
        ADMIN,
        STORE_OWNER,
        DRIVER,
        CUSTOMER,
      },
      defaultRole: "CUSTOMER",
      adminRoles: ["ADMIN"], // Roles with admin capabilities
      adminUserIds: process.env.ADMIN_USER_IDS?.split(",") || [], // specific IDs

    })
  ],

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});