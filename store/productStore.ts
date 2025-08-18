import { create } from "zustand"

export interface Variants {
  id: string
  name: string
  price: number
  isAvailable: boolean
  colors?: string | null
  images?: {
    url:string
    id:string
  }[]
}

export interface StoreRating {
  storeScore: number
  createdAt: string
}

export interface Store {
  id: string
  name: string
  logo: string
  phone: string
  email: string
  isApproved: boolean
  rating: StoreRating[]
}

export interface Product {
  id: string
  name: string
  description: string
  image: string
  productType: string
  sku?: string | null
  isAvailable: boolean
  isFeatured: boolean
  isNew?: boolean | null
  weight?: number | null
  dimensions?: string | null
  store: Store
  variants: Variants[]
  deliveryDays?: number | null
}

interface ProductStore {
  products: Product[]
  filteredProducts: Product[]
  selectedCategory: string
  searchQuery: string
  priceRange: [number, number]
  selectedBrands: string[]
  selectedColors: string[]
  deliveryDate: string
  viewMode: string
  selectedProduct: Product | null
  loading: boolean

  fetchProducts: () => Promise<void>
  fetchSingleProduct: (id: string) => Promise<void>
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setPriceRange: (range: [number, number]) => void
  toggleBrand: (brand: string) => void
  toggleColor: (color: string) => void
  setDeliveryDate: (date: string) => void
  setViewMode: (mode: string) => void
  applyFilters: () => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  selectedCategory: "all",
  searchQuery: "",
  priceRange: [0, 3000],
  selectedBrands: [],
  selectedColors: [],
  deliveryDate: "any",
  viewMode: "grid",
  loading: true, // start in loading to avoid initial empty flash

  fetchProducts: async () => {
    // Prevent duplicate concurrent fetches (e.g., React Strict Mode double-invoke in dev)
    if (get().loading) return
    set({ loading: true })
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      set({ products: data.data, filteredProducts: data.data })
    } catch (error) {
      console.error("❌ Failed to fetch products:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchSingleProduct: async (id: string) => {
    set({ loading: true })
    try {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()
      set({ selectedProduct: data.data })
    } catch (error) {
      console.error("❌ Failed to fetch product:", error)
    } finally {
      set({ loading: false })
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
    get().applyFilters()
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().applyFilters()
  },

  setPriceRange: (range) => {
    set({ priceRange: range })
    get().applyFilters()
  },

  toggleBrand: (brand) => {
    const { selectedBrands } = get()
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    set({ selectedBrands: newBrands })
    get().applyFilters()
  },

  toggleColor: (color) => {
    const { selectedColors } = get()
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color]
    set({ selectedColors: newColors })
    get().applyFilters()
  },

  setDeliveryDate: (date) => {
    set({ deliveryDate: date })
    get().applyFilters()
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  applyFilters: () => {
    const {
      products,
      selectedCategory,
      searchQuery,
      priceRange,
      selectedBrands,
      selectedColors,
      deliveryDate,
    } = get()

    let filtered = products

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.productType === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.sku && p.sku.toLowerCase().includes(query))
      )
    }

    filtered = filtered.filter((p) =>
      p.variants.some((v) => v.price >= priceRange[0] && v.price <= priceRange[1])
    )

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.store.name))
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) =>
          v.colors ? selectedColors.includes(v.colors) : false
        )
      )
    }

    if (deliveryDate !== "any") {
      const maxDays =
        deliveryDate === "today"
          ? 0
          : deliveryDate === "tomorrow"
          ? 1
          : deliveryDate === "week"
          ? 7
          : 999
      filtered = filtered.filter(
        (p) => p.deliveryDays != null && p.deliveryDays <= maxDays
      )
    }

    set({ filteredProducts: filtered })
  },
}))
