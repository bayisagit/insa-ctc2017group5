import { createAuthClient } from "better-auth/client"
import { organizationClient,adminClient
 } from "better-auth/client/plugins"
 import { ac, ADMIN, STORE_OWNER, DRIVER, CUSTOMER } from "./permissions";
 
 
export const authClient = createAuthClient({
    plugins: [ 
        organizationClient() ,
         adminClient({
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
    ] 
})

