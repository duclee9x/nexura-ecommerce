"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
import { Product, ProductVariant } from "@nexura/grpc_gateway/protos"
import { useCurrency } from "@/contexts/currency-context"
import { ImageViewer } from "@/components/image-viewer"

interface ProductDetailsSectionProps {
  product: Product
  onImageClick?: (index: number) => void
  onVariantSelect: (variant: ProductVariant | null) => void
  selectedVariant: ProductVariant | null
  onAddToCart?: () => void
  onQuantityChange?: (value: number) => void
  quantity?: number
  currentImageIndex?: number
  onImageIndexChange?: (index: number) => void
  onGoToCart?: () => void
  stockStatus: { status: string; color: string; stock: number }
  maxQuantity?: number
  isAddingToCart?: boolean
  quantityDisabled?: boolean
}

export function ProductDetailsSection({
  product,
  onImageClick,
  onVariantSelect,
  selectedVariant,
  onAddToCart,
  onQuantityChange,
  quantity = 1,
  currentImageIndex = 0,
  onImageIndexChange,
  stockStatus,
  maxQuantity = 0,
  isAddingToCart = false,
  quantityDisabled = false,
}: ProductDetailsSectionProps) {
  const [mainCarouselRef, mainEmbla] = useEmblaCarousel()
  const [thumbCarouselRef, thumbEmbla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const { formatPrice } = useCurrency()
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)

  // Update carousel when currentImageIndex changes
  useEffect(() => {
    if (mainEmbla && typeof currentImageIndex === 'number') {
      mainEmbla.scrollTo(currentImageIndex)
    }
  }, [currentImageIndex, mainEmbla])

  // Sync main and thumb carousels
  useEffect(() => {
    if (!mainEmbla || !thumbEmbla) return

    const onSelect = () => {
      if (!mainEmbla || !thumbEmbla) return
      const currentIndex = mainEmbla.selectedScrollSnap()
      thumbEmbla.scrollTo(currentIndex)
      if (onImageIndexChange) {
        onImageIndexChange(currentIndex)
      }
    }

    mainEmbla.on('select', onSelect)
    thumbEmbla.on('select', () => {
      if (!mainEmbla || !thumbEmbla) return
      const currentIndex = thumbEmbla.selectedScrollSnap()
      mainEmbla.scrollTo(currentIndex)
      if (onImageIndexChange) {
        onImageIndexChange(currentIndex)
      }
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
          <div className="flex gap-2 mx-4">
            {product.images.map((image, index) => {
              const isVariantImage = selectedVariant?.imageIds?.includes(image.id)
              return (
                <button
                  key={image.url}
                  onClick={() => {
                    mainEmbla?.scrollTo(index)
                    if (onImageIndexChange) {
                      onImageIndexChange(index)
                    }
                  }}
                  
                  className={`relative flex-[0_0_25%] min-w-0 aspect-square border border-6 rounded-md overflow-hidden 
                    ${index === currentImageIndex ? "ring-2 ring-primary" : ""}
                    ${selectedVariant && !isVariantImage ? "opacity-80" : ""}`}
                >
                  <NextImage
                    src={image.url || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {isVariantImage && (
                    <div className="absolute top-1 right-1">
                      <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                  )}
                </button>
              )
            })}
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
                (stockStatus?.color ?? "destructive") === "success"
                  ? "default"
                  : (stockStatus?.color ?? "destructive") === "warning"
                    ? "outline"
                    : "destructive"
              }
              className="ml-2"
            >
              {(stockStatus?.status || "Out of Stock")}
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
                disableOutOfStock={false} // Show all variant attribute buttons, but disable out-of-stock ones in the selector itself
              />
            </CardContent>
          </Card>
        )}

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || quantityDisabled}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={maxQuantity}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10)
                    if (!isNaN(value)) {
                      handleQuantityChange(value)
                    }
                  }}
                  className="w-16 text-center"
                  disabled={quantityDisabled}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxQuantity || quantityDisabled}
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
              onClick={onAddToCart}
              disabled={isAddingToCart || (stockStatus?.color ?? "destructive") === "destructive" || !selectedVariant}
            >
              {isAddingToCart ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
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