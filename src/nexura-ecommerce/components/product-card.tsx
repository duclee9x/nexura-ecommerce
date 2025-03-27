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

type ProductCardProps = {
  product: {
    id: number
    name: string
    price: number
    category: string
    type: string
    colors: string[]
    rating: number
    image: string
    featured: boolean
    new: boolean
    sale: boolean
  }
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      color: product.colors[0],
    })

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    // Reset button state after a short delay
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row border dark:border-gray-800 rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="relative w-full sm:w-48 h-48">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.new && <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-500">New</Badge>}
          {product.sale && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">Sale</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-current text-yellow-400" />
                <span className="text-xs ml-1">{product.rating}</span>
              </div>
            </div>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-medium hover:underline">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 capitalize">{product.type}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            <Button size="sm" onClick={handleAddToCart} disabled={isAdding}>
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
      </div>
    )
  }

  return (
    <div className="border dark:border-gray-800 rounded-lg overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.new && <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-500">New</Badge>}
        {product.sale && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">Sale</Badge>}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground capitalize">{product.category}</span>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-current text-yellow-400" />
            <span className="text-xs ml-1">{product.rating}</span>
          </div>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium hover:underline">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          <Button size="sm" variant="ghost" onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

