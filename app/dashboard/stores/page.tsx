// app/stores/page.tsx
'use client'

import { useState } from 'react'
import { Plus, Search, Filter, ChevronDown, ChevronUp, Store, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Store = {
  id: string
  name: string
  description: string
  phone: string
  email: string
  address: {
    street: string
    city: string
  }
  isApproved: boolean
  isActive: boolean
  productTypes: string[]
  openingHours: {
    day: string
    hours: string
    isClosed: boolean
  }[]
}

const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Fresh Groceries',
    description: 'Your one-stop shop for fresh produce',
    phone: '+251 911 234 567',
    email: 'fresh@example.com',
    address: {
      street: '123 Bole Road',
      city: 'Addis Ababa'
    },
    isApproved: true,
    isActive: true,
    productTypes: ['GROCERY', 'HOUSEHOLD'],
    openingHours: [
      { day: 'Monday', hours: '8:00 AM - 8:00 PM', isClosed: false },
      { day: 'Tuesday', hours: '8:00 AM - 8:00 PM', isClosed: false },
      { day: 'Wednesday', hours: '8:00 AM - 8:00 PM', isClosed: false },
      { day: 'Thursday', hours: '8:00 AM - 8:00 PM', isClosed: false },
      { day: 'Friday', hours: '8:00 AM - 9:00 PM', isClosed: false },
      { day: 'Saturday', hours: '9:00 AM - 9:00 PM', isClosed: false },
      { day: 'Sunday', hours: 'Closed', isClosed: true }
    ]
  },
  // Add more mock stores...
]

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersOpen, setIsFiltersOpen] = useState(true)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)

  const filteredStores = mockStores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      {!selectedStore && (
        <div className="flex h-full w-96 flex-col border-r">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Stores</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Store
            </Button>
          </div>

          <div className="border-b p-4">
            <div className="relative">
              <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
              <Input
                placeholder="Search stores..."
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
                  All Stores
                </Button>
                <Button variant="ghost" className="justify-start">
                  Approved
                </Button>
                <Button variant="ghost" className="justify-start">
                  Active
                </Button>
                <Button variant="ghost" className="justify-start">
                  Grocery
                </Button>
              </div>
            )}
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="hover:bg-muted/50 cursor-pointer p-4 transition-colors"
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{store.name}</h3>
                      <p className="text-sm text-muted-foreground">{store.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant={store.isApproved ? 'default' : 'secondary'}>
                        {store.isApproved ? 'Approved' : 'Pending'}
                      </Badge>
                      <Badge variant={store.isActive ? 'default' : 'secondary'} className="mt-1">
                        {store.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {store.address.street}, {store.address.city}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {store.productTypes.map(type => (
                        <Badge key={type} variant="outline" className="capitalize">
                          {type.toLowerCase()}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Open now</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        {selectedStore ? (
          <StoreDetail store={selectedStore} onBack={() => setSelectedStore(null)} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Store className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No store selected</h3>
              <p className="mt-1 text-muted-foreground">
                Select a store from the sidebar to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StoreDetail({ store, onBack }: { store: Store, onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          Back to Stores
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Edit Store
          </Button>
          <Button variant={store.isActive ? 'destructive' : 'default'} size="sm">
            {store.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{store.name}</h1>
            <p className="text-muted-foreground">{store.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={store.isApproved ? 'default' : 'secondary'}>
                {store.isApproved ? 'Approved' : 'Pending Approval'}
              </Badge>
              <Badge variant={store.isActive ? 'default' : 'secondary'}>
                {store.isActive ? 'Active' : 'Inactive'}
              </Badge>
              {store.productTypes.map(type => (
                <Badge key={type} variant="outline" className="capitalize">
                  {type.toLowerCase()}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Store ID</p>
              <p className="font-medium">{store.id}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Contact Information</h2>
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {store.address.street}, {store.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{store.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{store.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Opening Hours</h2>
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="space-y-2">
                {store.openingHours.map((day) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="font-medium">{day.day}</span>
                    {day.isClosed ? (
                      <span className="text-sm text-muted-foreground">Closed</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">{day.hours}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium">Store Statistics</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">1,245</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <p className="text-2xl font-bold">4.7 ★</p>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">Revenue (30d)</p>
              <p className="text-2xl font-bold">$24,567</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="mt-4 rounded-lg border bg-muted/50">
            {/* Simplified order list */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">ORD-1001</p>
                  <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                </div>
                <Badge variant="outline">Processing</Badge>
                <p className="font-medium">$45.99</p>
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">ORD-1000</p>
                  <p className="text-sm text-muted-foreground">Yesterday, 2:15 PM</p>
                </div>
                <Badge variant="default">Delivered</Badge>
                <p className="font-medium">$32.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}