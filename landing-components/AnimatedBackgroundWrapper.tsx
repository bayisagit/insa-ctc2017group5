'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils' // optional, for conditional classnames

const AnimatedBackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-1000 ease-in-out",
        theme === "dark"
          ? "bg-gradient-to-br from-black via-indigo-900 to-black animate-zoomInDark"
          : "bg-gradient-to-br bg-white animate-zoomInLight"
      )}
    >
      {children}
    </div>
  )
}

export default AnimatedBackgroundWrapper
