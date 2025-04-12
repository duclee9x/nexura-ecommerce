"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Trash2, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

// Sample wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Urban Backpack",
    price: 120,
    image: "/placeholder.svg?height=200&width=200",
    category: "Backpacks",
    inStock: true,
  },
  {
    id: 2,
    name: "Leather Messenger Bag",
    price: 85,
    image: "/placeholder.svg?height=200&width=200",
    category: "Bags",
    inStock: true,
  },
  {
    id: 3,
    name: "Travel Water Bottle",
    price: 25,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
    inStock: false,
  },
  {
    id: 4,
    name: "Hiking Backpack",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    category: "Backpacks",
    inStock: true,
  },
]

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems)
  const { toast } = useToast()

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    })
  }

  const handleAddToCart = (id: number, name: string) => {
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <div className="flex flex-col">

      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">Items you've saved for later</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Browse our products and add items to your wishlist to save them for later.
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-square relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!item.inStock}
                    onClick={() => handleAddToCart(item.id, item.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

