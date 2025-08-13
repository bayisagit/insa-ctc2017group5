import { createAuthClient } from "better-auth/client"
import { organizationClient,adminClient
 } from "better-auth/client/plugins"
 
export const authClient = createAuthClient({
    plugins: [ 
        organizationClient() ,
         adminClient()
    ] 
})

