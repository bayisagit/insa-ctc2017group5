"use client"

import { motion } from "framer-motion"
import { Users, Package, Star, Truck } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Package,
      value: "100K+",
      label: "Products",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Customer Rating",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Truck,
      value: "30 Min",
      label: "Avg Delivery",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
