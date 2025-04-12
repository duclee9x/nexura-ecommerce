"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Filter, X, Grid3X3, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCurrency } from "@/contexts/currency-context"
// Sample product data
const products = [
  {
    id: "1",
    name: "Urban Backpack",
    price: 120,
    category: "backpack",
    type: "everyday",
    colors: ["black", "gray", "blue"],
    rating: 4.5,
    image: "/backpack-1.webp?height=300&width=300",
    featured: true,
    new: false,
    sale: false,
  },
  {
    id: "2",
    name: "Hyper Backpack",
    price: 140,
    category: "backpack",
    type: "travel",
    colors: ["black", "gray", "blue"],
    rating: 4.2,
    image: "/backpack-2.jpg?height=300&width=300",
    featured: false,
    new: true,
    sale: false,
  },
  {
    id: "3",
    name: "Smart Carry Backpack",
    price: 95,
    category: "backpack",
    type: "everyday",
    colors: ["black", "gray", "blue"],
    rating: 4.0,
    image: "/backpack-3.jpg?height=300&width=300",
    featured: false,
    new: false,
    sale: true,
  },
  {
    id: "4",
    name: "Aero Backpack",
    price: 127,
    category: "backpack",
    type: "travel",
    colors: ["black", "gray", "blue"],
    rating: 4.8,
    image: "/backpack-4.jpg?height=300&width=300",
    featured: true,
    new: false,
    sale: false,
  },
  {
    id: "5",
    name: "Commuter Backpack",
    price: 110,
    category: "backpack",
    type: "everyday",
    colors: ["black", "gray"],
    rating: 4.3,
    image: "/backpack-5.jpg?height=300&width=300",
    featured: false,
    new: false,
    sale: false,
  },
  {
    id: "6",
    name: "Weekender Duffel",
    price: 150,
    category: "bag",
    type: "travel",
    colors: ["black", "blue"],
    rating: 4.6,
    image: "/bag-1.webp?height=300&width=300",
    featured: false,
    new: true,
    sale: false,
  },
  {
    id: "7",
    name: "Messenger Bag",
    price: 85,
    category: "bag",
    type: "everyday",
    colors: ["black", "gray"],
    rating: 4.1,
    image: "/bag-2.jpg?height=300&width=300",
    featured: false,
    new: false,
    sale: true,
  },
  {
    id: "8",
    name: "Laptop Sleeve",
    price: 45,
    category: "accessory",
    type: "everyday",
    colors: ["black", "gray", "blue"],
    rating: 4.4,
    image: "/bag-4.webp?height=300&width=300",
    featured: false,
    new: false,
    sale: false,
  },
  {
    id: "9",
    name: "Travel Organizer",
    price: 35,
    category: "accessory",
    type: "travel",
    colors: ["black", "gray"],
    rating: 4.7,
    image: "/bag-5.webp?height=300&width=300",
    featured: false,
    new: true,
    sale: false,
  },
  {
    id: "10",
    name: "Water Bottle",
    price: 18,
    category: "accessory",
    type: "everyday",
    colors: ["black", "gray", "blue"],
    rating: 4.9,
    image: "/bag-6.webp?height=300&width=300",
    featured: true,
    new: false,
    sale: false,
  },
  {
    id: "11",
    name: "Extension Strap",
    price: 12,
    category: "accessory",
    type: "travel",
    colors: ["black", "gray"],
    rating: 4.2,
    image: "/bag-7.webp?height=300&width=300",
    featured: false,
    new: false,
    sale: true,
  },
  {
    id: "12",
    name: "TSA-Approved Lock",
    price: 16,
    category: "accessory",
    type: "travel",
    colors: ["black"],
    rating: 4.5,
    image: "/bag-2.jpg?height=300&width=300",
    featured: false,
    new: false,
    sale: false,
  },
]

interface filterType {
  categories: string[]
  types: string[]
  colors: string[]
  features: string[]
}
export default  function ProductCatalogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const { formatPrice } = useCurrency()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filters, setFilters] = useState<filterType>({
    categories: categoryParam ? [categoryParam] : [],
    types: [],
    colors: [],
    features: [],
  })
  const [searchQuery, setSearchQuery] = useState("")

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Search query filter
    if (searchQuery) {
      result = result.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category))
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter((product) => filters.types.includes(product.type as never))
    }

    // Color filter
    if (filters.colors.length > 0) {
      result = result.filter((product) => product.colors.some((color) => filters.colors.includes(color)))
    }

    // Feature filters
    if (filters.features.length > 0) {
      result = result.filter((product) => {
        if (filters.features.includes("featured") && !product.featured) return false
        if (filters.features.includes("new") && !product.new) return false
        if (filters.features.includes("sale") && !product.sale) return false
        return true
      })
    }

    // Price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, filters, priceRange, sortBy, categoryParam])

  const handleFilterChange = (filterType: keyof filterType, value: string) => {
    setFilters((prev) => {
      const currentFilters = [...prev[filterType]]

      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterType]: currentFilters.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [filterType]: [...currentFilters, value],
        }
      }
    })
  }



  const clearAllFilters = () => {
    setFilters({
      categories: [],
      types: [],
      colors: [],
      features: [],
    })
    setPriceRange([0, 200])
    setSearchQuery("")
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.types.length +
    filters.colors.length +
    filters.features.length +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0) +
    (searchQuery ? 1 : 0)

  return (
    
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">All Products</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span>Products</span>
          {categoryParam && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="capitalize">{categoryParam}s</span>
            </>
          )}
        </div>
      </div>

      {/* Filters and Products */}
      <div className="flex flex-col lg:flex-row gap-8 pb-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filters</span>
                </div>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down products based on your preferences</SheetDescription>
              </SheetHeader>
              <div className="py-4 h-[calc(100vh-200px)] overflow-y-auto">
                {/* Mobile Filters */}
                <div className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile-search">Search</Label>
                    <Input
                      id="mobile-search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Price Range</Label>
                      <span className="text-sm text-muted-foreground">
                        {`${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 200]}
                      min={0}
                      max={200}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>

                  {/* Categories */}
                  <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-category-backpack"
                              checked={filters.categories.includes("backpack")}
                              onCheckedChange={() => handleFilterChange("categories", "backpack")}
                            />
                            <Label htmlFor="mobile-category-backpack">Backpacks</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-category-bag"
                              checked={filters.categories.includes("bag")}
                              onCheckedChange={() => handleFilterChange("categories", "bag")}
                            />
                            <Label htmlFor="mobile-category-bag">Bags</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-category-accessory"
                              checked={filters.categories.includes("accessory")}
                              onCheckedChange={() => handleFilterChange("categories", "accessory")}
                            />
                            <Label htmlFor="mobile-category-accessory">Accessories</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Types */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="types">
                      <AccordionTrigger>Types</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-type-everyday"
                              checked={filters.types.includes("everyday")}
                              onCheckedChange={() => handleFilterChange("types", "everyday")}
                            />
                            <Label htmlFor="mobile-type-everyday">Everyday</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-type-travel"
                              checked={filters.types.includes("travel")}
                              onCheckedChange={() => handleFilterChange("types", "travel")}
                            />
                            <Label htmlFor="mobile-type-travel">Travel</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Colors */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="colors">
                      <AccordionTrigger>Colors</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-color-black"
                              checked={filters.colors.includes("black")}
                              onCheckedChange={() => handleFilterChange("colors", "black")}
                            />
                            <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
                            <Label htmlFor="mobile-color-black">Black</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-color-gray"
                              checked={filters.colors.includes("gray")}
                              onCheckedChange={() => handleFilterChange("colors", "gray")}
                            />
                            <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                            <Label htmlFor="mobile-color-gray">Gray</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-color-blue"
                              checked={filters.colors.includes("blue")}
                              onCheckedChange={() => handleFilterChange("colors", "blue")}
                            />
                            <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                            <Label htmlFor="mobile-color-blue">Blue</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Features */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="features">
                      <AccordionTrigger>Features</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-feature-featured"
                              checked={filters.features.includes("featured")}
                              onCheckedChange={() => handleFilterChange("features", "featured")}
                            />
                            <Label htmlFor="mobile-feature-featured">Featured</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-feature-new"
                              checked={filters.features.includes("new")}
                              onCheckedChange={() => handleFilterChange("features", "new")}
                            />
                            <Label htmlFor="mobile-feature-new">New Arrivals</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-feature-sale"
                              checked={filters.features.includes("sale")}
                              onCheckedChange={() => handleFilterChange("features", "sale")}
                            />
                            <Label htmlFor="mobile-feature-sale">On Sale</Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Search</h3>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Price Range</h3>
              <span className="text-sm text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[0, 200]}
              min={0}
              max={200}
              step={5}
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-backpack"
                  checked={filters.categories.includes("backpack")}
                  onCheckedChange={() => handleFilterChange("categories", "backpack")}
                />
                <Label htmlFor="category-backpack">Backpacks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-bag"
                  checked={filters.categories.includes("bag")}
                  onCheckedChange={() => handleFilterChange("categories", "bag")}
                />
                <Label htmlFor="category-bag">Bags</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-accessory"
                  checked={filters.categories.includes("accessory")}
                  onCheckedChange={() => handleFilterChange("categories", "accessory")}
                />
                <Label htmlFor="category-accessory">Accessories</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Types</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-everyday"
                  checked={filters.types.includes("everyday")}
                  onCheckedChange={() => handleFilterChange("types", "everyday")}
                />
                <Label htmlFor="type-everyday">Everyday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="type-travel"
                  checked={filters.types.includes("travel")}
                  onCheckedChange={() => handleFilterChange("types", "travel")}
                />
                <Label htmlFor="type-travel">Travel</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="color-black"
                  checked={filters.colors.includes("black")}
                  onCheckedChange={() => handleFilterChange("colors", "black")}
                />
                <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
                <Label htmlFor="color-black">Black</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="color-gray"
                  checked={filters.colors.includes("gray")}
                  onCheckedChange={() => handleFilterChange("colors", "gray")}
                />
                <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
                <Label htmlFor="color-gray">Gray</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="color-blue"
                  checked={filters.colors.includes("blue")}
                  onCheckedChange={() => handleFilterChange("colors", "blue")}
                />
                <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                <Label htmlFor="color-blue">Blue</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-featured"
                  checked={filters.features.includes("featured")}
                  onCheckedChange={() => handleFilterChange("features", "featured")}
                />
                <Label htmlFor="feature-featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-new"
                  checked={filters.features.includes("new")}
                  onCheckedChange={() => handleFilterChange("features", "new")}
                />
                <Label htmlFor="feature-new">New Arrivals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-sale"
                  checked={filters.features.includes("sale")}
                  onCheckedChange={() => handleFilterChange("features", "sale")}
                />
                <Label htmlFor="feature-sale">On Sale</Label>
              </div>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <Button variant="outline" onClick={clearAllFilters} className="w-full">
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Products */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
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

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <div className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                  <span className="mr-1">Search: {searchQuery}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 200) && (
                <div className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                  <span className="mr-1">
                    Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setPriceRange([0, 200])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {filters.categories.map((category) => (
                <div key={category} className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                  <span className="mr-1">Category: {category}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleFilterChange("categories", category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {filters.types.map((type) => (
                <div key={type} className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                  <span className="mr-1">Type: {type}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleFilterChange("types", type)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {filters.colors.map((color) => (
                <div key={color} className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                  <div
                    className={`w-3 h-3 rounded-full mr-1 bg-${color === "black" ? "black" : color === "gray" ? "gray-400" : "blue-600"}`}
                  ></div>
                  <span className="mr-1">Color: {color}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleFilterChange("colors", color)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {filters.features.map((feature) => (
                <div key={feature} className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                  <span className="mr-1">Feature: {feature}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleFilterChange("features", feature)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
              <Button onClick={clearAllFilters}>Clear All Filters</Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

