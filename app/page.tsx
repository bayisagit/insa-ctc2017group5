"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, Shield, Star, MapPin, Smartphone, Users, Package } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/toggle-theme";
import Navbar from "@/components/Navbar";
import Squares from "@/components/animations/square";
import GridDistortion from "@/components/animations/grid-distortion";
import Image from "next/image";
// import Particles from "./test";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
    

    <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-25 dark:opacity-15">
          <GridDistortion
            imageSrc="/diverse-customer-group.png"
            grid={12}
            mouse={0.1}
            strength={0.12}
            relaxation={0.92}
          />
        </div>
        <Squares/>
        </div>
        


       <Navbar/>
            {/* Ecommerce Promo Banner */}
      <section className="relative z-10 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-2 rounded-xl border border-border bg-card/60 p-6 md:p-8">
            <div className="flex flex-col justify-center text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Shop smarter. Deliver faster.
              </h2>
              <p className="text-muted-foreground mb-4">
                Discover local products, real-time tracking, and secure checkout — all in one place.
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <Link href="/products">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">Shop Now</Button>
                </Link>
                <Link href="#features">
                  <Button size="sm" variant="outline">See Features</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-28 sm:h-36 md:h-44 rounded-lg overflow-hidden border border-border">
                <Image src="/admin-interface.png" alt="Storefront and cart UI" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              </div>
              <div className="relative h-28 sm:h-36 md:h-44 rounded-lg overflow-hidden border border-border">
                <Image src="/professional-driver.png" alt="Professional delivery driver" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              </div>
            </div>
          </div>

          </div>
          </section>
      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
            🚀 Now serving your neighborhood
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-sans leading-tight">
            Fast Delivery from
            <span className="text-primary block">Local Stores</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Order from your favorite local stores and get fresh groceries, household items, and more delivered to your
            door in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <MapPin className="w-5 h-5 mr-2" />
              Find Stores Near You
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-secondary" />
              30-min delivery
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-secondary" />
              Secure payments
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-secondary" />
              5-star service
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Why Choose Mekin?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We connect you with local stores and reliable drivers for the fastest, most convenient delivery
              experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Lightning Fast</CardTitle>
                <CardDescription>
                  Get your orders delivered in 30 minutes or less from local stores in your area.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-sans">Local Stores</CardTitle>
                <CardDescription>
                  Support your community by ordering from neighborhood groceries, pharmacies, and specialty shops.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Real-time Tracking</CardTitle>
                <CardDescription>
                  Track your order from store to door with live updates and driver location.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Secure Payments</CardTitle>
                <CardDescription>
                  Multiple payment options including cash, card, and mobile payments with secure processing.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-sans">Quality Guaranteed</CardTitle>
                <CardDescription>
                  Rate your experience and get refunds for any issues. We ensure every order meets your expectations.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Community First</CardTitle>
                <CardDescription>
                  Built for communities, supporting local businesses and providing flexible earning opportunities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">How It Works</h2>
          <p className="text-xl text-muted-foreground mb-16">Simple steps to get what you need, when you need it</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 font-sans">Browse & Order</h3>
              <p className="text-muted-foreground">Browse local stores, add items to your cart, and place your order with just a few taps.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 font-sans">Store Prepares</h3>
              <p className="text-muted-foreground">Local store receives your order and carefully prepares your items for delivery.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 font-sans">Fast Delivery</h3>
              <p className="text-muted-foreground">Our trusted drivers pick up and deliver your order straight to your door.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5 relative z-10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-6 font-sans">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of customers who trust Mekin for their daily needs. Fast, reliable, and always fresh.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 relative z-10">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground font-sans">Mekin</span>
            </div>
            <p className="text-muted-foreground">Fast delivery from local stores to your door. Supporting communities, one delivery at a time.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 font-sans">For Customers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Download app</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 font-sans">For Partners</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Become a store</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Drive with us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Business solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 font-sans">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Mekin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
