"use server"
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser=async()=>{
     // get current user
    const session = await auth.api.getSession({
        headers:await headers()
    });

    // if not session
    if(!session){
        redirect("/login");
    }

    const currentUser= await prisma.user.findFirst({
        where: {
            id: session.user.id
        }
    }); 
    // if no user found
    if(!currentUser){
        redirect("/login");
    }

    return  {
      ...session,currentUser
    }
}