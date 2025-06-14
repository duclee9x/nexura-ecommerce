"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import useEmblaCarousel from 'embla-carousel-react'
import {
  ChevronLeft,
  Heart,
  Star,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import NextImage from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductVariant } from "@nexura/grpc_gateway/protos"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ImageViewer } from "@/components/image-viewer"
import { ReviewImageViewer } from "@/components/review-image-viewer"
import { useSession } from "@/contexts/session-context"
import { ProductDetailsSection } from "@/components/product-details-section"
import CartHooks from "@/hooks/cart-hooks"
import ProductHooks from "@/hooks/product-hooks"
import { useCurrency } from "@/contexts/currency-context"
import { ProductCard } from "@/components/product-card"
import { useWishlist } from "@/contexts/wishlist-context"
import { useQueryClient } from "@tanstack/react-query"
// Add mock review data
const mockReviews = [
  {
    id:      1,
    rating:  5,
    comment: "Excellent product! The quality is outstanding and it exceeded my expectations. Would definitely recommend to others.",
    images:  [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1546938576-6e6a62bd779f?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1552346989-e069318e20a5?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name:   "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      date:   "2024-03-15"
    },
    likes:    12,
    verified: true
  },
  {
    id:      2,
    rating:  4,
    comment: "Good product overall. The build quality is nice but there's room for improvement in some areas.",
    images:  [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name:   "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      date:   "2024-03-10"
    },
    likes:    8,
    verified: true
  },
  {
    id:      3,
    rating:  5,
    comment: "Perfect fit for my needs. The customer service was also very helpful when I had questions.",
    images:  [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&auto=format&fit=crop&q=60"
    ],
    user: {
      name:   "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      date:   "2024-03-05"
    },
    likes:    15,
    verified: true
  },
  {
    id:      4,
    rating:  3,
    comment: "It's okay but a bit pricey for what you get. Delivery was quick though.",
    images:  ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60"],
    user:    {
      name:   "Emily Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      date:   "2024-02-28"
    },
    likes:    4,
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

// Loading Skeleton Components
function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-12 space-y-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </main>
    </div>
  )
}

// Error Component
function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const router = useRouter()
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/products")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
        </div>

        <div className="text-center py-16 space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Basic hooks
  const { slug } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { currency } = useCurrency()
  const { user, isLoading: isUserLoading } = useSession()
  const { wishlistItems } = useWishlist()

  // State hooks
  const [ quantity, setQuantity ] = useState(1)
  const [ activeTab, setActiveTab ] = useState("description")
  const [ selectedVariant, setSelectedVariant ] = useState<ProductVariant | null>(null)
  const [ isAddingToCart, setIsAddingToCart ] = useState(false)
  const [ currentImageIndex, setCurrentImageIndex ] = useState(0)
  const [ isImageViewerOpen, setIsImageViewerOpen ] = useState(false)
  const [ isWishlistLoading, setIsWishlistLoading ] = useState<{ [key: string]: boolean }>({})
  const [ currentReviewIndex, setCurrentReviewIndex ] = useState(0)
  const [ currentReviewImageIndex, setCurrentReviewImageIndex ] = useState(0)
  const [ isReviewImageViewerOpen, setIsReviewImageViewerOpen ] = useState(false)

  // Custom hooks
  const { useAddItem, useGetCart } = CartHooks()
  const { useGetProduct, useAddWishlist, useRemoveWishlist, useGetCategories } = ProductHooks()

  // Data fetching hooks
  const { data: categories } = useGetCategories()
  const { data: product, isLoading, isError } = useGetProduct(slug, "slug")
  const { data: cart } = useGetCart(user?.id || null)

  // Mutation hooks
  const { mutateAsync: addItem } = useAddItem
  const { mutateAsync: addToWishlist } = useAddWishlist
  const { mutateAsync: removeFromWishlist } = useRemoveWishlist

  // Embla carousel hooks
  const [ mainCarouselRef, mainEmbla ] = useEmblaCarousel()
  const [ thumbCarouselRef, thumbEmbla ] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree:      true,
  })

  // Effect hooks
  useEffect(() => {
    if (product?.variants.length) {
      setSelectedVariant(product.variants[0])
    }
  }, [product])

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
  }, [ mainEmbla, thumbEmbla ])

  useEffect(() => {
    setQuantity(1)
  }, [selectedVariant])

  // Loading state
  if (isUserLoading || isLoading) {
    return <ProductDetailSkeleton />
  }

  if (!user) {
    router.push("/login")
    return null
  }

  // Error state
  if (isError || !product) {
    const errorMessage = (() => {
      if (isError && typeof isError === 'object') {
        const error = isError as { message?: string };
        if (error.message) {
          if (error.message.includes('NOT_FOUND')) {
            return "Product not found. Please check the URL and try again.";
          } else if (error.message.includes('INVALID_ARGUMENT')) {
            return "Invalid product ID. Please try again.";
          } else if (error.message.includes('INTERNAL')) {
            return "Server error. Our team has been notified. Please try again later.";
          } else if (error.message.includes('UNAVAILABLE')) {
            return "Service temporarily unavailable. Please try again later.";
          }
          return error.message;
        }
      }
      return "Failed to load product. Please try again later.";
    })();

    return (
      <ErrorState 
        message={errorMessage}
        onRetry={() => {
          queryClient.invalidateQueries({ queryKey: [ 'product', slug ] });
        }}
      />
    )
  }

  // Handle add to cart with stock check and user feedback
  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    if (!product || !selectedVariant || !cart) return;
    const currentItemOnCart = cart.items.find(item => item.productId === product.id && item.variantId === selectedVariant.id);
    if (quantity + (currentItemOnCart?.quantity || 0) > (selectedVariant.stock?.quantity || 0)) {
      toast({
        title:       "Not enough stock",
        description: "You cannot add more items than are available in stock.",
        variant:     "destructive"
      });
      return;
    }
    try {
      await addItem({
        userId:       user?.id || '',
        productId:    product.id,
        variantId:    selectedVariant.id,
        image:        product.images[0]?.url || "",
        quantity,
        currencyCode: currency,
      });
    } catch (error) {
      toast({
        title:       "Failed to add to cart",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant:     "destructive"
      });
    } finally {
      setIsAddingToCart(false)
    }
  };

  // Robust stock status calculation
  const getStockStatus = () => {
    if (!selectedVariant || typeof selectedVariant.stock?.quantity !== 'number') {
      return { status: "Out of Stock", color: "destructive", stock: 0 };
    }
    const currentStock = selectedVariant.stock.quantity;
    const lowThreshold = typeof selectedVariant.lowStockThreshold === 'number' ? selectedVariant.lowStockThreshold : 5;
    if (currentStock <= 0) {
      return { status: "Out of Stock", color: "destructive", stock: 0 };
    }
    if (currentStock <= lowThreshold) {
      return { status: `Low Stock (${currentStock} left)`, color: "warning", stock: currentStock };
    }
    return { status: `In Stock (${currentStock} left)`, color: "success", stock: currentStock };
  }

  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year:  'numeric',
      month: 'long',
      day:   'numeric'
    })
  }
  const handleWishlistToggle = async (productId: string) => {
    try {
      setIsWishlistLoading(prev => ({ ...prev, [productId]: true }))
      const isInWishlist = wishlistItems.find(item => item.productId === productId)
      console.log('isInWishlist', isInWishlist)
      if (isInWishlist) {
        removeFromWishlist({
          wishlistId: isInWishlist.id,
          userId:     user?.id || '',
        })
      } else {
        addToWishlist({
          userId:    user?.id || '',
          productId: productId,
        })
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error)
    } finally {
      setIsWishlistLoading(prev => ({ ...prev, [productId]: false }))
    }
  }
  // Handle variant selection and update currentImageIndex
  const handleVariantSelect = (variant: ProductVariant | null) => {
    setSelectedVariant(variant)
    if (variant && variant.imageIds && variant.imageIds.length > 0 && product) {
      // Find all image indices that match the variant's imageIds
      const variantImageIndices = product.images
        .map((img, index) => variant.imageIds.includes(img.id) ? index : -1)
        .filter(index => index !== -1)

      // If we found any matching images, set to the first one
      if (variantImageIndices.length > 0) {
        setCurrentImageIndex(variantImageIndices[0])
      }
    } else {
      // Reset to first image if no variant selected or no imageIds
      setCurrentImageIndex(0)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/products")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
        </div>

        {product && (
          <>
            <ProductDetailsSection
              product={product}
              selectedVariant={selectedVariant}
              isAddingToCart={isAddingToCart}
              quantity={quantity}
              currentImageIndex={currentImageIndex}
              onImageClick={(index) => {
                setCurrentImageIndex(index)
                setIsImageViewerOpen(true)
              }}
              onVariantSelect={handleVariantSelect}
              onAddToCart={handleAddToCart}
              onQuantityChange={setQuantity}
              onImageIndexChange={setCurrentImageIndex}
              stockStatus={getStockStatus()}
              maxQuantity={selectedVariant?.stock?.quantity ?? 0}
              quantityDisabled={!selectedVariant || (selectedVariant.stock?.quantity ?? 0) <= 0}
            />
          </>
        )}

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
                      .filter(attr => !attr.variantable)
                      .map(attribute => (
                        <div key={attribute.id} className="border-b pb-2">
                          <span className="font-medium">{attribute.name}</span>
                          <div className="mt-1">
                            {attribute.values.map(value => (
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
                          {[
                            1, 2, 3, 4, 5
                          ].map(star => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= Math.round(averageRating)
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
                          .map(([ rating, percentage ]) => (
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
                                  {[
                                    1, 2, 3, 4, 5
                                  ].map(star => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${star <= review.rating
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
            {product.relatedProducts.map(relatedProduct => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                viewMode="grid" 
                categories={categories}
                isInWishlist={wishlistItems.some(item => item.productId === relatedProduct.id)}
                onWishlistToggle={() => handleWishlistToggle(relatedProduct.id)}
                isWishlistLoading={isWishlistLoading[relatedProduct.id]}
              />
            ))}
          </div>
        </div>

        {/* Full Screen Image Viewer */}
        <ImageViewer
          images={product.images?.length > 0
            ? product.images.map(img => img.url || "/no-image-placeholder.webp")
            : ["/no-image-placeholder.webp"]}
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
