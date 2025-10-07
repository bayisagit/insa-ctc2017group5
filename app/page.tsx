"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CategoriesSection } from "@/components/sections/categories-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { StatsSection } from "@/components/sections/stats-section"
import { AppDownloadSection } from "@/components/sections/app-download-section"
import { CTASection } from "@/components/sections/cta-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* <FeaturesSection /> */}
      <CategoriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      {/* <StatsSection /> */}
      <AppDownloadSection />
      <CTASection />
      <Footer />
    </div>
  )
}
