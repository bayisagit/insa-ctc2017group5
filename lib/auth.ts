import { betterAuth } from "better-auth";
import { PrismaClient } from "./generated/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins"
const prisma = new PrismaClient();
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
   provider: "sqlite",
  }),
      plugins: [ 
        organization() 
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