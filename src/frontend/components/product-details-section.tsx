"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
import { ProductVariantSelector } from "@/components/product-variant-selector"
import { Input } from "@/components/ui/input"
import { Product, ProductVariant } from "@/protos/nexura"
import { useCurrency } from "@/contexts/currency-context"
import { useAddToCart } from "@/hooks/use-mutation"
import { useSession } from "@/contexts/session-context"
import { ImageViewer } from "@/components/image-viewer"

interface ProductDetailsSectionProps {
  product: Product
  onImageClick?: (index: number) => void
  onVariantSelect: (variant: ProductVariant | null) => void
  selectedVariant: ProductVariant | null
  isAddingToCart?: boolean
  onAddToCart?: () => void
  onQuantityChange?: (value: number) => void
  quantity?: number
  currentImageIndex?: number
  onImageIndexChange?: (index: number) => void
  isInCart?: boolean
  onGoToCart?: () => void
}

export function ProductDetailsSection({
  product,
  onImageClick,
  onVariantSelect,
  selectedVariant,
  isAddingToCart = false,
  onAddToCart,
  onQuantityChange,
  quantity = 1,
  currentImageIndex = 0,
  onImageIndexChange,
  isInCart = false,
  onGoToCart,
}: ProductDetailsSectionProps) {
  const [mainCarouselRef, mainEmbla] = useEmblaCarousel()
  const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const { formatPrice } = useCurrency()
  const { user } = useSession()
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const { currency } = useCurrency()

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

  const { mutate: addToCart } = useAddToCart({
    successMessage: `${quantity} × ${product?.name} ${selectedVariant ? `(${getVariantName(selectedVariant)})` : ""} added to your cart.`,
    errorMessage: "Failed to add item to cart. Please try again."
  })

  const handleAddToCart = () => {
    if (!product || !selectedVariant || !user?.id) return

    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      userId: user.id,
      quantity,
      image: product.images[0]?.url || "",
      currencyCode: currency
    })
  }

  // Sync main and thumb carousels
  useEffect(() => {
    if (!mainEmbla || !thumbEmbla) return

    const onSelect = () => {
      if (!mainEmbla || !thumbEmbla) return
      thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap())
      if (onImageIndexChange) {
        onImageIndexChange(mainEmbla.selectedScrollSnap())
      }
    }

    mainEmbla.on('select', onSelect)
    thumbEmbla.on('select', () => {
      if (!mainEmbla || !thumbEmbla) return
      mainEmbla.scrollTo(thumbEmbla.selectedScrollSnap())
    })

    return () => {
      mainEmbla.off('select', onSelect)
    }
  }, [mainEmbla, thumbEmbla, onImageIndexChange])

  // Handle carousel navigation
  const scrollPrev = () => mainEmbla?.scrollPrev()
  const scrollNext = () => mainEmbla?.scrollNext()

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

  const stockStatus = getStockStatus()
  const mainImage = product.images[0]

  const handleQuantityChange = (value: number) => {
    if (onQuantityChange) {
      onQuantityChange(value)
    }
  }

  return (
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
                    src={image.url || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-contain cursor-pointer"
                    onClick={() => {
                      if (onImageClick) {
                        onImageClick(index)
                      } else {
                        setIsImageViewerOpen(true)
                      }
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
                  if (onImageIndexChange) {
                    onImageIndexChange(index)
                  }
                }}
                onMouseEnter={() => {
                  if (onImageIndexChange) {
                    onImageIndexChange(index)
                  }
                }}
                className={`relative flex-[0_0_23%] min-w-0 aspect-square border rounded-md overflow-hidden 
                  ${index === currentImageIndex ? "ring-2 ring-primary" : ""}`}
              >
                <NextImage
                  src={image.url || "/placeholder.svg"}
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
                onVariantSelect={onVariantSelect}
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
                  onClick={() => onVariantSelect?.(null)}
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
              onClick={isInCart && quantity === 1 ? onGoToCart : handleAddToCart}
              disabled={isAddingToCart || stockStatus.color === "destructive" || !selectedVariant}
            >
              {isAddingToCart ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : isInCart && quantity === 1 ? (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Go to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {selectedVariant ? "Add to Cart" : "Select a Variant"}
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

      {/* Full Screen Image Viewer */}
      <ImageViewer
        images={product.images.map(img => img.url || "/placeholder.svg")}
        currentIndex={currentImageIndex}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        onIndexChange={(index) => {
          if (onImageIndexChange) {
            onImageIndexChange(index)
          }
          mainEmbla?.scrollTo(index)
        }}
      />
    </div>
  )
} 