"use client";

import { useCartStore } from "@/store/cartStore";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, ArrowLeft, ChevronDown, ChevronUp, Truck, BadgePercent, Gift, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromTheCart, decrementQuantity, clearCart,incrementQuantity ,loading } = useCartStore();
  // const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.variants[0].price * (item.quantity ?? 0), 0),
    [cart]
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal + shipping - discountAmount;

  // const applyDiscount = () => {
  //   if (discountCode.toLowerCase() === "save10") {
  //     setAppliedDiscount(0.1);
  //   }
  //   setDiscountCode("");
  //   setShowPromoInput(false);
  // };


  if(loading){
 return(
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center">
    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
      Loading...
    </p>
  </div>
 )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="relative mb-8">
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            0
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-foreground dark:text-foreground">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it with amazing products!
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/products">
            <Button className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Continue Shopping
            </Button>
          </Link>
          <Button variant="outline" className="bg-card dark:bg-card text-foreground dark:text-card-foreground">
            View Wishlist
          </Button>
        </div>
      </div>
    );
  }

  return (
<div className="max-w-7xl mx-auto px-4 py-8">
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Shopping Cart</h1>
    <p className="text-gray-600 dark:text-gray-300 mt-1">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
  </div>

  <div className="flex flex-col lg:flex-row gap-8">
    {/* Cart Items */}
    <div className="lg:w-2/3">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 hidden md:flex">
          <div className="w-2/5 font-medium text-gray-500 dark:text-gray-400">Product</div>
          <div className="w-1/5 font-medium text-gray-500 dark:text-gray-400 text-center">Quantity</div>
          <div className="w-1/5 font-medium text-gray-500 dark:text-gray-400 text-center">Price</div>
          <div className="w-1/5 font-medium text-gray-500 dark:text-gray-400 text-right">Total</div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {cart.map((item) => (
            <div key={item.id} id={`item-${item.id}`} className="p-4 transition-all duration-200">
              <div className="flex flex-col md:flex-row items-center">
                {/* Product Info */}
                <div className="flex items-center w-full md:w-2/5 mb-4 md:mb-0">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Button
                    type="button"
                      variant="ghost"
                      size="icon"
                      className="rounded-r-none text-gray-900 dark:text-gray-100 cursor-pointer"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={(item.quantity ?? 0) <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-10 text-center text-gray-900 dark:text-gray-100">{item.quantity ?? 0}</span>
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="rounded-l-none text-gray-900 dark:text-gray-100 cursor-pointer"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="w-full md:w-1/5 text-center mb-4 md:mb-0 text-gray-900 dark:text-gray-100">
                  <p className="font-medium">${item.variants[0].price.toFixed(2)}</p>
                  {item.variants[0].originalPrice && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${item.variants[0].originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="w-full md:w-1/5 flex justify-between md:justify-end items-center text-gray-900 dark:text-gray-100">
                  <p className="font-medium">${(item.variants[0].price * (item.quantity ?? 0)).toFixed(2)}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-4 text-gray-400 dark:text-gray-500 hover:text-red-500 "
                    onClick={() => removeFromTheCart(item.id)}
                  >
                    <Trash2 size={18} className="text-gray-400 dark:text-red-500 hover:text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <Link href="/products" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4 sm:mb-0">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
          <Button variant="destructive" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>

    {/* Order Summary */}
    <div className="lg:w-1/3">
      <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-900 dark:text-gray-100">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-900 dark:text-gray-100">
            <span>Shipping</span>
            <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}</span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Discount ({appliedDiscount * 100}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <Separator className="my-3 border-gray-200 dark:border-gray-700" />
          <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/payment">
          <Button size="lg" className="w-full mt-6 py-6 text-base">
            Proceed to Checkout
          </Button>

          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
