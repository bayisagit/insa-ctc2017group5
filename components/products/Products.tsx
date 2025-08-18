"use client";

import { useEffect, useState } from "react";
import { Search, Grid3X3, List, Star, ShoppingCart, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";

const categories = [
  { id: "all", label: "All", icon: "🏪" },
  { id: "phones", label: "Phones", icon: "📱" },
  { id: "headsets", label: "Headsets", icon: "🎧" },
  { id: "laptops", label: "Laptops", icon: "💻" },
  { id: "tv", label: "TV sets", icon: "📺" },
  { id: "sound", label: "Sound", icon: "🔊" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "others", label: "Others", icon: "💡" },
  { id: "internet", label: "Internet", icon: "🌐" }
];

const brands = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "huawei", label: "Huawei" },
  { id: "microsoft", label: "Microsoft" },
  { id: "sony", label: "Sony" },
  { id: "bose", label: "Bose" },
  { id: "dell", label: "Dell" },
  { id: "lg", label: "LG" },
  { id: "jbl", label: "JBL" },
  { id: "philips", label: "Philips" },
  { id: "tp-link", label: "TP-Link" }
];

const colors = [
  { id: "red", label: "Red", color: "bg-red-500" },
  { id: "orange", label: "Orange", color: "bg-orange-500" },
  { id: "blue", label: "Blue", color: "bg-blue-500" },
  { id: "black", label: "Black", color: "bg-black" },
  { id: "white", label: "White", color: "bg-white border" },
  { id: "purple", label: "Purple", color: "bg-purple-500" },
  { id: "gray", label: "Gray", color: "bg-gray-600" }
];

// Filter component for reuse in both desktop and mobile
function FilterSection() {
  const {
    priceRange,
    selectedBrands,
    selectedColors,
    deliveryDate,
    selectedCategory,
    setPriceRange,
    toggleBrand,
    toggleColor,
    setDeliveryDate,
    setSelectedCategory
  } = useProductStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Related categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="mb-3 font-semibold">Brands</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <Button
              key={brand.id}
              variant={selectedBrands.includes(brand.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleBrand(brand.id)}
            >
              {brand.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="mb-3 font-semibold">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button
              key={color.id}
              variant={selectedColors.includes(color.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleColor(color.id)}
              className="flex items-center gap-2"
            >
              <div className={`h-4 w-4 rounded-full ${color.color}`} />
              {color.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Delivery Date */}
      <div>
        <h3 className="mb-3 font-semibold">Delivery date</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={deliveryDate === "any" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeliveryDate("any")}
          >
            Any day
          </Button>
          <Button
            variant={deliveryDate === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeliveryDate("today")}
          >
            Today
          </Button>
          <Button
            variant={deliveryDate === "tomorrow" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeliveryDate("tomorrow")}
          >
            Tomorrow
          </Button>
          <Button
            variant={deliveryDate === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeliveryDate("week")}
          >
            Within 7 days
          </Button>
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold">Price</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={3000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="price-from" className="text-muted-foreground text-xs">
                From
              </Label>
              <Input
                id="price-from"
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])
                }
                className="h-8"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="price-to" className="text-muted-foreground text-xs">
                To
              </Label>
              <Input
                id="price-to"
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 3000])
                }
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const {
    filteredProducts,
    selectedCategory,
    searchQuery,
    viewMode,
    products,
    fetchProducts,
    setSelectedCategory,
    setSearchQuery,
    setViewMode,
    applyFilters
  } = useProductStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply initial filters on mount
  useEffect(() => {
    applyFilters();
    fetchProducts()
  }, [applyFilters]);

  return (
    <div className="px-4 py-4 sm:py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden w-64 lg:block">
          <FilterSection />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="mb-4 flex flex-col gap-4 sm:mb-6">
            {/* Top row - Mobile filter button and product count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent lg:hidden">
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

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  {filteredProducts.length} products
                </div>
              </div>

              {/* View Toggle - Desktop only */}
              <div className="hidden sm:block">
                <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <Grid3X3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Bottom row - Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:w-64"
                />
              </div>

              {/* View Toggle - Mobile */}
              <div className="sm:hidden">
                <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                  <ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
                    <Grid3X3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view" size="sm">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid"
                  ? "xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}>
              {filteredProducts.map((product: any) => (
                <Card key={product.id} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-3 sm:p-4">
                    <Link href={`/products/${product.id}`}>
                    <div className="relative mb-3 sm:mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="h-40 w-full rounded-md object-cover sm:h-48"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-xs hover:bg-red-600">
                          New
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="line-clamp-2 text-sm leading-tight font-medium">
                        {product.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold text-blue-600 sm:text-lg">
                          {/* ${product.price.toFixed(2)}87687768 */}
                         $ 66567
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-muted-foreground text-xs line-through sm:text-sm">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                            <Badge variant="destructive" className="text-xs">
                              {/* -{product.discount}% */}
                              343443
                            </Badge>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground text-xs">4.5
                            {/* {product.rating} */}
                            </span>
                      </div>

                      <p className="text-muted-foreground text-xs">
                          7
                        {/* {product.orders} */}
                         orders this week
                      </p>

                      <p className="text-muted-foreground text-xs">Seller: 
                        {/* {product.seller} */}
                        </p>

                      <div className="text-muted-foreground text-xs">
                        Delivery: Today
                        {/* {product.deliveryDays === 0
                          ? "Today"
                          : product.deliveryDays === 1
                            ? "Tomorrow"
                            : `${product.deliveryDays} days`} */}
                      </div>

                    </div>
                    </Link>
                      <div className="flex gap-2 pt-2 cursor-pointer">
                        <Button className="flex-1" size="sm">
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