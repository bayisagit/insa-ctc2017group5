"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Filter,
  Loader,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const categories = [
  { id: "all", label: "All", icon: "🏪" },
  { id: "grocery", label: "Grocery", icon: "🍏" },
  { id: "phones", label: "Phones", icon: "📱" },
  { id: "headsets", label: "Headsets", icon: "🎧" },
  { id: "laptops", label: "Laptops", icon: "💻" },
];

// Filter Section
function FilterSection() {
  const {
    priceRange,
    selectedCategory,
    setPriceRange,
    setSelectedCategory,
  } = useProductStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="flex items-center gap-2"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        s<div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex gap-2 ">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value) || 0, priceRange[1]])
              }
              className="flex-1 h-8"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value) || 100])
              }
              className="flex-1 h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Product List
export default function ProductList() {
  const {
    filteredProducts = [],
    searchQuery,
    viewMode,
    fetchProducts,
    setSearchQuery,
    setViewMode,
    applyFilters,
    loading,
  } = useProductStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCartStore();

  const hasLoadedRef = useRef(false);
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    const loadProducts = async () => {
      await fetchProducts();
      applyFilters();
    };
    loadProducts();
  }, [fetchProducts, applyFilters]);

  return (
    <div className="px-4 py-4 sm:py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="hidden w-64 lg:block">
          <FilterSection />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls */}
          <div className="mb-4 flex flex-col gap-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Sheet
                  open={mobileFiltersOpen}
                  onOpenChange={setMobileFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent lg:hidden"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 sm:w-96">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-full pr-4">
                      <div className="py-4">
                        <FilterSection />
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
                <div className="text-muted-foreground text-sm">
                  {filteredProducts.length} products
                </div>
              </div>

              {/* View toggle (disabled for now) */}
              {/* <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup> */}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-initial w-full ">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 "
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No products found.
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid"
                  ? "xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product: any) => (
                <Card
                  key={product.id}
                  className="group transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-3 sm:p-4">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative mb-3 sm:mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-40 w-full rounded-md object-cover sm:h-48"
                        />
                        {product.isFeatured && (
                          <Badge className="absolute top-2 left-2 bg-green-500 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-sm font-medium">
                          {product.name}
                        </h3>

                        {/* Variants & Price */}
                        {product.variants && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-bold text-blue-600 sm:text-lg">
                              ${product.variants[0].price.toFixed(2)}
                            </span>
                            {product.variants.length > 1 && (
                              <Badge className="text-xs">
                                +{product.variants.length - 1} options
                              </Badge>
                            )}
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground">
                          Store: {product.store.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Contact: {product.store.phone}
                        </p>
                        <div className="flex items-center gap-1">
                          {[
                            ...Array(
                              Math.round(
                                product.store.rating[0]?.storeScore || 0
                              )
                            ),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-xs text-muted-foreground">
                            {product.store.rating[0]?.storeScore || 0}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="flex gap-2 pt-2 cursor-pointer">
                      <Button
                        className="flex-1"
                        size="sm"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="mr-1 h-4 w-4 sm:mr-2" />
                        <span className="xs:inline hidden">Add to cart</span>
                        <span className="xs:hidden">Add</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
