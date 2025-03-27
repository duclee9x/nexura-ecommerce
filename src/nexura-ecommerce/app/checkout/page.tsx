"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample addresses for demo
const savedAddresses = [
  {
    id: 1,
    name: "Home",
    street: "278 Treadgold Dr",
    city: "Sarasota",
    state: "FL",
    zip: "34238",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    name: "Work",
    street: "1250 Broadway Ave, Suite 300",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: false,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = shippingMethod === "express" ? 20 : 12
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      // Generate a random order number
      const orderNumber = Math.floor(100000000 + Math.random() * 900000000)

      // Clear the cart
      clearCart()

      // Redirect to success page with order number
      router.push(`/checkout/success?order=${orderNumber}`)
    }, 2000)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/cart")}>
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Button>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="border dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

            <RadioGroup
              value={String(selectedAddress)}
              onValueChange={(value) => setSelectedAddress(Number(value))}
              className="space-y-4"
            >
              {savedAddresses.map((address) => (
                <div key={address.id} className="flex items-start space-x-3 border dark:border-gray-800 rounded-lg p-4">
                  <RadioGroupItem value={String(address.id)} id={`address-${address.id}`} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={`address-${address.id}`} className="font-medium">
                      {address.name}
                      {address.isDefault && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {address.street}, {address.city}, {address.state} {address.zip}, {address.country}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border dark:border-gray-800 border-dashed rounded-lg p-4 text-center">
                <RadioGroupItem value="new" id="address-new" className="sr-only" />
                <Label htmlFor="address-new" className="cursor-pointer block py-2">
                  <span className="text-primary">+ Add a new address</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Shipping Method */}
          <div className="border dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Method</h2>

            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
              <div className="flex items-start space-x-3 border dark:border-gray-800 rounded-lg p-4">
                <RadioGroupItem value="standard" id="shipping-standard" className="mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor="shipping-standard" className="font-medium">
                      Standard Shipping
                    </Label>
                    <span className="font-medium">$12.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Delivery in 3-5 business days</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border dark:border-gray-800 rounded-lg p-4">
                <RadioGroupItem value="express" id="shipping-express" className="mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor="shipping-express" className="font-medium">
                      Express Shipping
                    </Label>
                    <span className="font-medium">$20.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Delivery in 1-2 business days</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="border dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>

            <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
              </TabsList>

              <TabsContent value="credit-card" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" className="mt-1" />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-1" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">Visa</div>
                    <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                    <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs">Amex</div>
                  </div>
                  <span className="text-sm text-muted-foreground">All transactions are secure and encrypted.</span>
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-blue-600">PayPal</span>
                </div>
                <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your payment.</p>
                <Button>Continue with PayPal</Button>
              </TabsContent>

              <TabsContent value="apple-pay" className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">Pay</span>
                </div>
                <p className="text-muted-foreground mb-4">Complete your purchase with Apple Pay.</p>
                <Button variant="outline" className="bg-black text-white hover:bg-gray-800">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 9.5C6 8.12 6.5 6.8 7.4 5.9C8.2 5.1 9.4 4.5 10.7 4.5C11.5 4.5 12.3 4.8 13 5.3C13.7 4.8 14.5 4.5 15.3 4.5C16.6 4.5 17.8 5.1 18.6 5.9C19.5 6.8 20 8.12 20 9.5C20 11.11 19.41 12.59 18.44 13.73C17.52 14.84 16.28 15.74 15 16.31L13 17.07L11 16.31C9.72 15.74 8.48 14.84 7.56 13.73C6.59 12.59 6 11.11 6 9.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  Pay
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Billing Address */}
          <div className="border dark:border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Billing Address</h2>

            <RadioGroup defaultValue="same" className="space-y-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="same" id="billing-same" className="mt-1" />
                <div>
                  <Label htmlFor="billing-same">Same as shipping address</Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <RadioGroupItem value="different" id="billing-different" className="mt-1" />
                <div>
                  <Label htmlFor="billing-different">Use a different billing address</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border dark:border-gray-800 rounded-lg p-6 space-y-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <Accordion type="single" collapsible defaultValue="items">
              <AccordionItem value="items" className="border-none">
                <AccordionTrigger className="py-2">
                  <span className="font-medium">
                    {items.length} item{items.length > 1 ? "s" : ""}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 border dark:border-gray-800 flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          {item.color && (
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-muted-foreground mr-1">Color:</span>
                              <span
                                className={`w-3 h-3 rounded-full bg-${
                                  item.color === "black" ? "black" : item.color === "gray" ? "gray-400" : "blue-600"
                                }`}
                              ></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" onClick={handlePlaceOrder} disabled={isProcessing}>
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              By placing your order, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

