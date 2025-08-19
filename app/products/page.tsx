"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Filter,
  ArrowUp,
  ArrowDown,
  Check,
  Loader,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

// Organization type icons
const orgTypeIcons: Record<string, any> = {
  RESTAURANT: "🍔",
  GROCERY: "🥦",
  ELECTRONICS: "💻",
  BOOKSTORE: "📚",
  CLOTHING: "👗",
  PHARMACY: "💊",
  HOME: "🏠",
  BEAUTY: "💄",
  SPORTS: "⚽",
  FLORIST: "🌸",
  SERVICE: "🛠️",
};

// Sorting options
const sortOptions: Array<{
  id: "priceAsc" | "priceDesc" | "rating" | "popularity";
  label: string;
  icon: any;
}> = [
  { id: "priceAsc", label: "Price ↑", icon: ArrowUp },
  { id: "priceDesc", label: "Price ↓", icon: ArrowDown },
  { id: "rating", label: "Rating", icon: Star },
  { id: "popularity", label: "Popularity", icon: Check },
];

function FilterSection() {
  const {
    priceRange,
    selectedCategory,
    selectedOrgType,
    sortBy,
    setPriceRange,
    setSelectedCategory,
    setSelectedOrgType,
    setSortBy,
  } = useProductStore();

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {["all", "grocery", "fruits", "vegetables", "dairy"].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Organization Types */}
      <div>
        <h3 className="mb-3 font-semibold">Organization Type</h3>
        <div className="flex flex-wrap gap-2">
          {["all", ...Object.keys(orgTypeIcons)].map((type) => (
            <Button
              key={type}
              variant={selectedOrgType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOrgType(type)}
              className="flex items-center gap-1"
            >
              {type !== "all" && <span>{orgTypeIcons[type]}</span>}
              {type}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={1}
          className="w-full"
        />
        <div className="flex gap-2 mt-2">
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
              setPriceRange([priceRange[0], Number(e.target.value) || 1000])
            }
            className="flex-1 h-8"
          />
        </div>
      </div>

      <Separator />

      {/* Sorting */}
      <div>
        <h3 className="mb-3 font-semibold">Sort By</h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant={sortBy === option.id ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setSortBy(option.id)}
            >
              <option.icon className="h-3 w-3" /> {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    initialized,
    hasMore,
    loadMore,
    resetPagination,
  } = useProductStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCartStore();

  const ranOnce = useRef(false);
  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;
    const loadProducts = async () => {
      await fetchProducts();
      resetPagination();
      applyFilters();
    };
    loadProducts();
  }, [fetchProducts, applyFilters, resetPagination]);

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

              {/* View toggle */}
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
          {(!initialized || loading) ? (
            <div className="flex justify-center py-12">
              <Loader className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No products available.
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
                  <CardHeader className="p-3 sm:p-4">
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
                        {/* {product.store.organization.type && (
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-xs flex items-center gap-1">
                            {orgTypeIcons[product.store.organization.type]}{" "}
                            {product.store.organization.type}
                          </Badge>
                        )} */}
                      </div>

                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-sm font-medium">
                          {product.name}
                        </h3>

                        {/* Variants & Price */}
                        {product.variants && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-bold text-blue-600 sm:text-lg">
                              {(product.variants[0].price * 100).toFixed(2)} Birr
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
                          {[...Array(Math.round(product.store.rating[0]?.storeScore || 0))].map((_, i) => (
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
                  </CardHeader>

                  <CardContent className="flex gap-2 pt-2 cursor-pointer">
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4 sm:mr-2" />
                      <span className="xs:inline hidden">Add to cart</span>
                      <span className="xs:hidden">Add</span>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={loadMore}
                variant="outline"
                size="lg"
                className="px-8"
              >
                Load More Products
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
