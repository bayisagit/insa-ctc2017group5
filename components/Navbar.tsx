"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle-theme";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  // Track hash changes for scroll
  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "/products", label: "Order Products" },
  ];

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground font-sans">
            AddisGo
          </span>
        </motion.div>

        {/* Navbar */}
        <nav className="hidden md:flex items-center space-x-6 relative">
          {navLinks.map((link) => {
            const isActive =
              link.href.startsWith("#")
                ? currentHash === link.href
                : pathname === link.href;

            return (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                {/* Animated underline */}
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] bg-primary rounded-full"
                  animate={{
                    width: isActive ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            );
          })}

          {/* Track Delivery CTA */}
          <Link
            href="/delivery"
            className="flex items-center space-x-1 text-primary font-medium hover:opacity-80 transition"
          >
            <MapPin className="w-4 h-4" />
            <span>Track Delivery</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="hidden md:inline-flex hover:scale-105 transition-transform"
            >
              Sign In
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform shadow-md">
            Get Started
          </Button>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}
