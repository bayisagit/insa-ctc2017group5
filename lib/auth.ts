
// Create A Better Auth Instance
// Create a file named auth.ts in one of these locations:
import {betterAuth} from "better-auth"
import {prismaAdapter}from "better-auth/adapters/prisma"
import {prisma} from "@/lib/prisma"
export const auth=betterAuth({
    database:prismaAdapter(prisma,{
        provider:"postgresql"
    })

})