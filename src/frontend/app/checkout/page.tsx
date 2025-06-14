"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, X, CreditCard, Wallet, Banknote } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useSession } from "@/contexts/session-context"
import { useCurrency } from "@/contexts/currency-context"
import type { CreateOrderRequest, CreateSagaOrderRequest } from "@nexura/grpc_gateway/protos"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AddressTab from "@/app/profile/tabs/address-tab"
import { toast } from "@/components/ui/use-toast"
import { ExtendedAddressType } from "@/app/checkout/order.type"
import OrderHooks from "@/hooks/order-hooks"
import CartHooks from "@/hooks/cart-hooks"

export default function CheckoutPage() {
  const { useCreateOrderWorkflow } = OrderHooks()
  const { mutateAsync: createOrderWorkflow } = useCreateOrderWorkflow
  const router = useRouter()
  const { items } = useCart()
  const { useGetVariants, useClearCart } = CartHooks()
  const { mutateAsync: clearCart } = useClearCart
  const { user } = useSession()
  const { cartId } = useCart()
  const { formatPrice, currency } = useCurrency()
  const [ paymentMethod, setPaymentMethod ] = useState<"STRIPE" | "VNPAY" | "COD">("COD")
  const [ shippingMethod, setShippingMethod ] = useState("standard")
  const [ isProcessing, setIsProcessing ] = useState(false)
  const [ address, setAddress ] = useState<ExtendedAddressType | null>(null)
  const [ subtotal, setSubtotal ] = useState(0)
  const [ shipping, setShipping ] = useState(0)
  const [ orderTotal, setOrderTotal ] = useState(0)
  const { data: variants } = useGetVariants(items.map(item => item.variantId))
  const [ coupons, setCoupons ] = useState<{ code: string, discount: number }[]>([])
  const [ newCoupon, setNewCoupon ] = useState("")

 
  const variantsPrice = useMemo(() => 
    items.map((item) => {
      const variant = variants?.find(v => v.id === item.variantId);
      return {
        id:          item.variantId,
        price:       variant?.price || 0,
        quantity:    item.quantity,
        variantName: variant?.variantName || "",
        productName: variant?.productName || "",
        productSlug: variant?.productSlug || "",
        image:       variant?.image || "",
        sku:         variant?.sku || "",
        variantId:   item.variantId,
      };
    }),
  [ items, variants ])

  useEffect(() => {
    const shipping = shippingMethod === "express" ? 20 : 12
    const total = items.reduce((acc, item) => acc + (variants?.find(v => v.id === item.variantId)?.price || 0) * item.quantity, 0)
    const orderTotal = total + shipping

    setShipping(shipping)
    setSubtotal(total)
    setOrderTotal(orderTotal)
  }, [
    shippingMethod, items, variants
  ])

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!address) {
      toast({
        title:       "Error",
        description: "Please select an address",
      })
      return
    }

    if (cartId === undefined) {
      toast({
        title:       "Error",
        description: "Cart not found",
      })
      return
    }

    setIsProcessing(true)
    const order: CreateOrderRequest = {
      userId: user.id,
      cartId: cartId,
      items:  items.map((item) => {
        const variant = variants?.find(v => v.id === item.variantId);
        if (!variant) {
          throw new Error(`Variant not found: ${item.variantId}`);
        }
        return {
          id:          item.variantId,
          productId:   item.variantId, // We'll use variantId as both since that's what the validation expects
          variantId:   item.variantId,
          quantity:    item.quantity,
          price:       variant.price,
          productName: variant.productName || "",
          productSlug: variant.productSlug || "",
          variantName: variant.variantName || "",
          image:       variant.image || "",
          sku:         variant.sku || "",
        };
      }),
      coupons: coupons.map(coupon => ({
        code:     coupon.code,
        discount: coupon.discount,
      })),
      currencyCode:    currency,
      paymentMethod:   paymentMethod,
      paymentSubtotal: subtotal,
      paymentTotal:    orderTotal - coupons.reduce((acc, c) => acc + c.discount, 0),
      shippingMethod:  shippingMethod,
      shippingCost:    shipping,
      shippingAddress: address,
    }

    try {
      const result = await createOrderWorkflow(order)
      console.log("result", result)
      if (result.instanceID) {
        await clearCart(user.id)
        router.push(`/checkout/processing?instanceID=${result.instanceID}`)
      } else {
        toast({
          title:       "Error",
          description: "Failed to create order",
        })
      }
    } catch (error) {
      toast({
        title:       "Error",
        description: "Failed to create order",
      })
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleApplyCoupon = () => {
    if (!newCoupon) return

    // Example coupon logic - replace with actual API call
    const discount = newCoupon.toLowerCase() === "nexura10" ? 0.1 : 
      newCoupon.toLowerCase() === "freeship" ? shipping : 0

    if (discount > 0) {
      setCoupons([ ...coupons, { code: newCoupon, discount } ])
      setNewCoupon("")
    }
  }

  const handleRemoveCoupon = (code: string) => {
    setCoupons(coupons.filter(c => c.code !== code))
  }
  if (!user) {
    router.push("/login")
    return null
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/cart")}>
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Button>
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Address Component */}
          <Tabs defaultValue="addresses">
            <AddressTab 
              type="checkout" 
              user={user} 
              setAddress={setAddress} 
              currentAddress={address}
            />
          </Tabs>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Method</CardTitle>
              <CardDescription>Choose your preferred shipping method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={`cursor-pointer ${shippingMethod === "standard" ? "bg-primary/5" : ""}`} onClick={() => setShippingMethod("standard")}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Standard Shipping</h3>
                          <p className="text-sm text-muted-foreground">Delivery in 3-5 business days</p>
                        </div>
                        <RadioGroupItem value="standard" id="shipping-standard" />
                      </div>
                      <p className="text-sm font-medium mt-2">{formatPrice(12)}</p>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer ${shippingMethod === "express" ? "bg-primary/5" : ""}`} onClick={() => setShippingMethod("express")}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Express Shipping</h3>
                          <p className="text-sm text-muted-foreground">Delivery in 1-2 business days</p>
                        </div>
                        <RadioGroupItem value="express" id="shipping-express" />
                      </div>
                      <p className="text-sm font-medium mt-2">{formatPrice(20)}</p>
                    </CardContent>
                  </Card>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Coupon Section */}
          <Card>
            <CardHeader>
              <CardTitle>Coupons</CardTitle>
              <CardDescription>Apply coupons to get discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter coupon code" 
                    value={newCoupon} 
                    onChange={e => setNewCoupon(e.target.value)}
                  />
                  <Button onClick={handleApplyCoupon}>Apply</Button>
                </div>

                {coupons.length > 0 && (
                  <div className="space-y-2">
                    {coupons.map(coupon => (
                      <div key={coupon.code} className="flex items-center justify-between bg-muted p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{coupon.code}</span>
                          <span className="text-sm text-green-600">
                            -{formatPrice(coupon.discount)}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveCoupon(coupon.code)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Try promo codes: NEXURA10 for 10% off, FREESHIP for free shipping
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="items">
                <AccordionItem value="items" className="border-none">
                  <AccordionTrigger className="py-2">
                    <span className="font-medium">
                      {items.length} item{items.length > 1 ? "s" : ""}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pr-2">
                      {items.map(item => (
                        <div key={item.id} className="flex gap-3 justify-center items-center">
                          <div className="relative w-16 h-16 border flex-shrink-0">
                            <Image 
                              src={item.image || "/no-image-placeholder.webp"} 
                              alt={variants?.find(v => v.id === item.variantId)?.variantName || "Unknown"} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium text-sm">{variants?.find(v => v.id === item.variantId)?.productName}</p>
                              <p className="font-bold text-sm">{formatPrice(variantsPrice.find(v => v.id === item.variantId)?.price || 0)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            {variants && item.variantId && (
                              <p className="text-sm text-muted-foreground">Variant: {variants.find(v => v.id === item.variantId)?.variantName}</p>
                            )}
                            <p className="text-sm py-1">Price: {formatPrice(variants?.find(v => v.id === item.variantId)?.price || 0)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>

                {coupons.map(coupon => (
                  <div key={coupon.code} className="flex justify-between text-green-600">
                    <span>Coupon ({coupon.code})</span>
                    <span>-{formatPrice(coupon.discount)}</span>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal - coupons.reduce((acc, c) => acc + c.discount, 0))}</span>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={value => setPaymentMethod(value as "STRIPE" | "VNPAY" | "COD")}
                  className="space-y-3"
                >
                  <div className={`flex items-center space-x-3 rounded-lg border p-4 hover:border-primary cursor-pointer ${paymentMethod === "STRIPE" ? "bg-primary/5" : ""}`} onClick={() => {}}>
                    <RadioGroupItem disabled={true} value="STRIPE" id="STRIPE" />
                    <Label htmlFor="STRIPE" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-5 w-5" />
                      <span>Global payment gateway (Stripe)</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 rounded-lg border p-4 hover:border-primary cursor-pointer ${paymentMethod === "VNPAY" ? "bg-primary/5" : ""}`} onClick={() => {}}>
                    <RadioGroupItem disabled={true} value="VNPAY" id="VNPAY" />
                    <Label htmlFor="VNPAY" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="h-5 w-5" />
                      <span>Vietnam payment gateway (VNPay)</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 rounded-lg border p-4 hover:border-primary cursor-pointer ${paymentMethod === "COD" ? "bg-primary/5" : ""}`} onClick={() => setPaymentMethod("COD")}>
                    <RadioGroupItem value="COD" id="COD" />
                    <Label htmlFor="COD" className="flex items-center gap-2 cursor-pointer">
                      <Banknote className="h-5 w-5" />
                      <span>Cash on Delivery</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full mt-6" onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                      </circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      >
                      </path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                By placing your order, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

