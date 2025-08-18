"use client"
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Counter = () => {
 const {cart} = useCartStore()

  return (
    <div>
  <div className="relative mb-8">
  <Link href="/products/cart" className="fixed top-4 right-4">
    <div className="relative">
      <ShoppingCart size={28} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
          {cart.length}
        </span>
      )}
    </div>
  </Link>
</div>

    </div>
  )
}

export default Counter