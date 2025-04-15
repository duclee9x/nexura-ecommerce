"use client"

import { useState, useEffect, use } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import useEmblaCarousel from 'embla-carousel-react'
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
  ChevronRight,
} from "lucide-react"
import NextImage from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { useQuery } from "@tanstack/react-query"
import { getProductBySlugGateway } from "@/gateway/gateway"
// import { formatPrice } from "@/utils/format"
import { Input } from "@/components/ui/input"
import { Product, ProductVariant } from "@/protos/nexura"
import { getProductUrl} from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ImageViewer } from "@/components/image-viewer"
import { cn } from "@/lib/utils"
import { useCurrency } from "@/contexts/currency-context"
// import { useCart } from "@/hooks/use-cart"
import { ReviewImageViewer } from "@/components/review-image-viewer"

// Add mock review data
const mockReviews = [
  {
    id: 1,
    rating: 5,
    comment: "Excellent product! The quality is outstanding and it exceeded my expectations. Would definitely recommend to others.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1546938576-6e6a62bd779f?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1552346989-e069318e20a5?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      date: "2024-03-15"
    },
    likes: 12,
    verified: true
  },
  {
    id: 2,
    rating: 4,
    comment: "Good product overall. The build quality is nice but there's room for improvement in some areas.",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name: "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      date: "2024-03-10"
    },
    likes: 8,
    verified: true
  },
  {
    id: 3,
    rating: 5,
    comment: "Perfect fit for my needs. The customer service was also very helpful when I had questions.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      date: "2024-03-05"
    },
    likes: 15,
    verified: true
  },
  {
    id: 4,
    rating: 3,
    comment: "It's okay but a bit pricey for what you get. Delivery was quick though.",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name: "Emily Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      date: "2024-02-28"
    },
    likes: 4,
    verified: false
  }
]

// Add rating distribution data
const ratingDistribution = {
  5: 65,
  4: 20,
  3: 10,
  2: 3,
  1: 2
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  // const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const {formatPrice} = useCurrency()
  // Embla carousel setup
  const [mainCarouselRef, mainEmbla] = useEmblaCarousel()
  const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [currentReviewImageIndex, setCurrentReviewImageIndex] = useState(0)
  const [isReviewImageViewerOpen, setIsReviewImageViewerOpen] = useState(false)

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlugGateway(slug).then(res=>res.product),
    enabled: !!slug,
  })

  // Sync main and thumb carousels
  useEffect(() => {
    if (!mainEmbla || !thumbEmbla) return

    const onSelect = () => {
      if (!mainEmbla || !thumbEmbla) return
      thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap())
      setCurrentImageIndex(mainEmbla.selectedScrollSnap())
    }

    mainEmbla.on('select', onSelect)
    thumbEmbla.on('select', () => {
      if (!mainEmbla || !thumbEmbla) return
      mainEmbla.scrollTo(thumbEmbla.selectedScrollSnap())
    })

    return () => {
      mainEmbla.off('select', onSelect)
    }
  }, [mainEmbla, thumbEmbla])

  // Handle carousel navigation
  const scrollPrev = () => mainEmbla?.scrollPrev()
  const scrollNext = () => mainEmbla?.scrollNext()

  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    if (value > (selectedVariant ? selectedVariant.quantity : 0)) return
    setQuantity(value)
  }

  // Handle add to cart
  // const handleAddToCart = () => {
  //   if (!product) return

  //   // Check if a variant is selected for products with variants
  //   if (product.variants.length > 0 && !selectedVariant) {
  //     toast({
  //       title: "Please select options",
  //       description: "Please select all required options before adding to cart.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   setIsAddingToCart(true)

  //   const currentVariant = selectedVariant || product.variants[0]

  //   addItem({
  //     id: product.id,
  //     name: product.name,
  //     price: currentVariant.price,
  //     quantity,
  //     variant: currentVariant,
  //     image: product.images[0]?.url
  //   })

  //   setTimeout(() => {
  //     setIsAddingToCart(false)
  //     toast({
  //       title: "Added to cart",
  //       description: `${quantity} × ${product.name} ${selectedVariant ? `(${getVariantName(selectedVariant)})` : ""} added to your cart.`,
  //     })
  //   }, 1000)
  // }

  // Get variant name for display
  const getVariantName = (variant: ProductVariant) => {
    return variant.attributes
      .map((attr) => {
        if (attr.name.toLowerCase() === "color") {
          return attr.value
        }
        return attr.value
      })
      .filter(Boolean)
      .join(" / ")
  }

  const getCurrentPrice = (): string => {
    if (selectedVariant) {
      return selectedVariant.price.toFixed(2).toString()
    }
    return product?.basePrice?.toFixed(2) || "0.00"
  }

  const getStockStatus = () => {
    const currentStock = selectedVariant ? selectedVariant.quantity : 0

    if (currentStock <= 0) {
      return { status: "Out of Stock", color: "destructive" }
    }

    const lowThreshold = selectedVariant?.lowStockThreshold || 5

    if (currentStock <= lowThreshold) {
      return { status: `Low Stock (${currentStock} left)`, color: "warning" }
    }

    return { status: "In Stock", color: "success" }
  }

  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading || !product) {
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
          {/* Product Images Carousel */}
          <div className="space-y-4">
            {/* Main Carousel */}
            <div className="relative overflow-hidden" ref={mainCarouselRef}>
              <div className="flex">
                {product.images.map((image, index) => (
                  <div key={image.url} className="relative flex-[0_0_100%] min-w-0">
                    <div className="relative aspect-square">
                      <NextImage
                        src={getProductUrl(image.url) || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        priority={index === 0}
                        className="object-contain cursor-pointer"
                        onClick={() => {
                          setCurrentImageIndex(index)
                          setIsImageViewerOpen(true)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 z-10"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 z-10"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Thumbnail Carousel */}
            <div className="relative overflow-hidden" ref={thumbCarouselRef}>
              <div className="flex gap-2 -mx-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.url}
                    onClick={() => {
                      mainEmbla?.scrollTo(index)
                      setCurrentImageIndex(index)
                    }}
                    onMouseEnter={() => {
                      setCurrentImageIndex(index) 
                    }}
                    className={`relative flex-[0_0_23%] min-w-0 aspect-square border rounded-md overflow-hidden 
                      ${index === currentImageIndex ? "ring-2 ring-primary" : ""}`}
                  >
                    <NextImage
                      src={getProductUrl(image.url) || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
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
              <span className="text-2xl font-bold">{formatPrice(parseFloat(getCurrentPrice()))}</span>
              {product.basePrice && selectedVariant?.price != product.basePrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.basePrice)}</span>
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
                    disableOutOfStock={true}
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
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      min={1}
                      max={selectedVariant?.quantity || 0}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= (selectedVariant?.quantity || 0)}
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
                  {selectedVariant.attributes.map((attr) => (
                    <div key={attr.id} className="flex justify-between">
                      <span className="text-muted-foreground">{attr.name}:</span>
                      <span className="font-medium">{attr.value}</span>
                    </div>
                  ))}
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
                    {product.attributes
                      .filter((attr) => !attr.variantable)
                      .map((attribute) => (
                        <div key={attribute.id} className="border-b pb-2">
                          <span className="font-medium">{attribute.name}</span>
                          <div className="mt-1">
                            {attribute.values.map((value) => (
                              <Badge key={value} variant="outline" className="mr-2 mb-1">
                                {value}
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
                <div className="space-y-8">
                  {/* Reviews Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold">Customer Reviews</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.round(averageRating) 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground">({mockReviews.length} reviews)</span>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(ratingDistribution)
                          .sort(([a], [b]) => Number(b) - Number(a))
                          .map(([rating, percentage]) => (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="flex items-center gap-1 w-12">
                                <span>{rating}</span>
                                <Star className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <Progress value={percentage} className="h-2" />
                              <span className="text-sm text-muted-foreground w-12">{percentage}%</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4 p-6 bg-muted/30 rounded-lg">
                      <h4 className="text-lg font-medium">Share Your Experience</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Help others make the right choice! Share your thoughts about this product.
                      </p>
                      <Button size="lg" className="w-full md:w-auto">
                        Write a Review
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Review List */}
                  <div className="space-y-6">
                    {mockReviews.map((review, index) => (
                      <div key={review.id} className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={review.user.avatar} />
                              <AvatarFallback>{review.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{review.user.name}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= review.rating 
                                          ? "text-yellow-400 fill-yellow-400" 
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(review.user.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Heart className="h-4 w-4 mr-1" />
                            {review.likes}
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed">{review.comment}</p>

                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2 mt-4">
                            {review.images.map((image, imageIndex) => (
                              <button
                                key={imageIndex}
                                className="relative aspect-square w-20 rounded-md overflow-hidden"
                                onClick={() => {
                                  setCurrentReviewIndex(index)
                                  setCurrentReviewImageIndex(imageIndex)
                                  setIsReviewImageViewerOpen(true)
                                }}
                              >
                                <NextImage
                                  src={image}
                                  alt={`Review image ${imageIndex + 1}`}
                                  fill
                                  className="object-cover hover:opacity-80 transition-opacity"
                                />
                                {imageIndex === 3 && review.images!.length > 4 && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white">
                                    +{review.images!.length - 4}
                                  </div>
                                )}
                              </button>
                            )).slice(0, 4)}
                          </div>
                        )}
                        <Separator />
                      </div>
                    ))}
                  </div>

                  {/* Load More Button */}
                  <div className="flex justify-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* {mockProducts.slice(0, 4).map((relatedProduct, i) => (
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
                    <span className="font-bold">{formatPrice(relatedProduct.basePrice)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm ml-1">4.2</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))} */}
          </div>
        </div>

        {/* Full Screen Image Viewer */}
        <ImageViewer
          images={product.images.map(img => getProductUrl(img.url) || "/placeholder.svg")}
          currentIndex={currentImageIndex}
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          onIndexChange={(index) => {
            setCurrentImageIndex(index)
            mainEmbla?.scrollTo(index)
          }}
        />

        {/* Review Image Viewer */}
        <ReviewImageViewer
          reviews={mockReviews}
          currentReviewIndex={currentReviewIndex}
          currentImageIndex={currentReviewImageIndex}
          isOpen={isReviewImageViewerOpen}
          onClose={() => setIsReviewImageViewerOpen(false)}
          onReviewChange={setCurrentReviewIndex}
          onImageChange={setCurrentReviewImageIndex}
          formatDate={formatDate}
        />
      </main>
    </div>
  )
}
