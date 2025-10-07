"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background using CSS variables */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, var(--color-primary), var(--color-accent), var(--color-secondary))",
          zIndex: 0,
        }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div
        className="container mx-auto relative z-10 text-center"
        style={{ color: "var(--color-foreground)" }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "var(--color-muted)", // background from theme
              color: "var(--color-muted-foreground)", // text color
              backdropFilter: "blur(6px)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
   
          >
            Ready to Start Shopping?
          </h2>

          <p
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            style={{ color: "var(--color-foreground)" }}
          >
            Join 50,000+ happy customers and get 50% off your first order. Download the app now!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg group"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
              }}
            >
              Order Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
                backgroundColor: "transparent",
              }}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ borderColor: "var(--color-border)" }}
        className="absolute top-10 right-10 w-20 h-20 border-4 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ borderColor: "var(--color-border)" }}
        className="absolute bottom-10 left-10 w-16 h-16 border-4 rounded-lg"
      />
    </section>
  );
}
