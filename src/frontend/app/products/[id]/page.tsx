"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Check,
  Plus,
  Minus,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { mockProducts, mockTShirtVariants, mockAttributes } from "@/lib/mock-data"
import type { Product, ProductVariant } from "@/types/product"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const {id: productId} = use(params)

  // In a real app, fetch the product data based on the ID
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [productImageSet, setProductImageSet] = useState<string[]>([])

  // Load product data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let foundProduct = mockProducts.find((p) => p.id === productId) || mockProducts[0]

      const minPrice = foundProduct.variants.reduce((prev, curr) => prev.price < curr.price ? prev : curr).price
      const maxPrice = foundProduct.variants.reduce((prev, curr) => prev.price > curr.price ? prev : curr).price
      foundProduct.minPrice = minPrice
      foundProduct.maxPrice = maxPrice
      setProduct(foundProduct)
      setProductImageSet(foundProduct.variants.map((v) => v.images.map((i) => i.url)).flat())
      // Set default variant if available
      const defaultVariant = foundProduct.variants.find((v) => v.isDefault) || foundProduct.variants[0]
      setSelectedVariant(defaultVariant)
    }, 100)
  }, [productId])
  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant && product) {
      // If variant has images, use the first one
      if (selectedVariant.images.length > 0) {
        const mainImage = selectedVariant.images.find((img) => img.isMain) || selectedVariant.images[0]
        const mainImageIndex = productImageSet.findIndex((img) => img === mainImage.url)
        if (mainImageIndex >= 0) {
          setCurrentImageIndex(mainImageIndex)
        }
      }
    }
  }, [selectedVariant, product])

  // Handle quantity change
  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, quantity + amount)
    const maxAvailable = selectedVariant ? selectedVariant.inventory : 0

    if (newQuantity <= maxAvailable) {
      setQuantity(newQuantity)
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Only ${maxAvailable} items available in stock.`,
        variant: "destructive",
      })
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return

    // Check if a variant is selected for products with variants
    if (product.variants.length > 0 && !selectedVariant) {
      toast({
        title: "Please select options",
        description: "Please select all required options before adding to cart.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)

    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false)
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} ${selectedVariant ? `(${getVariantName(selectedVariant)})` : ""} added to your cart.`,
      })
    }, 1000)
  }

  // Get variant name for display
  const getVariantName = (variant: ProductVariant) => {
    return variant.attributeValues
      .map(({ attributeId, valueId }) => {
        const attribute = mockAttributes.find((a) => a.id === attributeId)
        const value = attribute?.values.find((v) => v.id === valueId)
        return value?.name || ""
      })
      .filter(Boolean)
      .join(" / ")
  }
  const getCurrentPrice = (): string => {
    if (selectedVariant) {
      return selectedVariant.price.toFixed(2).toString()
    }
    return product?.minPrice + "-" + product?.maxPrice
  }

  // Get stock status
  const getStockStatus = () => {
    const currentStock = selectedVariant ? selectedVariant.inventory : 0

    if (currentStock <= 0) {
      return { status: "Out of Stock", color: "destructive" }
    }

    const lowThreshold = selectedVariant?.lowStockThreshold || 5

    if (currentStock <= lowThreshold) {
      return { status: `Low Stock (${currentStock} left)`, color: "warning" }
    }

    return { status: "In Stock", color: "success" }
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    )
  }

  const stockStatus = getStockStatus()

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/products")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border rounded-md overflow-hidden aspect-square bg-muted/50">
              <img
                src={productImageSet[currentImageIndex || 0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImageSet.map((image, index) => (
                <button
                  key={image}
                  className={`border rounded-md overflow-hidden aspect-square ${index === currentImageIndex ? "ring-2 ring-primary" : ""
                    }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${getCurrentPrice()}</span>
              {product.basePrice && selectedVariant?.price != product.basePrice && (
                <span className="text-lg text-muted-foreground line-through">${product.basePrice.toFixed(2)}</span>
              )}

              {selectedVariant && (
                <Badge
                  variant={
                    stockStatus.color === "success"
                      ? "default"
                      : stockStatus.color === "warning"
                        ? "outline"
                        : "destructive"
                  }
                  className="ml-2"
                >
                  {stockStatus.status}
                </Badge>
              )}
            </div>

            <Separator />

            {/* Variant Selection */}
            {product.variants.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <ProductVariantSelector
                    variants={product.variants}
                    onVariantSelect={setSelectedVariant}
                    selectedVariant={selectedVariant}
                  />
                </CardContent>
              </Card>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (selectedVariant ? selectedVariant.inventory : 0)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {selectedVariant && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedVariant(null)
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Selection
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || stockStatus.color === "destructive"}
                >
                  {isAddingToCart ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Selected Variant Summary */}
            {selectedVariant && (
              <div className="bg-muted/30 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-2">Selected Configuration</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  {selectedVariant.attributeValues.map(({ attributeId, valueId }) => {
                    const attribute = mockAttributes.find((a) => a.id === attributeId)
                    const value = attribute?.values.find((v) => v.id === valueId)

                    return (
                      <div key={attributeId} className="flex justify-between">
                        <span className="text-muted-foreground">{attribute?.name}:</span>
                        <span className="font-medium">
                          {attribute?.type === "color" && value?.color ? (
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value.color }} />
                              <span>{value?.name}</span>
                            </div>
                          ) : (
                            value?.name
                          )}
                        </span>
                      </div>
                    )
                  })}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium">{selectedVariant.sku}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Product Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">2-year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">In stock & ready to ship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <Card className="p-6">
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{product.description}</p>
                  <p>
                    This product is designed for the modern consumer who values quality and functionality. Whether
                    you're looking for everyday use or special occasions, this product delivers exceptional performance
                    and style.
                  </p>
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Premium quality materials for durability</li>
                    <li>Versatile design suitable for multiple occasions</li>
                    <li>Comfortable fit and feel</li>
                    <li>Easy to maintain and clean</li>
                    <li>Available in multiple colors and sizes</li>
                  </ul>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="py-4">
              <Card className="p-6">
                <div className="space-y-6">
                  {/* Dimensions */}
                  {product.dimensions && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Dimensions & Weight</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Length</span>
                          <span className="text-muted-foreground">{product.dimensions.length} cm</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Width</span>
                          <span className="text-muted-foreground">{product.dimensions.width} cm</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Height</span>
                          <span className="text-muted-foreground">{product.dimensions.height} cm</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Weight</span>
                          <span className="text-muted-foreground">{product.dimensions.weight} kg</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Additional Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Additional Information</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="care">
                        <AccordionTrigger>Care Instructions</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Machine wash cold with similar colors. Tumble dry low. Do not bleach. Do not iron
                            decoration.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="warranty">
                        <AccordionTrigger>Warranty Information</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            This product comes with a 2-year limited warranty covering manufacturing defects. Normal
                            wear and tear is not covered. Contact customer service for warranty claims.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="shipping">
                        <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                        <AccordionContent>
                          <p>
                            Free standard shipping on orders over $50. Express shipping available at checkout. Returns
                            accepted within 30 days of delivery. Item must be unused with original tags and packaging.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="attributes" className="py-4">
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Product Attributes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAttributes
                      .filter((attr) => product.attributes.includes(attr.id) && !attr.variantable)
                      .map((attribute) => (
                        <div key={attribute.id} className="border-b pb-2">
                          <span className="font-medium">{attribute.name}</span>
                          <div className="mt-1">
                            {attribute.values.map((value) => (
                              <Badge key={value.id} variant="outline" className="mr-2 mb-1">
                                {value.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <Card className="p-6">
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
                  <p className="text-muted-foreground mb-4">
                    This product has 24 reviews with an average rating of 4.2 stars
                  </p>
                  <Button>Write a Review</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((relatedProduct, i) => (
              <Card key={relatedProduct.id || i} className="overflow-hidden">
                <div className="aspect-square bg-muted/50 relative">
                  <img
                    src={
                      relatedProduct.images[0]?.url ||
                      `/placeholder.svg?height=300&width=300&text=Related+Product+${i + 1}`
                    }
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <Button variant="outline" size="icon" className="absolute top-2 right-2 bg-background/80 h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">${relatedProduct.basePrice.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm ml-1">4.2</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

    </div>
  )
}
