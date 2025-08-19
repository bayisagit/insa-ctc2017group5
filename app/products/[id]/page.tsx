"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import { Star, Share2, ChevronLeft, ChevronRight, ShoppingCart, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RestaurantInfoCard from "@/components/products/product.detail";
import CartPage from "@/components/products/cart";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { selectedProduct, fetchSingleProduct, loading } = useProductStore();
  const { addToCart } = useCartStore();

  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const currentVariant = selectedProduct?.variants[selectedVariant] || selectedProduct?.variants?.[0];

  const [selectedImage, setSelectedImage] = useState<string>(
    currentVariant?.images?.[0]?.url ?? "/placeholder.svg"
  );

  // Track first-load initialization for this page
  const [initialized, setInitialized] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!id) return;
      setInitialized(false);
      try {
        await fetchSingleProduct(id as string);
      } finally {
        if (isMounted) setInitialized(true);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [id, fetchSingleProduct]);

  // Update selected image and variant when product changes
  useEffect(() => {
    setSelectedVariant(0);
    setSelectedImage(selectedProduct?.variants?.[0]?.images?.[0]?.url ?? "/placeholder.svg");
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (!initialized || loading) ? (
      <div className="flex justify-center py-12">
        <Loader className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    ) : (
      <div className="px-4 py-12 text-center">
        <p className="text-lg text-gray-500">No product available.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="grid gap-2">
          <div className="text-sm text-gray-500 capitalize">{selectedProduct.productType}</div>
          <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>

          {/* Rating */}
          {selectedProduct.store.rating.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(selectedProduct.store.rating[0].storeScore)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {selectedProduct.store.rating[0].storeScore}
              </span>
            </div>
          )}
        </div>

        {/* Share */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>

      <Separator />

      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div className="grid gap-4 md:grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr]">
          {/* Thumbnails */}
          <div className="hidden flex-col gap-4 md:flex">
            {currentVariant?.images?.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className="overflow-hidden rounded-lg border transition-colors hover:border-gray-900"
              >
                <img src={img.url} alt={img.url} className="aspect-4/3 object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative">
            <img
              src={selectedImage}
              alt={selectedProduct.name}
              className="aspect-4/3 h-[410px] w-full rounded-lg border object-cover"
            />
            {selectedProduct.isFeatured && (
              <div className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
                Featured
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="grid gap-6">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${currentVariant?.price.toFixed(2)}</span>
          </div>

          {/* Variant Selection */}
          {selectedProduct.variants.length > 1 && (
            <div className="grid gap-2">
              <Label className="text-base font-medium">Variants</Label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(Number(e.target.value))}
                className="rounded border px-3 py-2"
              >
                {selectedProduct.variants.map((variant, index) => (
                  <option key={variant.id} value={index}>
                    {variant.name} - ${variant.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Seller Info */}
          <div className="text-sm text-gray-500">
            Sold by: {selectedProduct.store.name}
          </div>
          <div className="text-sm text-gray-500">
            Contact: {selectedProduct.store.phone} | {selectedProduct.store.email}
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="flex items-center gap-2"
            onClick={() => addToCart(selectedProduct)}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Cart and Restaurant Info */}
     
      <RestaurantInfoCard />
    </div>
  );
}
