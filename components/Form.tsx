"use client"

import React, { FormEvent, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signUp } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Form = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    return password.length >= minLength && hasLetter && hasNumber
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")?.toString().trim() || ''
    const email = formData.get("email")?.toString().trim() || ''
    const password = formData.get("password")?.toString() || ''

    // Enhanced validation
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
      await signUp.email({
        email,
        password,
        name
      }, {
        onRequest: () => {
          toast.loading('Creating account...')
        },
        onResponse: () => {
          toast.dismiss()
        },
        onError: (ctx) => {
          if (ctx.error.code === 'P2002') {
            toast.error('Email already exists')
          } else {
            toast.error(ctx.error.message || 'Registration failed')
          }
        },
        onSuccess: () => {
          toast.success('Account created successfully!')
          // router.push('/dashboard') // Redirect after successful signup
        }
      })
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">
        Welcome to Chopi Chopi App
      </h1>
      
      <div className="space-y-2">
        <Label htmlFor='name'>Name</Label>
        <Input 
          type='text' 
          name='name' 
          id="name" 
          placeholder='Enter your name'
          required
          minLength={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor='email'>Email</Label>
        <Input 
          type='email' 
          name='email' 
          id="email" 
          placeholder='Enter your email'
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor='password'>Password</Label>
        <Input 
          type='password' 
          name='password' 
          id="password" 
          placeholder='Enter your password (min 8 characters)'
          required
          minLength={8}
          title="Must contain at least one letter and one number"
        />
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters with letters and numbers
        </p>
      </div>

      <Button type='submit' disabled={isLoading} className="w-full">
        {isLoading ? 'Creating account...' : 'Submit'}
      </Button>
    </form>
  )
}

export default Form