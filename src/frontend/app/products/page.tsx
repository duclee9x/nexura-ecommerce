"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Filter, X, Grid3X3, List, Loader2 } from "lucide-react"

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
import { useQuery } from "@tanstack/react-query"
import { getAllCategoryGateway, listProductsGateway } from "@/gateway/gateway"
import { useQueryClient } from "@tanstack/react-query"
import { useProducts, useCategories, useFilteredProducts, useQueryUtils } from "@/hooks/use-query"


interface filterType {
  categories: string[]
  types: string[]
  colors: string[]
  features: string[]
}

export default function ProductCatalogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const { formatPrice } = useCurrency()
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
  const queryClient = useQueryClient()

  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const { 
    data: products, 
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError
  } = useProducts()

  const { invalidateQueries } = useQueryUtils()

  const filteredProducts = useFilteredProducts(products, {
    searchQuery,
    categories: filters.categories,
    colors: filters.colors,
    features: filters.features,
    priceRange: priceRange as [number, number]
  })

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

      {isProductsError ? (
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <div className="text-destructive text-lg font-semibold">
            {productsError instanceof Error ? productsError.message : "Failed to load products"}
          </div>
          <Button 
            variant="outline" 
            onClick={() => invalidateQueries(["productsCatalog"])}
          >
            Retry
          </Button>
        </div>
      ) : (isProductsLoading || isCategoriesLoading) ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
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
                            {products?.reduce((acc: string[], product) => {
                              product.categories.forEach(category => {
                                if (!acc.includes(category)) {
                                  acc.push(category)
                                }
                              })
                              return acc
                            }, [] as string[]).map(category => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-category-${category}`}
                                  checked={filters.categories.includes(category)}
                                  onCheckedChange={() => handleFilterChange("categories", category)}
                                />
                                <Label htmlFor={`mobile-category-${category}`}>{categories?.find((c) => c.id === category)?.name}</Label>
                              </div>
                            ))}
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
                            {products?.reduce((acc: string[], product) => {
                              product.variants.forEach(variant => {
                                const colorAttribute = variant.attributes.find((attr: { name: string; extraValue?: string }) => 
                                  attr.name.toLowerCase() === 'color'
                                )
                                if (colorAttribute?.extraValue && !acc.includes(colorAttribute.extraValue)) {
                                  acc.push(colorAttribute.extraValue)
                                }
                              })
                              return acc
                            }, [] as string[]).map(color => (
                              <div key={color} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-color-${color}`}
                                  checked={filters.colors.includes(color)}
                                  onCheckedChange={() => handleFilterChange("colors", color)}
                                />
                                <div 
                                  className="w-4 h-4 rounded-full border border-border" 
                                  style={{ backgroundColor: color.startsWith('#') ? color : '#CCCCCC' }}
                                />
                                <Label htmlFor={`mobile-color-${color}`}>{color}</Label>
                              </div>
                            ))}
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

            <div className="space-y-2">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                {products?.reduce((acc: string[], product) => {
                  product.categories.forEach(category => {
                    if (!acc.includes(category)) {
                      acc.push(category)
                    }
                  })
                  return acc
                }, [] as string[]).map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleFilterChange("categories", category)}
                    />
                    <Label htmlFor={`category-${category}`}>{categories?.find((c) => c.id === category)?.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Colors</h3>
              <div className="space-y-2">
                {products?.reduce((acc: string[], product) => {
                  product.variants.forEach(variant => {
                    const colorAttribute = variant.attributes.find((attr: { name: string; extraValue?: string }) => 
                      attr.name.toLowerCase() === 'color'
                    )
                    if (colorAttribute?.extraValue && !acc.includes(colorAttribute.extraValue)) {
                      acc.push(colorAttribute.extraValue)
                    }
                  })
                  return acc
                }, [] as string[]).map(color => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={filters.colors.includes(color)}
                      onCheckedChange={() => handleFilterChange("colors", color)}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-border" 
                      style={{ backgroundColor: color.startsWith('#') ? color : '#CCCCCC' }}
                    />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
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
                Showing {products?.length || 0} of {products?.length || 0} products
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
                    <span className="mr-1">Category: {categories?.find((c) => c.id === category)?.name}</span>
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

                {filters.colors.map((color) => (
                  <div key={color} className="flex items-center bg-muted text-sm rounded-full px-3 py-1">
                    <div
                      className="w-3 h-3 rounded-full border border-border mr-1"
                      style={{ backgroundColor: color.startsWith('#') ? color : '#CCCCCC' }}
                    />
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
            {!products || products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="grid" categories={categories} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode="list" categories={categories} />
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
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

