"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { toast } from "@/hooks/use-toast"
import { getProductUrl } from "@/lib/utils"
import { Category } from "@/protos/nexura"

type ProductCardProps = {
  categories: Category[] | undefined
  product: {
    id: string
    slug: string
    name: string
    description: string
    costPrice: number
    basePrice: number
    sku: string
    barcode?: string
    featured: boolean
    status: string
    taxable: boolean
    shippable: boolean
    categories: string[]
    images: {
      id: string
      url: string
      isMain: boolean
      blurhash: string
    }[]
    variants: {
      id: string
      sku: string
      price: number
      quantity: number
      lowStockThreshold: number
      colorValue?: string
      colorName?: string
      imageIds: string[]
    }[]
    attributes: {
      id: string
      name: string
      required: boolean
      visible: boolean
      variantable: boolean
      filterable: boolean
      searchable: boolean
      displayOrder: number
      values: string[]
    }[]
  }
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid", categories }: ProductCardProps) {
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()
  const [isAdding, setIsAdding] = useState(false)

  const mainImage = product.images.find(img => img.isMain) || product.images[0]
  const defaultVariant = product.variants[0]

  const handleAddToCart = () => {
    setIsAdding(true)

    addItem({
      product_id: product.id,
      variant_id: defaultVariant.id,
      quantity: 1
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  if (viewMode === "list") {
    return (
      <Link className="flex flex-col sm:flex-row border border-border-base rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-300" href={`/products/${product.slug}`}>
          <div className="relative w-full sm:w-48 h-48">
            <Image
              src={getProductUrl(mainImage?.url) || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-status-info hover:bg-status-info text-text-inverted">Featured</Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-bg-base/80 dark:bg-bg-inverted/50 rounded-full hover:bg-bg-base dark:hover:bg-bg-inverted z-10" 
            >
              <Heart className="h-4 w-4 text-text-base" />
            </Button>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-muted capitalize"> {product.categories.map((category) => categories?.find((c) => c.id === category)?.name).join(", ")}</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-current text-brand-accent" />
                  <span className="text-xs ml-1 text-text-base">4.5</span>
                </div>
              </div>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium hover:underline text-text-base">{product.name}</h3>
              </Link>
              <p className="text-sm text-text-muted mt-1 line-clamp-2">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="font-semibold text-text-base">{formatPrice(defaultVariant.price)}</span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isAdding}
                className={isAdding ? "btn-accent" : "btn-primary"}
              >
                {isAdding ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="border border-border-base rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-square">
          <Image
            src={getProductUrl(mainImage?.url) || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-status-info hover:bg-status-info text-text-inverted">Featured</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-bg-base/80 dark:bg-bg-inverted/50 rounded-full hover:bg-bg-base dark:hover:bg-bg-inverted"
          >
            <Heart className="h-4 w-4 text-text-base" />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-text-muted capitalize"> {product.categories.map((category) => categories?.find((c) => c.id === category)?.name).join(" - ")}</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-current text-brand-accent" />
              <span className="text-xs ml-1 text-text-base">4.5</span>
            </div>
          </div>
          <h3 className="font-medium hover:underline text-text-base">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-text-base">{formatPrice(defaultVariant.price)}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="text-text-base hover:bg-bg-subtle"
            >
              {isAdding ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

