// app/stores/[storeId]/products/page.tsx
'use client'

import { useState } from 'react'
import { Plus, Search, Filter, ChevronDown, ChevronUp, Package, ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  isAvailable: boolean
  variants: {
    id: string
    name: string
    price: number
  }[]
}

const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Fresh Apples',
    description: 'Organic red apples, 1kg',
    price: 4.99,
    category: 'Fruits',
    isAvailable: true,
    variants: [
      { id: 'var-1', name: '1kg', price: 4.99 },
      { id: 'var-2', name: '2kg', price: 8.99 }
    ]
  },
  // Add more mock products...
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      {!selectedProduct && (
        <div className="flex h-full w-96 flex-col border-r">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Product
            </Button>
          </div>

          <div className="border-b p-4">
            <div className="relative">
              <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="border-b">
            <button
              className="hover:bg-muted/50 flex w-full items-center justify-between p-4"
              onClick={() => setIsFiltersOpen((v) => !v)}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span className="font-medium">Filters</span>
              </div>
              {isFiltersOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {isFiltersOpen && (
              <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                <Button variant="ghost" className="justify-start">
                  All Products
                </Button>
                <Button variant="ghost" className="justify-start">
                  Available
                </Button>
                <Button variant="ghost" className="justify-start">
                  Fruits
                </Button>
                <Button variant="ghost" className="justify-start">
                  Vegetables
                </Button>
              </div>
            )}
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="hover:bg-muted/50 cursor-pointer p-4 transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <Badge variant={product.isAvailable ? 'default' : 'secondary'}>
                      {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {product.category.toLowerCase()}
                    </Badge>
                    <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
                  </div>
                  {product.variants.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product.variants.map(variant => (
                        <Badge key={variant.id} variant="outline" className="text-xs">
                          {variant.name}: ${variant.price.toFixed(2)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No product selected</h3>
              <p className="mt-1 text-muted-foreground">
                Select a product from the sidebar to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductDetail({ product, onBack }: { product: Product, onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          Back to Products
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Edit Product
          </Button>
          <Button variant={product.isAvailable ? 'destructive' : 'default'} size="sm">
            {product.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={product.isAvailable ? 'default' : 'secondary'}>
                {product.isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {product.category.toLowerCase()}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Base Price</p>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium">Variants</h2>
          <div className="mt-4 rounded-lg border bg-muted/50">
            {product.variants.length > 0 ? (
              product.variants.map(variant => (
                <div key={variant.id} className="p-4 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{variant.name}</p>
                      <p className="text-sm text-muted-foreground">Variant ID: {variant.id}</p>
                    </div>
                    <p className="font-medium">${variant.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No variants available for this product
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium">Product Statistics</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Total Sold</p>
              <p className="text-2xl font-bold">245</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <p className="text-2xl font-bold">4.5 ★</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Revenue (30d)</p>
              <p className="text-2xl font-bold">$1,245</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}