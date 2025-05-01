"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCurrency } from "@/contexts/currency-context"

type Product = {
  id: string
  name: string
  price: number
  category: string
  image: string
}
// Sample product data for search
const products: Product[] = [
  {
    id: "1",
    name: "Urban Backpack",
    price: 120,
    category: "backpack",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Hyper Backpack",
    price: 140,
    category: "backpack",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Smart Carry Backpack",
    price: 95,
    category: "backpack",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Aero Backpack",
    price: 127,
    category: "backpack",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Commuter Backpack",
    price: 110,
    category: "backpack",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Weekender Duffel",
    price: 150,
    category: "bag",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    name: "Messenger Bag",
    price: 85,
    category: "bag",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    name: "Laptop Sleeve",
    price: 45,
    category: "accessory",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "9",
    name: "Travel Organizer",
    price: 35,
    category: "accessory",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "10",
    name: "Water Bottle",
    price: 18,
    category: "accessory",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "11",
    name: "Extension Strap",
    price: 12,
    category: "accessory",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "12",
    name: "TSA-Approved Lock",
    price: 16,
    category: "accessory",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Popular search terms
const popularSearches = ["backpack", "travel", "laptop", "water bottle", "organizer", "black"]

export function SearchDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const { formatPrice } = useCurrency()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem("nexura-recent-searches")
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches))
      } catch (error) {
        console.error("Failed to parse recent searches:", error)
        setRecentSearches([])
      }
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return

    const updatedSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("nexura-recent-searches", JSON.stringify(updatedSearches))
  }

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    handleSearch(query)
  }

  // Handle search submission
  const handleSearchFormSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    saveRecentSearch(searchQuery)
    onOpenChange(false)
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleSearchClickSubmit: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    saveRecentSearch(searchQuery)
    onOpenChange(false)
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }
  // Handle clicking on a search result
  const handleResultClick = (productId: string) => {
    saveRecentSearch(searchQuery)
    onOpenChange(false)
    router.push(`/products/${productId}`)
  }

  // Handle clicking on a recent or popular search
  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
    handleSearch(query)
    saveRecentSearch(query)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] p-0">
        <div className="flex items-center border-b dark:border-gray-800 px-4">
          <DialogTitle className="flex items-center">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <form onSubmit={handleSearchFormSubmit} className="flex-1">
              <Input
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-6"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
            </form></DialogTitle>   
            <DialogDescription>
              {/* <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button> */}
            </DialogDescription>
        </div>
        
        <div className="px-4 py-6 max-h-[70vh]">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : searchQuery ? (
            searchResults.length > 0 ? (
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <div className="relative w-16 h-16 border dark:border-gray-800">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="font-medium">{formatPrice(product.price)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="flex items-center gap-1" onClick={handleSearchClickSubmit}>
                    View all results
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8">
                <h3 className="font-medium mb-2">No results found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We couldn't find any products matching "{searchQuery}"
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularSearches.map((term) => (
                    <Button key={term} variant="outline" size="sm" onClick={() => handleQuickSearch(term)}>
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <Button key={index} variant="outline" size="sm" onClick={() => handleQuickSearch(term)}>
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <Button key={term} variant="outline" size="sm" onClick={() => handleQuickSearch(term)}>
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Popular Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["Backpacks", "Bags", "Accessories"].map((category) => (
                    <div
                      key={category}
                      className="border dark:border-gray-800 rounded-lg p-4 text-center cursor-pointer hover:bg-muted"
                      onClick={() => handleQuickSearch(category.toLowerCase())}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

