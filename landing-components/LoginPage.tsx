'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { User, Lock, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Logged in successfully!");

        // Navigate to home page after short delay so toast can be seen
        setTimeout(() => {
          if (data.role === "ADMIN") {
            router.push("/admin/");
          } else if (data.role === "RESTAURANT") {
            router.push("/restaurants/");
          } else if (data.role === "USER") {
            router.push("/customer/");
          } else {
            router.push("/"); // fallback
          }        
        }, 1500);
      } else {
        toast.error(data.message || "Login failed.");
      }

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[70vh] flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginbackground.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-4 mb-4 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 rounded-lg shadow-md p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Log into your account
        </h2>

        {/* Email Input */}
        <label htmlFor="email" className="relative block mb-4">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
            autoComplete="email"
          />
        </label>

        {/* Password Input */}
        <label htmlFor="password" className="relative block mb-4">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10"
            autoComplete="current-password"
          />
        </label>

        {/* Remember me */}
        <div className="flex items-center mb-6 space-x-2">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="remember"
            className="text-gray-900 dark:text-gray-100 select-none cursor-pointer"
          >
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full mb-4 py-3 text-lg" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">Or</p>

        {/* Create Account Button */}
        <Button
          variant="outline"
          className="w-full mb-4 flex items-center justify-center gap-2"
          onClick={() => {
            window.location.href = '/auth/signup';
          }}
        >
          <Plus size={16} />
          Create an account
        </Button>

        {/* Forgot Password */}
        <Button
          variant="ghost"
          className="w-full text-sm text-center text-blue-600 dark:text-blue-400"
          onClick={() => {
            window.location.href = '/auth/forgotpassword';
          }}
        >
          Forgot password?
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
