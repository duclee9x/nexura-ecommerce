"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  CreditCard,
  Star,
  AlertCircle,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import OrderHooks from "@/hooks/order-hooks"
import type { OrderItem, OrderStatus, TrackingEvent } from "@nexura/grpc_gateway/protos"
import { useCurrency } from "@/contexts/currency-context"
const mapOrderStatus = (status: OrderStatus) => {
  return status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
}
// Define types for the review state
type ReviewState = {
  ratings:        Record<string, number>;
  comments:       Record<string, string>;
  hoveredRatings: Record<string, number>;
}


export default function OrderDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const { useGetOrder } = OrderHooks()
  const { formatPrice, formatDate } = useCurrency()
  const { data: order, isPending } = useGetOrder(id as string)
  const [ activeTab, setActiveTab ] = useState("details")
  const [ reviewState, setReviewState ] = useState<ReviewState>({
    ratings:        {},
    comments:       {},
    hoveredRatings: {}
  })
  const [ submittingReview, setSubmittingReview ] = useState(false)

  // Handle rating hover
  const handleRatingHover = (itemId: string, rating: number) => {
    setReviewState(prev => ({
      ...prev,
      hoveredRatings: { ...prev.hoveredRatings, [itemId]: rating }
    }))
  }

  // Handle rating click
  const handleRatingClick = (itemId: string, rating: number) => {
    setReviewState(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [itemId]: rating }
    }))
  }

  // Handle comment change
  const handleCommentChange = (itemId: string, comment: string) => {
    setReviewState(prev => ({
      ...prev,
      comments: { ...prev.comments, [itemId]: comment }
    }))
  }

  // Handle submit review
  const handleSubmitReview = (itemId: string) => {
    if (!reviewState.ratings[itemId]) {
      toast({
        title:       "Rating Required",
        description: "Please select a star rating for your review.",
        variant:     "destructive",
      })
      return
    }

    setSubmittingReview(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title:       "Review Submitted",
        description: "Thank you for your feedback!",
      })
      setSubmittingReview(false)
    }, 1000)
  }

  if (isPending) {
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
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
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
                {/* Order Status Skeleton */}
                <div className="border dark:border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    {[
                      1, 2, 3
                    ].map(i => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items Skeleton */}
                <div className="border dark:border-gray-800 rounded-lg p-6">
                  <Skeleton className="h-8 w-32 mb-6" />
                  <div className="space-y-6">
                    {[ 1, 2 ].map(i => (
                      <div key={i} className="flex gap-4 pb-6 border-b dark:border-gray-800 last:border-0 last:pb-0">
                        <Skeleton className="w-20 h-20" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-5 w-20" />
                          </div>
                          <div className="space-y-2 mt-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Skeleton */}
              <div className="lg:col-span-1">
                <div className="border dark:border-gray-800 rounded-lg p-6 space-y-6 sticky top-8">
                  <Skeleton className="h-8 w-32 mb-4" />
                  <div className="space-y-3">
                    {[
                      1, 2, 3
                    ].map(i => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (!order) {
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
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find an order with the provided order number. Please check your order number and try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/orders">View All Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Render a review form for a product
  const renderReviewForm = (item: OrderItem) => (
    <div
      key={item.variantId}
      id={`review-item-${item.variantId}`}
      className="border-b dark:border-gray-800 pb-8 last:border-b-0 last:pb-0"
    >
      <div className="flex gap-4">
        <div className="relative w-20 h-20 border dark:border-gray-800 flex-shrink-0">
          <Image src={item.image || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{item.productName}</h3>
          <p className="text-sm text-muted-foreground">
            Color: <span className="capitalize">{item.variantName}</span> •
          </p>
          <p>Quantity: {item.quantity}</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <div className="flex items-center">
                {[
                  1, 2, 3, 4, 5
                ].map(star => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-colors ${star <= (reviewState.hoveredRatings[item.id] || reviewState.ratings[item.id] || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                    }`}
                    onMouseEnter={() => handleRatingHover(item.id, star)}
                    onMouseLeave={() => handleRatingHover(item.id, 0)}
                    onClick={() => handleRatingClick(item.id, star)}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {reviewState.ratings[item.id]
                    ? reviewState.ratings[item.id] === 5
                      ? "Excellent"
                      : reviewState.ratings[item.id] === 4
                        ? "Very Good"
                        : reviewState.ratings[item.id] === 3
                          ? "Good"
                          : reviewState.ratings[item.id] === 2
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
                value={reviewState.comments[item.id] || ""}
                onChange={e => handleCommentChange(item.id, e.target.value)}
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
            <h1 className="text-3xl font-bold mb-1 dark:text-white">Order #{order.id.slice(0, 8)}</h1>
            <p className="text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
          </div>
          {/* <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Invoice
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              Track Order
            </Button>
          </div> */}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger disabled={order.status !== "ORDER_SHIPPED"} value="tracking">Tracking & Delivery</TabsTrigger>
          <TabsTrigger disabled={order.status !== "ORDER_COMPLETED"} value="reviews">Reviews & Feedback</TabsTrigger>
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
                    <h2 className="text-xl font-bold">{mapOrderStatus(order.status)}</h2>
                    <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

                  {order.statusHistory?.map((history, index) => (
                    <div key={history.id} className="relative flex items-start mb-8 pl-12">
                      <div className={`absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                        index === 0 
                          ? 'bg-primary' 
                          : index === order.statusHistory.length - 1 && order.status === history.status
                            ? 'bg-primary'
                            : 'bg-gray-200 dark:bg-gray-800'
                      }`}
                      >
                        {index === 0 ? (
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        ) : history.status === 'ORDER_SHIPPED' ? (
                          <Truck className="h-4 w-4 text-muted-foreground" />
                        ) : history.status === 'ORDER_DELIVERED' ? (
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Package className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{mapOrderStatus(history.status)}</h3>
                        <p className="text-sm text-muted-foreground">{history.description || 'Status updated'}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(history.createdAt)}</p>
                      </div>
                    </div>
                  ))}

                  {order.status === 'ORDER_SHIPPED' && order.shipping?.estimatedDelivery && (
                    <div className="relative flex items-start pl-12">
                      <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">Estimated Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.shipping.estimatedDelivery)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="border dark:border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Order Items</h2>

                <div className="space-y-6">
                  {order.items.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b dark:border-gray-800 last:border-0 last:pb-0"
                    >
                      <div className="relative w-20 h-20 border dark:border-gray-800 flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/products/${item.productSlug}`} className="font-medium hover:underline">
                            {item.productName}
                          </Link>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground mr-2">Qty: {item.quantity}</span>
                          <span className="text-sm text-muted-foreground mr-2">•</span>
                          <span className="text-sm text-muted-foreground mr-2">Variant:</span>
                          <span className="text-sm text-muted-foreground">{item.variantName}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Price: {formatPrice(item.price)}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            Buy Again
                          </Button>
                          {order.status === "ORDER_COMPLETED" && (
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
                          )}
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
                    <span>{formatPrice(order.items.reduce((acc, item) => acc + item.price * item.quantity, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(order.shipping?.cost || 0)}</span>
                  </div>


                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-start gap-3 mb-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.payment?.method}
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
                        {order.status === "ORDER_COMPLETED" && (
                          <Button variant="link" className="px-0 h-auto text-sm mt-2">
                            Start a Return
                          </Button>
                        )}
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
                  >
                  </iframe>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Current Status: {mapOrderStatus(order.status)}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground">Tracking Number:</div>
                    <div className="font-medium">{order.shipping?.tracking?.number || "Not available"}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                        <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Shipping Address</div>
                        <div className="font-medium">
                          {order.shipping?.shippingAddress && (
                            <>
                              <p>{order.shipping.shippingAddress.street}</p>
                              {order.shipping.shippingAddress.countryName === "Vietnam" ? (
                                <p>
                                  {order.shipping.shippingAddress.vnWardName}, {order.shipping.shippingAddress.vnDistrictName}, {order.shipping.shippingAddress.vnProvinceName}
                                </p>
                              ) : (
                                <p>
                                  {order.shipping.shippingAddress.city}, {order.shipping.shippingAddress.state} {order.shipping.shippingAddress.zip}
                                </p>
                              )}
                              <p>{order.shipping.shippingAddress.countryName}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {order.shipping?.tracking?.history && order.shipping.tracking.history.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Tracking History</h3>
                      <div className="space-y-4">
                        {order.shipping.tracking.history.map((event: TrackingEvent, index: number) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{event.status}</p>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(`${event.date}T${event.time}`)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border dark:border-gray-800 rounded-lg p-6 space-y-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Method</h3>
                    <p className="text-muted-foreground">{order.shipping?.method || "Standard Shipping"}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Estimated Delivery</h3>
                    <p className="text-muted-foreground">
                      {order.shipping?.estimatedDelivery 
                        ? formatDate(order.shipping.estimatedDelivery)
                        : "Not available"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Shipping Cost</h3>
                    <p className="text-muted-foreground">{formatPrice(order.shipping?.cost || 0)}</p>
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

              <div className="space-y-8">{order.items.map(item => renderReviewForm(item))}</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

