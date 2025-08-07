'use client'

import React, { FormEvent, useState, useTransition } from 'react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { GithubIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'

const Form = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isGithubPending, startGithubTransition] = useTransition()
  const [isGooglePending, startGoogleTransition] = useTransition()

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    return password.length >= minLength && hasLetter && hasNumber
  }

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: () => {toast.success("Signed In successfully")},
          onError: (ctx) => {toast.error(ctx.error.message)},
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
          onError: (ctx) => {toast.error(ctx.error.message)},
          onResponse: () => {}
        },
      })
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")?.toString().trim() || ''
    const email = formData.get("email")?.toString().trim() || ''
    const password = formData.get("password")?.toString() || ''

    if (!name || !email || !password) {
      toast.error('Please fill all fields')
      setIsLoading(false)
      return
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters with letters and numbers')
      setIsLoading(false)
      return
    }

    try {
      await authClient.signUp.email({
        email,
        password,
        name
      }, {
        onRequest: () => { toast.loading('Creating account...'); },
        onResponse: () =>{ toast.dismiss()},
        onError: (ctx) => {
          if (ctx.error.code === 'P2002') {
            toast.error('Email already exists')
          } else {
            toast.error(ctx.error.message || 'Registration failed')
          }
        },
        onSuccess: () =>{ toast.success('Account created successfully!')}
      })
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50 dark:bg-black transition-colors">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Welcome to Chopi Chopi
        </h1>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
            minLength={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="At least 8 characters"
            required
            minLength={8}
          />
          <p className="text-xs text-muted-foreground">
            Must include letters and numbers.
          </p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>
                <p className="text-sm text-center mt-6 text-gray-600">
           have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
             Login
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>or</span>
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
          <GithubIcon className="size-5 text-blue-800" />
          Continue with GitHub
        </Button>
     
      </form>
    </div>
  )
}

export default Form
