import { ReactNode } from "react"


const AuthLayout=({children}:{children:ReactNode})=>{
    return (
        <div className="relative flex min-h-svh flex-col items-center ">

            <div className="flex w-full max-w-sm flex-col gap-6 ">{children}</div>
        </div>
    )
}

export default AuthLayout