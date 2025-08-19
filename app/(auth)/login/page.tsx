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

import { loginFormType, loginSchema } from "@/validation/login.validation";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ---- Auth Handlers ----
  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
        fetchOptions: {
          onSuccess: () => {toast.success("Signed in with GitHub")},
          onError: (ctx) => {toast.error(ctx.error.message)},
        },
      });
    });
  };

  const signInWithGoogle = async () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        fetchOptions: {
          onSuccess: () => {toast.success("Signed in with Google")},
          onError: (ctx) => {toast.error(ctx.error.message)},
        },
      });
    });
  };

  const onSubmit = async (data: loginFormType) => {
    try {
      await authClient.signIn.email(
        { email: data.email, password: data.password, callbackURL: "/dashboard" },
        {
          onRequest: () => {toast.loading("Signing in...")},
          onResponse: () => {toast.dismiss()},
          onSuccess: () => {toast.success("Login successful!")},
          onError: (ctx) => {toast.error(ctx.error.message || "Login failed")},
        }
      );
    } catch (error) {
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-screen bg-zinc-50 px-4 py-8 md:py-10 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="p-8 pb-6">
            <div>
              {/* <Link href="/" aria-label="go home">
                {/* <LogoIcon /> */} 
              {/* </Link>  */}
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Sign In to Tailark
              </h1>
              <p className="text-sm">Welcome back! Sign in to continue</p>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Google */}
              <Button
                type="button"
                variant="outline"
                onClick={signInWithGoogle}
                disabled={isGooglePending}
                className="flex items-center gap-2"
              >
                        <GoogleIcon className="h-4 w-4" />
                
                <span>Google</span>
              </Button>

              {/* GitHub */}
              <Button
                type="button"
                variant="outline"
                onClick={signInWithGithub}
                disabled={isGithubPending}
                className="flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </div>

            <hr className="my-4 border-dashed" />

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <InputField
                  control={form.control}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Button asChild variant="link" size="sm">
                    <Link href="/forget-password" className="text-sm">
                      Forgot your Password?
                    </Link>
                  </Button>
                </div>
                <InputField
                  control={form.control}
                  name="password"
                  type="password"
                  label=""
                  placeholder="At least 8 characters"
                  showPasswordToggle
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer"
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </div>
          </div>

          {/* <div className="bg-muted rounded-(--radius) border p-3"> */}
            <p className="text-accent-foreground text-center text-sm p-3">
              Don't have an account?{" "}
              <Button asChild variant="link" className="px-2">
                <Link href="/register">Create account</Link>
              </Button>
            </p>
          {/* </div> */}
        </form>
      </Form>
    </section>
  );
}
