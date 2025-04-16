"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Minus, Plus, X, ShoppingBag, ArrowRight, Info } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useCartVariants } from "@/hooks/use-query"
import { VariantCart } from "@/protos/nexura"
import { toast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { getProductUrl } from "@/lib/utils"

// Shipping options
const shippingOptions = [
  { id: "free", name: "Free Shipping", price: 0, description: "7-10 business days", minOrderValue: 50 },
  { id: "standard", name: "Standard Shipping", price: 12, description: "3-5 business days" },
  { id: "express", name: "Express Shipping", price: 20, description: "1-2 business days" },
] as const

const TAX_RATE = 0.1 // 10% tax rate

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const { formatPrice, convertPrice } = useCurrency()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [shippingMethod, setShippingMethod] = useState<typeof shippingOptions[number]["id"]>("standard")
  const [shippingCost, setShippingCost] = useState(12)
  const [estimatedDelivery, setEstimatedDelivery] = useState("")
  const { data: variants } = useCartVariants(items.map((item) => item.variantId))
  const [optimisticItems, setOptimisticItems] = useState(items)
  const [optimisticVariants, setOptimisticVariants] = useState<VariantCart[] | undefined>(variants)
  console.log(JSON.stringify(items, null, 2), "items")
  // Calculate discount if promo is applied
  const discount = promoApplied ? promoDiscount : 0
  console.log(variants, "variants")
  
  // Update optimistic state when backend data changes
  useEffect(() => {
    setOptimisticItems(items)
  }, [items])

  useEffect(() => {
    setOptimisticVariants(variants)
  }, [variants])

  // Calculate subtotal using optimistic data
  const subtotal = useMemo(() => {
    return optimisticItems.reduce((total, item) => {
      const variant = optimisticVariants?.find(v => v.id === item.variantId)
      return total + ((variant?.price || 0) * item.quantity)
    }, 0)
  }, [optimisticItems, optimisticVariants])

  const total = subtotal + shippingCost - (promoApplied ? promoDiscount : 0)
  console.log(subtotal, "subtotal")

  // Update shipping cost when shipping method changes
  useEffect(() => {
    const selectedShipping = shippingOptions.find((option) => option.id === shippingMethod)
    if (!selectedShipping) return

    // Check if free shipping applies (orders over $50)
    if (selectedShipping.id === "free" && subtotal < selectedShipping.minOrderValue) {
      setShippingMethod("standard")
      setShippingCost(shippingOptions.find((option) => option.id === "standard")?.price || 0)
    } else {
      setShippingCost(selectedShipping.price)
    }

    // Calculate estimated delivery date
    const today = new Date()
    const deliveryDate = new Date(today)

    if (selectedShipping.id === "free") {
      deliveryDate.setDate(today.getDate() + 10) // 10 business days
    } else if (selectedShipping.id === "standard") {
      deliveryDate.setDate(today.getDate() + 5) // 5 business days
    } else if (selectedShipping.id === "express") {
      deliveryDate.setDate(today.getDate() + 2) // 2 business days
    }

    setEstimatedDelivery(
      deliveryDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
  }, [shippingMethod, subtotal])

  // Check if free shipping is available
  const isFreeShippingAvailable = subtotal >= 50

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "nexura10") {
      setPromoApplied(true)
      setPromoDiscount(subtotal * 0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "freeship") {
      setPromoApplied(true)
      setShippingMethod("free")
      setShippingCost(0)
      setPromoDiscount(0) // No additional discount
    } else {
      setPromoApplied(false)
      setPromoDiscount(0)
    }
  }

  const handleQuantityChange = async (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    const variant = optimisticVariants?.find(v => v.id === variantId)
    if (!variant) return

    // Check if new quantity exceeds available stock
    if (newQuantity > variant.quantity) {
      toast({
        title: "Maximum stock reached",
        description: `Only ${variant.quantity} items available`,
        variant: "destructive"
      })
      // Set quantity to maximum available if trying to add more
      newQuantity = variant.quantity
    }

    // Optimistically update the UI
    setOptimisticItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )

    try {
      // Update the backend
      await updateQuantity(productId, variantId, newQuantity)
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticItems(items)
      toast({
        title: "Error updating quantity",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleRemoveItem = async (productId: string, variantId: string) => {
    // Optimistically update the UI
    setOptimisticItems(prevItems => 
      prevItems.filter(item => 
        !(item.productId === productId && item.variantId === variantId)
      )
    )

    try {
      // Update the backend
      await removeItem(productId, variantId)
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticItems(items)
      toast({
        title: "Error removing item",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleClearCart = async () => {
    // Optimistically update the UI
    setOptimisticItems([])

    try {
      // Update the backend
      await clearCart()
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticItems(items)
      toast({
        title: "Error clearing cart",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleShippingMethodChange = (value: string) => {
    setShippingMethod(value as typeof shippingOptions[number]["id"])
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
            {optimisticItems.length > 0
              ? `You have ${optimisticItems.length} item${optimisticItems.length > 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {optimisticItems.length === 0 ? (
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

              {optimisticItems.map((item) => {
                const variant = optimisticVariants?.find(v => v.id === item.variantId)
                const isMaxStock = item.quantity >= (variant?.quantity || 0)

                return (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b">
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative w-20 h-20 border dark:border-gray-800">
                        <Image src={getProductUrl(item.image) || "/placeholder.svg"} alt="Product" fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${variant?.productSlug}`} className="font-medium hover:underline">
                          {variant?.productName}
                          <br />
                          <span className="text-sm text-muted-foreground">{variant?.attributes.map(attribute => attribute.value).join(", ")}</span>
                        </Link>
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
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity + 1)}
                          disabled={isMaxStock}
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

                  {/* Shipping Method Selection */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{formatPrice(shippingCost)}</span>
                    </div>
                    <Select value={shippingMethod} onValueChange={handleShippingMethodChange}>
                      <SelectTrigger className="w-full h-16">
                        <SelectValue placeholder="Select shipping method" />
                      </SelectTrigger>
                      <SelectContent>
                        {shippingOptions.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id}
                            disabled={option.id === "free" && !isFreeShippingAvailable && !promoApplied}
                          >
                            <div className="flex justify-between items-center gap-5 h-5">
                              <span>{option.name}</span>
                              <span className="text-muted-foreground text-sm">
                                {option.price === 0 ? "Free" : formatPrice(option.price)}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground text-left">{option.description}</p>
                            {option.id === "free" && option.minOrderValue > 0 && !promoApplied && (
                              <p className="text-xs text-muted-foreground text-left">
                                {isFreeShippingAvailable
                                  ? "Eligible for free shipping"
                                  : `Spend ${formatPrice(option.minOrderValue - subtotal)} more for free shipping`}
                              </p>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {estimatedDelivery && (
                      <p className="text-xs text-muted-foreground">Estimated delivery: {estimatedDelivery}</p>
                    )}
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600 dark:text-green-500">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 dark:text-green-500">
                      {promoCode.toLowerCase() === "nexura10"
                        ? "Promo code applied: 10% discount"
                        : "Promo code applied: Free shipping"}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Try promo codes: NEXURA10 for 10% off, FREESHIP for free shipping
                  </p>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => router.push("/checkout")}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Taxes and shipping calculated at checkout
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="font-medium">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">Visa</div>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">Amex</div>
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs">PayPal</div>
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

