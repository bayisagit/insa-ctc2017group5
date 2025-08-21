'use client'

import React, {  useState, useTransition } from 'react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { ArrowRight,  GithubIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";

import {  SignupFormType, signupSchema } from '@/validation/signup.validation'
import { InputField } from '@/components/FormFields'
import { Form } from '@/components/ui/form'

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isGithubPending, startGithubTransition] = useTransition()
  const [isGooglePending, startGoogleTransition] = useTransition()


   const form =useForm <SignupFormType>({
    resolver:zodResolver(signupSchema),
    defaultValues:{
      name:"",
      email:"",
      password:""
    }
   })

   const onSubmit= async(data:SignupFormType)=>{



      try {

      await authClient.signUp.email({
        email:data.email,
        password:data.password,
        name:data.name,
         callbackURL: "/login"
      }, {
        onRequest: () => { toast.loading('Creating account...'); },
        onResponse: () =>{ toast.dismiss()},
        onError: (ctx: { error: { code?: string; message?: string } }) => {
          if (ctx.error.code === 'P2002') {
            toast.error('Email already exists')
          } else {
            toast.error(ctx.error.message || 'Registration failed')
          }
        },
        onSuccess: async () =>{ 
          toast.success('Account created successfully!')
          //  await authClient.sendVerificationEmail({
          //   email: email,
          //   callbackURL: "/",
          // });


          // toast("Please check your email to verify it or spam folder for verification link", { icon: "‼️" }); 
          }
      })
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
   }

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: () => {toast.success("Signed In successfully")},
          onError: (ctx:{ error: { code?: string; message?: string } }) => {toast.error(ctx.error.message)},
          onResponse: () => {}
        },
      })
    })
  }

  const signInWithGoogle = async () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: () => {toast.success("Signed In with Google!")},
          onError: (ctx:{ error: { code?: string; message?: string } }) => {toast.error(ctx.error.message)},
          onResponse: () => {}
        },
      })
    })
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50 dark:bg-black transition-colors">
      <Form {...form}>
       <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white dark:bg-neutral-900 p-6 rounded-xl  space-y-3"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Welcome to Chopi Chopi
        </h1>

        <div className="space-y-2">
          {/* <Label htmlFor="name">Name</Label> */}
          <InputField
           control={form.control}
            type="text"
            name="name"
            label='Full Name'

          
            placeholder="Enter your fullName"
          
          />
        </div>

        <div className="space-y-2">
          <InputField
           control={form.control}
            type="email"
            label='Email'
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2 relative">
          <InputField
            control={form.control}
            type="password"
            name="password"
            label='Password'
            placeholder="At least 8 characters"
            showPasswordToggle

          />
         
      
        </div>

       <Button type="submit" className="w-full" disabled={isLoading}>
    {isLoading ? (
      <>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Creating account...
      </>
    ) : (
      <>
        Sign up <ArrowRight className="h-4 w-4 ml-2" />
      </>
    )}
  </Button>
                <p className="text-sm text-left mt-2 text-gray-600">
           have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline ">
             Login
          </Link>
        </p>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center  after:border-t after:border-border">
          <span className='relative z-10 bg-card px-2 text-muted-foreground'>Or</span>
        </div>

        <Button
          onClick={signInWithGoogle}
          disabled={isGooglePending}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaGoogle className="size-5" />
          Continue with Google
        </Button>

        <Button
          onClick={signInWithGithub}
          disabled={isGithubPending}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <GithubIcon className="size-5   " />
          Continue with GitHub
        </Button>
     
      </form>
      </Form>
    </div>
  )
}

export default Signup
