'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Key, Flag, MapPin } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useRouter } from 'next/navigation';

type FormDataType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  locationName: string;
  locationDetails: string;
};

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    locationName: '',
    locationDetails: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof FormDataType>(field: K, value: FormDataType[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "User registered successfully!");
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
          locationName: '',
          locationDetails: '',
        });
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground p-6 md:p-12">
      {/* Add Toaster here if not added globally */}
      <Toaster />

      {/* Left Side */}
      <div className="md:w-1/3 mb-6 md:mb-0 pr-6">
        <h2 className="text-3xl font-bold mb-4 dark:text-blue-700">Sign up</h2>
        <p className="text-muted-foreground leading-relaxed">
          Create your account to start ordering food online instantly.
          Please fill in all fields to complete your registration using the button below.
        </p>
        <p className="mt-8">
          Already have an account?{" "}
          <Button
            variant="outline"
            className="justify-center gap-2"
            onClick={() => {
              router.push('/auth/login');
            }}
          >
            Login
          </Button>
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-2/3 bg-card rounded-lg shadow p-6 space-y-6">
        {/* Name Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <User size={16} /> First Name
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <User size={16} /> Last Name
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Phone size={16} /> Phone Number (e.g. 911-222-333)
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="911-222-333"
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Mail size={16} /> E-mail Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Password Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-1 dark:text-blue-700">
              <Key size={16} /> Create a password
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="********"
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-1 dark:text-blue-700">
              <Key size={16} /> Repeat password
            </label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="********"
            />
          </div>
        </div>

        {/* Location Intro */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          To ensure your order gets to you as quickly as possible, we use GPS coordinates to locate you. 
          Create your first delivery location below by telling us more about where you are and pinning your 
          location on the map. Make sure your pin is accurate to avoid delays.
        </p>

        {/* Location Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <Flag size={16} /> What would you like to call your first location?
          </label>
          <Input
            value={formData.locationName}
            onChange={(e) => handleChange('locationName', e.target.value)}
            placeholder="Home, Office, etc."
          />
        </div>

        {/* Location Details */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1">
            <MapPin size={16} /> Tell us more about this location
          </label>
          <Input
            value={formData.locationDetails}
            onChange={(e) => handleChange('locationDetails', e.target.value)}
            placeholder="Street, building, nearby landmark..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            className="w-full md:w-auto dark:text-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Your Account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
