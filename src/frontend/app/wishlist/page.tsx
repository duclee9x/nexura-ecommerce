"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/contexts/wishlist-context"
import ProductHooks from "@/hooks/product-hooks"
import { useCurrency } from "@/contexts/currency-context"
import { useSession } from "@/contexts/session-context"
import { useRouter } from "next/navigation"

// Sample wishlist data
// const wishlistItems = [
//   {
//     id: 1,
//     name: "Urban Backpack",
//     price: 120,
//     image: "/placeholder.svg?height=200&width=200",
//     category: "Backpacks",
//     inStock: true,
//   },
//   {
//     id: 2,
//     name: "Leather Messenger Bag",
//     price: 85,
//     image: "/placeholder.svg?height=200&width=200",
//     category: "Bags",
//     inStock: true,
//   },
//   {
//     id: 3,
//     name: "Travel Water Bottle",
//     price: 25,
//     image: "/placeholder.svg?height=200&width=200",
//     category: "Accessories",
//     inStock: false,
//   },
//   {
//     id: 4,
//     name: "Hiking Backpack",
//     price: 150,
//     image: "/placeholder.svg?height=200&width=200",
//     category: "Backpacks",
//     inStock: true,
//   },
// ]

export default function WishlistPage() {
  const { wishlistItems } = useWishlist()
  const { useRemoveWishlist } = ProductHooks()
  const { mutateAsync: removeWishlist } = useRemoveWishlist
  const { formatPrice } = useCurrency()
  const { toast } = useToast()
  const { user } = useSession()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleRemoveItem = (id: string) => {
    removeWishlist({ wishlistId: id, userId: user.id })
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    })
  }


  return (
    <div className="flex flex-col">

      <main className="flex-1 container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">Items you've saved for later</p>
        </div>

        {wishlistItems.length === 0 ? (
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
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden relative">
                <Button
                      variant="ghost"
                      size="icon"
                      className="absolute z-10 top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/100"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                <Link href={`/products/${item.productSlug}`}>
                  <div className="relative">
                    <div className="aspect-square relative">
                      <Image src={item.productImage || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold truncate">{item.productName}</h3>
                      <p className="font-medium">{formatPrice(item.productPrice)}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

