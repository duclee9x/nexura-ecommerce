"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  CreditCard,
  Download,
  ArrowUpRight,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

// Sample order data
const orderData = {
  id: "123456789",
  date: "March 15, 2024",
  status: "Processing",
  items: [
    {
      id: 1,
      name: "Urban Backpack",
      price: 120,
      quantity: 1,
      color: "black",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 8,
      name: "Laptop Sleeve",
      price: 45,
      quantity: 1,
      color: "gray",
      image: "/placeholder.svg?height=300&width=300",
    },
  ],
  shipping: {
    method: "Standard Shipping",
    cost: 12,
    address: {
      name: "John Doe",
      street: "278 Treadgold Dr",
      city: "Sarasota",
      state: "FL",
      zip: "34238",
      country: "United States",
    },
    estimatedDelivery: "March 20, 2024",
    tracking: {
      number: "1Z999AA10123456784",
      carrier: "UPS",
      status: "In Transit",
      currentLocation: "Tampa, FL",
      history: [
        {
          date: "March 16, 2024",
          time: "10:30 AM",
          location: "Miami, FL",
          status: "Shipped",
          description: "Package has left the seller facility",
        },
        {
          date: "March 17, 2024",
          time: "2:45 PM",
          location: "Orlando, FL",
          status: "In Transit",
          description: "Package arrived at carrier facility",
        },
        {
          date: "March 18, 2024",
          time: "8:15 AM",
          location: "Tampa, FL",
          status: "In Transit",
          description: "Package in transit to destination",
        },
      ],
      coordinates: {
        origin: { lat: 25.7617, lng: -80.1918 }, // Miami
        current: { lat: 27.9506, lng: -82.4572 }, // Tampa
        destination: { lat: 27.3364, lng: -82.5307 }, // Sarasota
      },
    },
  },
  payment: {
    method: "Credit Card",
    last4: "4242",
    subtotal: 165,
    tax: 13.2,
    total: 190.2,
  },
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const orderId = params.id
  const order = orderData // In a real app, fetch order data based on orderId
  const [activeTab, setActiveTab] = useState("details")
  const [reviewRatings, setReviewRatings] = useState<Record<number, number>>({})
  const [reviewComments, setReviewComments] = useState<Record<number, string>>({})
  const [hoveredRatings, setHoveredRatings] = useState<Record<number, number>>({})
  const [submittingReview, setSubmittingReview] = useState(false)

  // Handle rating hover
  const handleRatingHover = (itemId: number, rating: number) => {
    setHoveredRatings((prev) => ({ ...prev, [itemId]: rating }))
  }

  // Handle rating click
  const handleRatingClick = (itemId: number, rating: number) => {
    setReviewRatings((prev) => ({ ...prev, [itemId]: rating }))
  }

  // Handle comment change
  const handleCommentChange = (itemId: number, comment: string) => {
    setReviewComments((prev) => ({ ...prev, [itemId]: comment }))
  }

  // Handle submit review
  const handleSubmitReview = (itemId: number) => {
    if (!reviewRatings[itemId]) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating for your review.",
        variant: "destructive",
      })
      return
    }

    setSubmittingReview(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      })
      setSubmittingReview(false)
    }, 1000)
  }

  // Render a review form for a product
  const renderReviewForm = (item: (typeof order.items)[0]) => (
    <div
      key={item.id}
      id={`review-item-${item.id}`}
      className="border-b dark:border-gray-800 pb-8 last:border-b-0 last:pb-0"
    >
      <div className="flex gap-4">
        <div className="relative w-20 h-20 border dark:border-gray-800 flex-shrink-0">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <p className="text-sm text-muted-foreground">
            Color: <span className="capitalize">{item.color}</span> • Quantity: {item.quantity}
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      star <= (hoveredRatings[item.id] || reviewRatings[item.id] || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    onMouseEnter={() => handleRatingHover(item.id, star)}
                    onMouseLeave={() => handleRatingHover(item.id, 0)}
                    onClick={() => handleRatingClick(item.id, star)}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {reviewRatings[item.id]
                    ? reviewRatings[item.id] === 5
                      ? "Excellent"
                      : reviewRatings[item.id] === 4
                        ? "Very Good"
                        : reviewRatings[item.id] === 3
                          ? "Good"
                          : reviewRatings[item.id] === 2
                            ? "Fair"
                            : "Poor"
                    : "Select a rating"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                placeholder="What did you like or dislike about this product? How was the quality? Would you recommend it to others?"
                rows={4}
                value={reviewComments[item.id] || ""}
                onChange={(e) => handleCommentChange(item.id, e.target.value)}
              />
            </div>

            <Button onClick={() => handleSubmitReview(item.id)} disabled={submittingReview}>
              {submittingReview ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 mb-4"
          onClick={() => router.push("/orders")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Orders
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 dark:text-white">Order #{order.id}</h1>
            <p className="text-muted-foreground">Placed on {order.date}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Invoice
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              Track Order
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="tracking">Tracking & Delivery</TabsTrigger>
          <TabsTrigger value="reviews">Reviews & Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Order Status */}
              <div className="border dark:border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Order Status: {order.status}</h2>
                    <p className="text-muted-foreground">Estimated delivery: {order.shipping.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

                  <div className="relative flex items-start mb-8 pl-12">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Order Confirmed</h3>
                      <p className="text-sm text-muted-foreground">March 15, 2024 at 10:30 AM</p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-8 pl-12">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Processing</h3>
                      <p className="text-sm text-muted-foreground">March 16, 2024 at 9:15 AM</p>
                    </div>
                  </div>

                  <div className="relative flex items-start pl-12">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Shipped</h3>
                      <p className="text-sm text-muted-foreground">Estimated: March 18, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border dark:border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Order Items</h2>

                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b dark:border-gray-800 last:border-0 last:pb-0"
                    >
                      <div className="relative w-20 h-20 border dark:border-gray-800 flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground mr-2">Qty: {item.quantity}</span>
                          <span className="text-sm text-muted-foreground mr-2">•</span>
                          <span className="text-sm text-muted-foreground mr-2">Color:</span>
                          <span
                            className={`w-4 h-4 rounded-full bg-${
                              item.color === "black" ? "black" : item.color === "gray" ? "gray-400" : "blue-600"
                            }`}
                          ></span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            Buy Again
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setActiveTab("reviews")
                              setTimeout(() => {
                                document
                                  .getElementById(`review-item-${item.id}`)
                                  ?.scrollIntoView({ behavior: "smooth" })
                              }, 100)
                            }}
                          >
                            Review Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border dark:border-gray-800 rounded-lg p-6 space-y-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.payment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${order.shipping.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.payment.tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.payment.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-start gap-3 mb-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.payment.method} ending in {order.payment.last4}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="font-medium">Need Help?</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="returns" className="border-b-0">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm font-medium">Returns & Refunds</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          If you're not satisfied with your purchase, you can return it within 30 days for a full
                          refund.
                        </p>
                        <Button variant="link" className="px-0 h-auto text-sm mt-2">
                          Start a Return
                        </Button>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="issues" className="border-b-0">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm font-medium">Order Issues</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Having problems with your order? Our customer service team is here to help.
                        </p>
                        <Button variant="link" className="px-0 h-auto text-sm mt-2">
                          Contact Support
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tracking">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Interactive Map */}
              <div className="border dark:border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Shipment Tracking</h2>
                <div className="aspect-video relative rounded-md overflow-hidden border mb-4">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d896868.9769959519!2d-82.45719016257464!3d26.84903582337489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!3m2!1d25.7616798!2d-80.1917902!4m5!1s0x88c2b7886162c219%3A0xa7f78e9cfd8a2dc8!2sSarasota%2C%20FL!3m2!1d27.336435!2d-82.5308119!5e0!3m2!1sen!2sus!4v1710866400000!5m2!1sen!2sus`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Current Status: {order.shipping.tracking.status}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated:{" "}
                          {order.shipping.tracking.history[order.shipping.tracking.history.length - 1].date} at{" "}
                          {order.shipping.tracking.history[order.shipping.tracking.history.length - 1].time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground">Tracking Number:</div>
                    <div className="font-medium">{order.shipping.tracking.number}</div>
                    <div className="text-sm text-muted-foreground">({order.shipping.tracking.carrier})</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                        <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Origin</div>
                        <div className="font-medium">Miami, FL</div>
                      </div>
                    </div>
                    <div className="flex-1 mx-4 h-0.5 bg-gray-200 dark:bg-gray-800 relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-green-500" style={{ width: "50%" }}></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Destination</div>
                        <div className="font-medium">Sarasota, FL</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="font-medium">Tracking History</h3>
                  <div className="space-y-4">
                    {order.shipping.tracking.history.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 relative">
                          <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          {index < order.shipping.tracking.history.length - 1 && (
                            <div className="absolute top-4 bottom-0 left-1/2 w-0.5 -ml-px h-full bg-gray-200 dark:bg-gray-700"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{event.status}</h4>
                            <span className="text-sm text-muted-foreground">
                              {event.date}, {event.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-sm font-medium mt-1">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping & Delivery */}
              <div className="border dark:border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Shipping & Delivery</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Shipping Address</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping.address.name}
                          <br />
                          {order.shipping.address.street}
                          <br />
                          {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zip}
                          <br />
                          {order.shipping.address.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Shipping Method</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.shipping.method}
                          <br />
                          Estimated delivery: {order.shipping.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border dark:border-gray-800 rounded-lg p-6 space-y-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.payment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${order.shipping.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.payment.tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.payment.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-start gap-3 mb-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.payment.method} ending in {order.payment.last4}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-8">
            <div className="border dark:border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Review Your Purchase</h2>
              <p className="text-muted-foreground mb-6">
                Share your experience with the products you purchased. Your feedback helps other customers make better
                decisions.
              </p>

              <div className="space-y-8">{order.items.map((item) => renderReviewForm(item))}</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

