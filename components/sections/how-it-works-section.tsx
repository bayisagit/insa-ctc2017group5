"use client"

import { motion } from "framer-motion"
import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Browse Products",
      description: "Search and explore thousands of products across multiple categories",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      description: "Select your items and add them to your shopping cart",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We deliver your order to your doorstep in 30 minutes",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: CheckCircle,
      title: "Enjoy!",
      description: "Receive your order and enjoy your purchase",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Get started in four simple steps</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+2rem)] w-full h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
              )}

              <div className="text-center relative">
                <div className="relative inline-block mb-6">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
