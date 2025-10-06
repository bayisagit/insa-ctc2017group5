"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, Shield, Star, MapPin, Smartphone, Users, Package, Play } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Squares from "@/components/animations/square";
import GridDistortion from "@/components/animations/grid-distortion";
import Image from "next/image";

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Animations */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Squares />
      </div>

      <Navbar />

      {/* Hero Section with Banner */}
      <section className="relative py-20 px-4 z-10">
        {/* Background Banner */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="relative w-full h-full">
            {/* Video/Image Banner */}
            {!isVideoPlaying ? (
              // Image banner as fallback
              <div className="absolute z-50 bg-white">
                <Image
                  src="/delivery.png"
                  alt="Fast delivery service"
                  fill
                  className="object-cover opacity-100 dark:opacity-35"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/30"></div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handlePlayVideo}
                    className="z-20 flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 hover:bg-primary transition-all duration-300 group"
                  >
                    <Play className="w-8 h-8 text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ) : (
              // Video banner
              <div className="absolute inset-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-20 dark:opacity-15"
                >
                  <source src="/delivery-banner-video.mp4" type="video/mp4" />
                  <source src="/delivery-banner-video.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/30"></div>
              </div>
            )}
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge variant="secondary" className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30">
            🚀 Now serving your neighborhood
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 font-sans leading-tight">
            Fast & Reliable
            <span className="text-accent block">Service Delivery</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Order essential services and get them fulfilled quickly, securely, and conveniently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="btn-primary text-lg px-8 py-6">
              <MapPin className="w-5 h-5 mr-2" />
              Find Services Near You
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-primary text-primary hover:bg-primary/10">
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
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
            <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Why Choose AddisGo?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We connect you with trusted service providers and reliable drivers for the fastest, most convenient
              experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow hover:border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Lightning Fast</CardTitle>
                <CardDescription>
                  Get your requests fulfilled in 30 minutes or less with real-time support.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow hover:border-secondary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-sans">Wide Coverage</CardTitle>
                <CardDescription>
                  Available across multiple neighborhoods with growing service areas.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow hover:border-accent/20">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Real-time Tracking</CardTitle>
                <CardDescription>
                  Track your request from start to finish with live updates and driver location.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow hover:border-primary/20">
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
            <Card className="border-border hover:shadow-lg transition-shadow hover:border-secondary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-sans">Quality Guaranteed</CardTitle>
                <CardDescription>
                  Rate your experience and get refunds for any issues. We ensure every request meets your expectations.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow hover:border-accent/20">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-sans">Community First</CardTitle>
                <CardDescription>
                  Built for communities, providing opportunities and supporting local economies.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10k+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">500+</div>
              <p className="text-muted-foreground">Service Providers</p>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Available Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent relative z-10">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience the future of service delivery?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust AddisGo for their daily needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 font-medium">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}