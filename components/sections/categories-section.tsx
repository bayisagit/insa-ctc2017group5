"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CategoriesSection() {
  const categories = [
    {
      name: "Fresh Groceries",
      description: "Farm-fresh produce & daily essentials",
      image: "/fresh-produce-abundance.png",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Electronics",
      description: "Latest gadgets & tech accessories",
      image: "/modern-electronics.png",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Fashion",
      description: "Trendy clothes & accessories",
      image: "/fashion-clothing-and-accessories.jpg",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Home & Kitchen",
      description: "Everything for your home",
      image: "/home-decor-and-kitchen-items.jpg",
      color: "from-orange-500 to-amber-500",
    },
  ]

  return (
    <section id="categories" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of product categories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] border border-border hover:border-primary/50 transition-all">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{category.description}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="group-hover:bg-white group-hover:text-primary transition-all"
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
