"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Smartphone, Download, QrCode } from "lucide-react"
import Image from "next/image"

export function AppDownloadSection() {
  return (
    <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Download the{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Merkato App</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Shop smarter with our mobile app. Get exclusive app-only deals, faster checkout, and real-time order
              tracking.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Easy to Use</h3>
                  <p className="text-muted-foreground text-sm">
                    Intuitive interface designed for seamless shopping experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">App-Only Deals</h3>
                  <p className="text-muted-foreground text-sm">Get exclusive discounts available only on mobile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quick Reorder</h3>
                  <p className="text-muted-foreground text-sm">Reorder your favorites with just one tap</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-black text-white hover:bg-black/80">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="App Store"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                App Store
              </Button>
              <Button size="lg" className="bg-black text-white hover:bg-black/80">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Google Play"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Google Play
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="relative aspect-[9/16] rounded-[3rem] overflow-hidden border-8 border-foreground shadow-2xl"
              >
                <Image src="/mobile-app-shopping-interface.jpg" alt="App Screenshot" fill className="object-cover" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white dark:bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border/50"
              >
                <div className="text-2xl font-bold text-primary">50%</div>
                <div className="text-xs text-muted-foreground">App Discount</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border/50"
              >
                <div className="text-2xl font-bold text-accent">4.9★</div>
                <div className="text-xs text-muted-foreground">User Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
