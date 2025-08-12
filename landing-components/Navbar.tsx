'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Sun, Moon, Laptop, Menu } from 'lucide-react'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false) // control sheet open/close

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid hydration mismatch

  const ThemeToggle = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Laptop className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const closeMenu = () => setIsSheetOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black transition-all duration-300 flex justify-between items-center px-4 sm:px-10 py-6 border-b dark:border-amber-400">
      {/* Logo */}
      <div className="font-bold text-orange-600 text-2xl">ChopChop</div>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 items-center">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/#products" className="hover:underline">Products</Link></li>
        <li><Link href="/#contact" className="hover:underline">Contact Us</Link></li>
        <li><Link href="/auth/login" className="hover:underline">Login</Link></li>
        <li><Link href="/auth/signup" className="hover:underline">Signup</Link></li>
        <li><ThemeToggle /></li>
      </ul>

      {/* Mobile Hamburger */}
      <div className="sm:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 sm:w-72 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 flex flex-col gap-6 pt-8 max-h-[60vh] overflow-y-auto rounded-md">
            <Link href="/" className="hover:underline" onClick={closeMenu}>Home</Link>
            <a href="#products" className="hover:underline" onClick={closeMenu}>Products</a>
            <a href="#contact" className="hover:underline" onClick={closeMenu}>Contact Us</a>
            <Link href="/auth/login" className="hover:underline" onClick={closeMenu}>Login</Link>
            <Link href="/auth/signup" className="hover:underline" onClick={closeMenu}>Signup</Link>
            <div className="pt-4 border-t">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
