import { create } from "zustand"

export interface Variants {
  id: string
  name: string
  price: number
  isAvailable: boolean
  colors?: string | null
  images?: {
    url: string
    id: string
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
  organizationType?: string // 🏪 NEW
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
  soldCount?: number // 🔥 NEW
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
  initialized: boolean

  // 🆕 extra filter states
  selectedOrgType: string
  minRating: number
  inStockOnly: boolean
  featuredOnly: boolean
  sortBy: "none" | "priceAsc" | "priceDesc" | "rating" | "popularity"
  
  // Pagination
  currentPage: number
  itemsPerPage: number
  hasMore: boolean

  fetchProducts: () => Promise<void>
  fetchSingleProduct: (id: string) => Promise<void>
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setPriceRange: (range: [number, number]) => void
  toggleBrand: (brand: string) => void
  toggleColor: (color: string) => void
  setDeliveryDate: (date: string) => void
  setViewMode: (mode: string) => void

  // 🆕 setters
  setSelectedOrgType: (org: string) => void
  setMinRating: (rating: number) => void
  setInStockOnly: (value: boolean) => void
  setFeaturedOnly: (value: boolean) => void
  setSortBy: (sort: ProductStore["sortBy"]) => void
  
  // Pagination methods
  loadMore: () => void
  resetPagination: () => void

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
  loading: false,
  initialized: false,
  
  // Pagination defaults
  currentPage: 1,
  itemsPerPage: 8,
  hasMore: true,

  // 🆕 extra filter defaults
  selectedOrgType: "all",
  minRating: 0,
  inStockOnly: false,
  featuredOnly: false,
  sortBy: "none",

  fetchProducts: async () => {
    if (get().loading) return
    set({ loading: true })
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      set({ products: data.data, filteredProducts: data.data })
    } catch (error) {
      console.error("❌ Failed to fetch products:", error)
    } finally {
      set({ loading: false, initialized: true })
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

  // 🆕 filter setters
  setSelectedOrgType: (org) => {
    set({ selectedOrgType: org })
    get().applyFilters()
  },

  setMinRating: (rating) => {
    set({ minRating: rating })
    get().applyFilters()
  },

  setInStockOnly: (value) => {
    set({ inStockOnly: value })
    get().applyFilters()
  },

  setFeaturedOnly: (value) => {
    set({ featuredOnly: value })
    get().applyFilters()
  },

  setSortBy: (sort) => {
    set({ sortBy: sort })
    get().applyFilters()
  },
  
  loadMore: () => {
    const { currentPage, hasMore } = get()
    if (hasMore) {
      set({ currentPage: currentPage + 1 })
      get().applyFilters()
    }
  },
  
  resetPagination: () => {
    set({ currentPage: 1, hasMore: true })
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
      selectedOrgType,
      minRating,
      inStockOnly,
      featuredOnly,
      sortBy,
    } = get()

    let filtered = [...products]

    // Category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.productType === selectedCategory)
    }

    // Org type
    if (selectedOrgType !== "all") {
      filtered = filtered.filter((p) => p.store.organizationType === selectedOrgType)
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.sku && p.sku.toLowerCase().includes(query))
      )
    }

    // Price range
    filtered = filtered.filter((p) =>
      p.variants.some((v) => v.price >= priceRange[0] && v.price <= priceRange[1])
    )

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.store.name))
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) => v.colors && selectedColors.includes(v.colors))
      )
    }

    // Delivery date
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

    // Rating
    if (minRating > 0) {
      filtered = filtered.filter(
        (p) => (p.store.rating[0]?.storeScore ?? 0) >= minRating
      )
    }

    // In Stock
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.isAvailable)
    }

    // Featured
    if (featuredOnly) {
      filtered = filtered.filter((p) => p.isFeatured)
    }

    // Sorting
    if (sortBy !== "none") {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "priceAsc":
            return (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0)
          case "priceDesc":
            return (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0)
          case "rating":
            return (
              (b.store.rating[0]?.storeScore ?? 0) -
              (a.store.rating[0]?.storeScore ?? 0)
            )
          case "popularity":
            return (b.soldCount ?? 0) - (a.soldCount ?? 0)
          default:
            return 0
        }
      })
    }

    // Pagination
    const { currentPage, itemsPerPage } = get()
    const startIndex = 0
    const endIndex = currentPage * itemsPerPage
    const paginatedProducts = filtered.slice(startIndex, endIndex)
    const hasMore = endIndex < filtered.length
    
    set({ 
      filteredProducts: paginatedProducts,
      hasMore 
    })
  },
}))
