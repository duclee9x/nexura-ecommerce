"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Search, Grid3X3, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample product data for search
const products = [
  {
    id:       1,
    name:     "Urban Backpack",
    price:    120,
    category: "backpack",
    type:     "everyday",
    colors:   [
      "black", "gray", "blue"
    ],
    rating:   4.5,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       2,
    name:     "Hyper Backpack",
    price:    140,
    category: "backpack",
    type:     "travel",
    colors:   [
      "black", "gray", "blue"
    ],
    rating:   4.2,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       3,
    name:     "Smart Carry Backpack",
    price:    95,
    category: "backpack",
    type:     "everyday",
    colors:   [
      "black", "gray", "blue"
    ],
    rating:   4.0,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       4,
    name:     "Aero Backpack",
    price:    127,
    category: "backpack",
    type:     "travel",
    colors:   [
      "black", "gray", "blue"
    ],
    rating:   4.8,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       5,
    name:     "Commuter Backpack",
    price:    110,
    category: "backpack",
    type:     "everyday",
    colors:   [ "black", "gray" ],
    rating:   4.3,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       6,
    name:     "Weekender Duffel",
    price:    150,
    category: "bag",
    type:     "travel",
    colors:   [ "black", "blue" ],
    rating:   4.6,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       7,
    name:     "Messenger Bag",
    price:    85,
    category: "bag",
    type:     "everyday",
    colors:   [ "black", "gray" ],
    rating:   4.1,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       8,
    name:     "Laptop Sleeve",
    price:    45,
    category: "accessory",
    type:     "everyday",
    colors:   [
      "black", "gray", "blue"
    ],
    rating:   4.4,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       9,
    name:     "Travel Organizer",
    price:    35,
    category: "accessory",
    type:     "travel",
    colors:   [ "black", "gray" ],
    rating:   4.7,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       10,
    name:     "Water Bottle",
    price:    18,
    category: "accessory",
    type:     "everyday",
    colors:   [
      "black", "gray", "blue"
    ],
    rating:   4.9,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       11,
    name:     "Extension Strap",
    price:    12,
    category: "accessory",
    type:     "travel",
    colors:   [ "black", "gray" ],
    rating:   4.2,
    image:    "/placeholder.svg?height=300&width=300",
  },
  {
    id:       12,
    name:     "TSA-Approved Lock",
    price:    16,
    category: "accessory",
    type:     "travel",
    colors:   ["black"],
    rating:   4.5,
    image:    "/placeholder.svg?height=300&width=300",
  },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [ searchQuery, setSearchQuery ] = useState(query)
  const [ viewMode, setViewMode ] = useState("grid")
  const [ sortBy, setSortBy ] = useState("relevance")
  const [ searchResults, setSearchResults ] = useState([])
  const [ isSearching, setIsSearching ] = useState(false)

  // Perform search when query changes
  useEffect(() => {
    if (!query) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const results = products.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.type.toLowerCase().includes(query.toLowerCase()),
      )

      // Sort results
      const sortedResults = [...results]
      switch (sortBy) {
        case "price-low":
          sortedResults.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          sortedResults.sort((a, b) => b.price - a.price)
          break
        case "rating":
          sortedResults.sort((a, b) => b.rating - a.rating)
          break
        case "relevance":
        default:
          // For relevance, prioritize exact matches in name
          sortedResults.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase())
            const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase())

            if (aNameMatch && !bNameMatch) return -1
            if (!aNameMatch && bNameMatch) return 1
            return 0
          })
          break
      }

      setSearchResults(sortedResults)
      setIsSearching(false)
    }, 500)
  }, [ query, sortBy ])

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/")}>
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Search Results</h1>
        <p className="text-muted-foreground">
          {query
            ? isSearching
              ? "Searching..."
              : `Found ${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${query}"`
            : "Enter a search term to find products"}
        </p>
      </div>

      {/* Search Form */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="pl-9"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {/* Results */}
      {query ? (
        isSearching ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${viewMode === "grid" ? "bg-muted" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${viewMode === "list" ? "bg-muted" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} viewMode="list" />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">No results found</h2>
              <p className="text-muted-foreground">We couldn't find any products matching "{query}"</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Suggestions:</p>
              <ul className="text-muted-foreground list-disc list-inside">
                <li>Check your spelling</li>
                <li>Try more general keywords</li>
                <li>Try different keywords</li>
                <li>Browse our categories instead</li>
              </ul>
            </div>
            <Button onClick={() => router.push("/products")} className="mt-4">
              Browse All Products
            </Button>
          </div>
        )
      ) : (
        <div className="text-center py-16 space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Enter a search term</h2>
            <p className="text-muted-foreground">Use the search box above to find products</p>
          </div>
          <Button onClick={() => router.push("/products")} className="mt-4">
            Browse All Products
          </Button>
        </div>
      )}
    </div>
  )
}

