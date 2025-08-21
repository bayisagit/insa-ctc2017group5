"use server"

import { getCurrentUser } from "./user";
import { prisma } from "@/lib/prisma";


export const getOrganization = async () => {

    const {currentUser} = await getCurrentUser();

    // check the member inside the 

    const members= await prisma.member.findMany({
        where:{
            userId: currentUser.id
            
        }
    })

const organizations = await prisma.organization.findMany({
  where: {
    id: {
      in: members.map(member => member.organizationId),
    },
  },
  include: {
    members: {
      where: { role: "owner" }, // only include owners
    },
  },
});


    return organizations
  // Fetch organization data from a database or API

}   