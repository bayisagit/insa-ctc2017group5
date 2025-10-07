"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Smartphone, ArrowRight, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-10">
      {/* Animated Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom right, var(--primary)/5, var(--background), var(--accent)/5)",
        }}
      />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], borderRadius: ["30%", "50%", "30%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            top: "-10rem",
            right: "-10rem",
            width: "24rem",
            height: "24rem",
            background: "linear-gradient(to bottom right, var(--primary)/20, var(--accent)/20)",
            filter: "blur(3rem)",
            position: "absolute",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0], borderRadius: ["40%", "60%", "40%"] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            bottom: "-10rem",
            left: "-10rem",
            width: "24rem",
            height: "24rem",
            background: "linear-gradient(to top right, var(--secondary)/20, var(--primary)/20)",
            filter: "blur(3rem)",
            position: "absolute",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge
                className="mb-6 px-4 py-2 flex items-center gap-2"
         
              >
                <Sparkles className="w-4 h-4" />
                Lightning Fast Delivery
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              <span
                style={{
                  background: "linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Everything
              </span>
              <br />
              <span style={{ color: "var(--foreground)" }}>You Need, Delivered</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: "var(--muted-foreground)" }}
            >
              From groceries to electronics, get everything delivered to your doorstep in minutes. Shop from thousands
              of products across multiple categories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg transition-all group"
                style={{
                  background: "linear-gradient(to right, var(--primary), var(--accent))",
                  color: "var(--primary-foreground)",
                }}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Order Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 transition-all"
                style={{
                  color: "var(--foreground)",
                  borderColor: "var(--accent)",
                  backgroundColor: "transparent",
                }}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Get the App
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border/50">
              <Image
                src="/happy-people-shopping-online-with-delivery-boxes.jpg"
                alt="Online shopping delivery"
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, var(--background)/0.6, transparent)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
