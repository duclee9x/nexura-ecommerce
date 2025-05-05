"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Minus, Plus, X, ShoppingBag, ArrowRight, Info, Loader2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import CartHooks from "@/hooks/cart-hooks"
import { useCurrency } from "@/contexts/currency-context"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSession } from "@/contexts/session-context"
import { useIsMutating, useIsFetching } from "@tanstack/react-query"
import Stripe from "@/public/stripe.png"
import Vnpay from "@/public/vnpay.webp"
import CashOnDelivery from "@/public/cod.png"


export default function CartPage() {
  const router = useRouter()
  const { useGetVariants } = CartHooks()
  const { items, isLoading: isCartLoading, } = useCart()
  const { formatPrice } = useCurrency()
  const { useUpdateItem, useRemoveItem, useClearCart } = CartHooks()
  const { mutateAsync: updateQuantity } = useUpdateItem
  const { mutateAsync: removeItem } = useRemoveItem
  const { mutateAsync: clearCart } = useClearCart
  const { data: variants } = useGetVariants(items.map((item) => item.variantId))
  const isUpdatingQuantity = useIsMutating({ mutationKey: ["updateQuantity"] })
  const isUpdatingVariants = useIsFetching({ queryKey: ["cartVariants"] })
  const { user } = useSession()

  // Calculate subtotal using optimistic data
  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const variant = variants?.find(v => v.id === item.variantId)
      return total + ((variant?.price || 0) * item.quantity)
    }, 0)
  }, [items, variants])

  // Show loader while initial data is being fetched
  if (isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    )
  }

  const handleQuantityChange = async (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    if (!user || !user.id) return
    const variant = variants?.find(v => v.id === variantId)
    if (!variant) return

    // Check if new quantity exceeds available stock
    if (variant.stock && newQuantity > variant.stock.quantity) {
      toast({
        title: "Maximum stock reached",
        description: `Only ${variant.stock.quantity} items available`,
        variant: "destructive"
      })
      // Set quantity to maximum available if trying to add more
      newQuantity = variant.stock.quantity
    }

    try {
      // Update the backend
      await updateQuantity({
        userId: user.id,
        productId,
        variantId,
        quantity: newQuantity,
        image: ""
      })
    } catch (error) {
      toast({
        title: "Error updating quantity",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = async (productId: string, variantId: string) => {
    if (!user || !user.id) return
    try {
      await removeItem({ userId: user.id, productId, variantId })
    } catch (error) {
      // Revert optimistic update on error
      toast({
        title: "Error removing item",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleClearCart = async () => {
    if (!user || !user.id) return
    try {
      await clearCart(user.id)
    } catch (error) {
      // Revert optimistic update on error
      toast({
        title: "Error clearing cart",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    }
  }
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Your Cart</h1>
          <p className="text-muted-foreground">
            {items.length > 0
              ? `You have ${items.length} item${items.length > 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Button onClick={() => router.push("/products")} className="mt-4">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm text-muted-foreground py-2 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="relative space-y-2">
                {items.sort((a, b) => a.id.localeCompare(b.id)).map((item) => {
                  const variant = variants?.find(v => v.id === item.variantId)
                  const isMaxStock = item.quantity >= (variant?.stock?.quantity || 0)

                  return (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="relative aspect-square w-20 h-20 border dark:border-gray-800 rounded-md overflow-hidden">
                          <Image 
                            src={item.image || "/no-image-placeholder.webp"} 
                            alt="Product" 
                            fill 
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${variant?.productSlug}`} className="font-medium hover:underline">
                            {variant?.productName}
                            <br />
                            <span className="text-sm text-muted-foreground">{variant?.attributes.map(attribute => attribute.value).join(", ")}</span>
                          </Link>
                        </div>
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-muted-foreground hover:text-destructive mt-1"
                            onClick={() => handleRemoveItem(item.productId, item.variantId)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdatingQuantity > 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity + 1)}
                            disabled={isMaxStock || isUpdatingQuantity > 0}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        {isMaxStock && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Maximum stock reached</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>

                      <div className="col-span-2 text-center">{formatPrice(variant?.price || 0)}</div>

                      <div className="col-span-2 text-right font-medium">
                        {formatPrice((variant?.price || 0) * item.quantity)}
                      </div>

                    </div>
                  )
                })}
                {(isUpdatingQuantity + isUpdatingVariants > 0) &&  <div className="absolute right-0 top-0 z-9999 h-full w-full flex items-center justify-center bg-background/90 opacity-50"><Loader2 className="animate-spin" /></div>}
              </div>
              <div className="flex justify-between items-center pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Clear Cart</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all items from your cart. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearCart}>Clear Cart</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button variant="outline" onClick={() => router.push("/products")}>
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border dark:border-gray-800 rounded-lg p-6 space-y-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => router.push("/checkout")}
                    disabled={items.length === 0 || (isUpdatingQuantity + isUpdatingVariants > 0)}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Total cost and shipping calculated at checkout
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="font-medium">We process payment with</h3>
                  <div className="flex gap-6">
                    <div className="w-1/3 h-16 bg-muted rounded flex items-center justify-center text-xs p-2">
                      <div className="relative w-full h-full">
                        <Image 
                          src={Stripe} 
                          alt="Stripe" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-1/3 h-16 bg-muted rounded flex items-center justify-center text-xs p-2">
                      <div className="relative w-full h-full">
                        <Image 
                          src={Vnpay} 
                          alt="VNPay" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-1/3 h-16 bg-muted rounded flex items-center justify-center text-xs p-2">
                      <div className="relative w-full h-full">
                        <Image 
                          src={CashOnDelivery} 
                          alt="Cash on Delivery" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

