"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, Truck, Clock, Loader2, AlertCircle } from "lucide-react"
import OrderHooks from "@/hooks/order-hooks"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/contexts/currency-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const { formatDate } = useCurrency()
  
  const { useGetOrder } = OrderHooks()
  const { data: order, isPending } = useGetOrder(orderNumber)

  if (!orderNumber) {
    return null
  }

  

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
            </div>
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Loading Order Details</h1>
            <p className="text-muted-foreground">
              Please wait while we fetch your order information...
            </p>
          </div>

          <div className="border dark:border-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h2>
                <Skeleton className="h-6 w-24" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h2>
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Estimated Delivery</h2>
                <Skeleton className="h-6 w-32" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h2>
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>

          <div className="border dark:border-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <div className="space-y-8">
              {[
                1, 2, 3, 4
              ].map(i => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
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

  const estimatedDelivery = order.shipping?.estimatedDelivery ? formatDate(order.shipping.estimatedDelivery) : ''

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h2>
              <p className="font-medium">#{order.id.slice(0, 8)}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h2>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-1">Estimated Delivery</h2>
              <p className="font-medium">{estimatedDelivery}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h2>
              <p className="font-medium">{order.payment?.method}</p>
            </div>
          </div>
        </div>

        <div className="border dark:border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>

          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

            <div className="relative flex items-start mb-8 pl-8">
              <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Order Confirmed</h3>
                <p className="text-sm text-muted-foreground">Your order has been received and is being processed.</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(order.createdAt)}</p>
              </div>
            </div>

            <div className="relative flex items-start mb-8 pl-8">
              <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Processing</h3>
                <p className="text-sm text-muted-foreground">Your order is being prepared for shipping.</p>
              </div>
            </div>

            <div className="relative flex items-start mb-8 pl-8">
              <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <Truck className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Shipped</h3>
                <p className="text-sm text-muted-foreground">Your order has been shipped and is on its way.</p>
              </div>
            </div>

            {estimatedDelivery && (
              <div className="relative flex items-start pl-8">
                <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Delivered</h3>
                  <p className="text-sm text-muted-foreground">Estimated delivery: {estimatedDelivery}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href={`/orders/${orderNumber}`}>View Order Details</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

