"use client"

import { Form } from "../../ui/form"
import { organizaionSchema, OrganizationFormType } from "@/validation/organizaion.validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputField } from "../../FormFields"
import { Button } from "../../ui/button"
import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export const CreateOrganizaionForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router=useRouter()

  const form = useForm<OrganizationFormType>({
    resolver: zodResolver(organizaionSchema),
    defaultValues: {
      name: "",
      slug: ""
    }
  })

  const onSubmit = async (data: OrganizationFormType) => {
    try {
      setIsLoading(true)  // start loading
      const { data: createdOrg, error } = await authClient.organization.create({
        name: data.name,
        slug: data.slug,
        keepCurrentActiveOrganization: false
      })

      if (error) {
        console.error("Error creating organization:", error)
        // You can show a toast or alert here
      } else {
        console.log("Organization created successfully:", createdOrg)
        // Optionally reset the form
        form.reset()
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    } finally {
      setIsLoading(false)  // stop loading
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="space-y-2 mb-4">
          <InputField
            control={form.control}
            type="text"
            name="name"
            label="Full Name"
            placeholder="Enter organization name"
          />
        </div>

        <div className="space-y-2 mb-4">
          <InputField
            control={form.control}
            type="text"
            name="slug"
            label="Slug"
            placeholder="Enter organization slug"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Creating Organization...
            </>
          ) : (
            <>
              Create Organization <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
