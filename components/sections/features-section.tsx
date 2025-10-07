"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Shield, Star, Truck, Wallet, Headphones } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Get your orders delivered in 30 minutes or less with our express delivery service.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security and encryption.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Star,
      title: "Quality Products",
      description: "Curated selection of high-quality products from trusted sellers.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Truck,
      title: "Real-time Tracking",
      description: "Track your delivery in real-time with live GPS location updates.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Wallet,
      title: "Best Prices",
      description: "Competitive pricing with exclusive deals and discounts daily.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help with any questions.",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-muted/30 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AddisGo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of e-commerce with features designed for your convenience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
