'use client';

import React, { FormEvent, useState, useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { GithubIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginFormType, loginSchema } from '@/validation/login.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/FormFields';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

 const form =useForm<loginFormType>({
  resolver:zodResolver(loginSchema),
  defaultValues:{
    email:"",
    password:""

  }
 })



  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in with GitHub');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onResponse: () => {
            console.log('GitHub sign-in response');
          },
        },
      });
    });
  };

  const signInWithGoogle = async () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in with Google');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onResponse: () => {
            console.log('Google sign-in response');
          },
        },
      });
    });
  };

  const onSubmit = async (data:loginFormType) => {

    try {
      await authClient.signIn.email(
        { email:data.email, password:data.password , callbackURL: "/dashboard"},
        {
          onRequest: () => {toast.loading('Signing in...')},
          onResponse: () => {toast.dismiss()},
          onSuccess: () => {toast.success('Login successful!')},
          onError: (ctx) => {toast.error(ctx.error.message || 'Login failed')},
        }
      );
    } catch (error) {
      toast.error('Unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50 dark:bg-black transition-colors">
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white dark:bg-neutral-900 p-6 rounded-xl  space-y-2"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login to Chopi Chopi
        </h1>
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
           
        <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
                <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>

           <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center  after:border-t after:border-border">
          <span className='relative z-10 bg-card px-2'>Or</span>
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
          <GithubIcon className="size-5 " />
          Continue with GitHub
        </Button>
     
      </form>
      </Form>
    </div>
  );
};

export default LoginForm;
