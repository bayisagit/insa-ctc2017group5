'use client';

import React, { FormEvent, useState, useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { GithubIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString() || '';

    if (!email || !password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      await authClient.signIn.email(
        { email, password },
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl space-y-2"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login to Chopi Chopi
        </h1>

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
            placeholder="Your password"
            required
            minLength={8}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
                <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>or</span>
        </div>

        <Button
          onClick={signInWithGoogle}
          disabled={isGooglePending}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <FaGoogle className="size-5" />
          Continue with Google
        </Button>

        <Button
          onClick={signInWithGithub}
          disabled={isGithubPending}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <GithubIcon className="size-5 text-blue-800" />
          Continue with GitHub
        </Button>
     
      </form>
    </div>
  );
};

export default LoginForm;
