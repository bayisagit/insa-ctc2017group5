"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/FormFields"; // your custom wrapper
import { Label } from "@/components/ui/label";

// ---------------- Schema ----------------
const checkoutSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone_number: z
    .string()
    .min(9, "Phone number must be at least 9 digits")
    .max(15, "Too long"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => Number(val) > 0, "Amount must be greater than 0"),
  currency: z.string().default("ETB"),
});

type CheckoutFormType = z.infer<typeof checkoutSchema>;

// ---------------- Component ----------------
export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      amount: "",
      currency: "ETB",
    },
  });

  const onSubmit = async (values: CheckoutFormType) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/accept-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.data?.checkout_url) {
        toast.success("Redirecting to payment...");
        window.location.href = data.data.checkout_url;
      } else {
        toast.error("Payment failed! Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-12 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card m-auto w-full max-w-md rounded-xl border p-8 shadow-md"
        >
          <h1 className="mb-2 text-xl font-semibold">Checkout with Chapa</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter your details to proceed with payment
          </p>

          <div className="space-y-5">
            <InputField
              control={form.control}
              name="first_name"
              type="text"
              label="First Name"
              placeholder="John"/>

            <InputField
              control={form.control}
              name="last_name"
              type="text"
              label="Last Name"
              placeholder="Doe"
            />
            
            <InputField
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="john.doe@example.com"
            />

            <InputField
              control={form.control}
              name="phone_number"
              type="text"
              label="Phone Number"
              placeholder="+251900000000"
            />
              placeholder="+251900000000"
            
            <InputField
              control={form.control}
              name="amount"
              label="Amount (ETB)"
              type="number"
              placeholder="100"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full cursor-pointer"
          >
            {isLoading ? "Processing..." : "Pay with Chapa"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
