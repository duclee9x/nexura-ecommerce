"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { toast } from "@/hooks/use-toast"
import { Category, Product, ProductVariant, CartItem } from "@nexura/grpc_gateway/protos"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductDetailsSection } from "@/components/product-details-section"
import { cn, getStockStatus } from "@/lib/utils"
import { useSession } from "@/contexts/session-context"
import CartHooks from "@/hooks/cart-hooks"
type ProductCardProps = {
  categories:        Category[] | undefined
  product:           Product
  viewMode?:         "grid" | "list"
  isInWishlist?:      boolean | undefined
  onWishlistToggle?:  (productId: string) => Promise<void>
  isWishlistLoading?: boolean | null
}

export function ProductCard({ product, viewMode = "grid", categories, isInWishlist, onWishlistToggle, isWishlistLoading }: ProductCardProps) {
  const { items } = useCart()

  const { user } = useSession()
  const router = useRouter()
 
  const { useAddItem, useUpdateItem } = CartHooks()
  const { mutateAsync: addItem, isPending: isAddingToCart } = useAddItem
  const { mutateAsync: updateQuantity } = useUpdateItem

  const { formatPrice } = useCurrency()
  const mainImage = product.images.find(img => img.isMain) || product.images[0]
  const defaultVariant = product.variants[0]
  const [ showQuickView, setShowQuickView ] = useState(false)
  const [ selectedVariant, setSelectedVariant ] = useState<ProductVariant | undefined>(undefined)
  const [ quantity, setQuantity ] = useState(1)
  const { currency } = useCurrency()

  const maxPrice = product.variants.reduce((max, variant) => Math.max(max, variant.price), 0)
  const minPrice = product.variants.reduce((min, variant) => Math.min(min, variant.price), maxPrice)
  const price = maxPrice === minPrice ? formatPrice(maxPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`

  // Check if product is in cart
  const isInCart = items.some(
    (item: CartItem) => item.productId === product.id &&
      (!selectedVariant || item.variantId === selectedVariant.id)
  )

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title:       "Please login to add to cart",
        description: "You need to be logged in to add items to your cart.",
      })
      return
    }
    if (!selectedVariant) return
    addItem({
      productId:    product.id,
      variantId:    selectedVariant.id,
      quantity,
      image:        mainImage?.url || "",
      userId:       user.id,
      currencyCode: currency
    })
    toast({
      title:       "Item added to cart",
      description: `${product.name} - ${selectedVariant.sku}`,
    })
  }

  const handleGoToCart = () => {
    setShowQuickView(false)
    router.push("/cart")
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (!user) {
      toast({
        title:       "Please login to add to cart",
        description: "You need to be logged in to add items to your cart.",
      })
      return
    }
    if (!selectedVariant) return

    if (isInCart) {
      updateQuantity({ userId: user.id, productId: product.id, variantId: selectedVariant.id, quantity: newQuantity, image: mainImage?.url || "" })
    }
    setQuantity(newQuantity)
  }


  const category = categories?.find(c => product.categories.includes(c.id))

  if (viewMode === "list") {
    return (
      <Link className="flex flex-col sm:flex-row border border-border-base rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-300" href={`/products/${product.slug}`}>
        <div className="relative w-full sm:w-48 h-48">
          <Image
            src={mainImage?.url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-status-info hover:bg-status-info text-text-inverted">Featured</Badge>
          )}
          {isWishlistLoading && <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 bg-bg-base/80 dark:bg-bg-inverted/50 rounded-full hover:bg-bg-base dark:hover:bg-bg-inverted z-10",
              isInWishlist && "text-red-500"
            )}
            onClick={() => onWishlistToggle?.(product.id)}
            disabled={isWishlistLoading}
          >
            <Heart className={cn(
              "h-4 w-4",
              isInWishlist && "fill-current"
            )}
            />
          </Button>}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-muted capitalize"> {product.categories.map(category => categories?.find(c => c.id === category)?.name).join(", ")}</span>
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
            <span className="font-semibold text-text-base">{formatPrice(selectedVariant?.price || 0)}</span>
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                setShowQuickView(true)
              }}
              disabled={isAddingToCart}
              className={isAddingToCart ? "btn-accent" : "btn-primary"}
            >
              {isAddingToCart ? (
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
    <>

      <div className={cn(
        "group relative",
        viewMode === 'grid' ? "flex flex-col" : "flex gap-4"
      )}
      >
        {isWishlistLoading && <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 z-10",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isInWishlist && "text-red-500"
          )}
          onClick={() => onWishlistToggle?.(product.id)}
          disabled={isWishlistLoading}
        >
          <Heart className={cn(
            "h-5 w-5",
            isInWishlist && "fill-current"
          )}
          />
        </Button>}
        <Link href={`/products/${product.slug}`}>
          {/* Product Image */}
          <div className={cn(
            "relative overflow-hidden rounded-lg",
            viewMode === 'grid' ? "aspect-square" : "w-32 h-32"
          )}
          >
            <Image
              src={mainImage?.url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-status-info hover:bg-status-info text-text-inverted">Featured</Badge>
            )}
          </div>

          {/* Product Info */}
          <div className={cn(
            "flex flex-col",
            viewMode === 'grid' ? "mt-4" : "flex-1"
          )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-muted capitalize"> {product.categories.map(category => categories?.find(c => c.id === category)?.name).join(" - ")}</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-current text-brand-accent" />
                <span className="text-xs ml-1 text-text-base">4.5</span>
              </div>
            </div>
            <h3 className="font-medium hover:underline text-text-base">{product.name}</h3>
            {category && (
              <p className="text-sm text-text-muted">{category.name}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold text-text-base">{price}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault()
                  setShowQuickView(true)
                }}
                disabled={isAddingToCart}
                className="text-text-base hover:bg-bg-subtle"
              >
                {isAddingToCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Quick View</DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <ProductDetailsSection
              product={product}
              stockStatus={getStockStatus(selectedVariant || defaultVariant)}
              selectedVariant={selectedVariant}
              isAddingToCart={isAddingToCart}
              quantity={quantity}
              onVariantSelect={setSelectedVariant}
              onAddToCart={handleAddToCart}
              onQuantityChange={handleQuantityChange}
              onGoToCart={handleGoToCart}
              onWishlistToggle={onWishlistToggle}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

