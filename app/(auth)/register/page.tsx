"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/FormFields";
import { authClient } from "@/lib/auth-client";
// import { GoogleIcon } from "@/components/icons/GoogleIcon";
// import { GithubIcon } from "@/components/icons/GithubIcon";
// import { LogoIcon } from "@/components/logo";

import {  SignupFormType, signupSchema } from "@/validation/signup.validation";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // ---- Social Logins ----
  const signUpWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        fetchOptions: {
          onSuccess: () => {toast.success("Signed up with GitHub")},
          onError: (ctx) => {toast.error(ctx.error.message)},
        },
      });
    });
  };

  const signUpWithGoogle = async () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        fetchOptions: {
          onSuccess: () => {toast.success("Signed up with Google")},
          onError: (ctx) => {toast.error(ctx.error.message)},
        },
      });
    });
  };

  // ---- Email Signup ----
  const onSubmit = async (data: SignupFormType) => {
    try {
      await authClient.signUp.email(
        { email: data.email, password: data.password, name: data.name, callbackURL: "/dashboard" },
        {
          onRequest: () => {toast.loading("Creating account...")},
          onResponse: () => {toast.dismiss()},
          onSuccess: () => {toast.success("Account created successfully!")},
          onError: (ctx) => {toast.error(ctx.error.message || "Signup failed")},
        }
      );
    } catch (error) {
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-screen bg-zinc-50 px-4 py-10 md:py-10 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="p-8 ">
            <div>
              {/* <Link href="/" aria-label="go home">
                {/* <LogoIcon className="h-6 w-6" /> */}
              {/* </Link>  */}
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Create an Account
              </h1>
              <p className="text-sm">Welcome! Create an account to get started</p>
            </div>

            {/* Social Signup */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={signUpWithGoogle}
                disabled={isGooglePending}
                className="flex gap-2"
              >
                <GoogleIcon className="h-4 w-4" />
                <span>Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={signUpWithGithub}
                disabled={isGithubPending}
                className="flex gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </div>

            <hr className="my-4 border-dashed" />

            {/* Form Fields */}
            <div className="space-y-6">
              <InputField
                control={form.control}
                name="name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
              />

              <InputField
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
              />

              <div className="space-y-0.5">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <InputField
                  control={form.control}
                  name="password"
                  type="password"
                  label=""
                  placeholder="At least 8 characters"
                  showPasswordToggle
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </div>

          {/* <div className="bg-muted rounded-(--radius) border p-3"> */}
            <p className="text-accent-foreground text-center text-sm p-3">
              Already have an account? {" "}
              <Button asChild variant="link" className="px-2">
                <Link href="/login">Sign In</Link>
              </Button>
            </p>
          {/* </div> */}
        </form>
      </Form>
    </section>
  );
}
