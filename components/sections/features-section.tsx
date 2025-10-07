"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Fast Delivery",
      description: "Get your orders delivered in 30 minutes or less with our express delivery service.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4-9 4-9-4 9-4zm0 8v10" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10l9 4 9-4" />
        </svg>
      ),
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security and encryption.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      title: "Quality Products",
      description: "Curated selection of high-quality products from trusted sellers.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v13H3V7z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 3h5v4H3V3h5" />
        </svg>
      ),
      title: "Real-time Tracking",
      description: "Track your delivery in real-time with live GPS location updates.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8c-4.418 0-8 1.79-8 4v4h16v-4c0-2.21-3.582-4-8-4z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18v2h12v-2" />
        </svg>
      ),
      title: "Best Prices",
      description: "Competitive pricing with exclusive deals and discounts daily.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 19V6a2 2 0 0 1 4 0v13m5-5h-5" />
          <circle cx="6" cy="19" r="2" strokeWidth="2" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock customer support to help with any questions.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-muted/30 relative">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Merkato</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of e-commerce with features designed for your convenience
          </p>
        </motion.div>

        {/* Feature Cards */}
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
                    {feature.icon}
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
  );
}
