"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertCircle, ArrowLeft, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/contexts/currency-context"
import { Skeleton } from "@/components/ui/skeleton"
import OrderHooks from "@/hooks/order-hooks"

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const orderNumber = searchParams.get("order")
  const { formatDate } = useCurrency()
  
  const { useGetOrder } = OrderHooks()
  const { data: order, isPending } = useGetOrder(orderNumber ?? "")

  // If there's no error or order number, redirect to home
  if (!error && !orderNumber) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Invalid Request</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the order details you're looking for.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isPending && orderNumber) {
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
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            {order ? "Order Processing Failed" : "Payment Failed"}
          </h1>
          <p className="text-muted-foreground">
            {order
              ? "We encountered an issue while processing your order. Don't worry, we're looking into it!"
              : "We couldn't process your payment. Please try again or use a different payment method."}
          </p>
        </div>

        {order && (
          <div className="border border-destructive/20 dark:border-destructive/40 rounded-lg p-6 mb-8 bg-destructive/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h2>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h2>
                <p>{formatDate(order.createdAt)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {error || "An unexpected error occurred. Please try again later."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Contact Support
            </Link>
          </Button>
          {order && (
            <Button variant="secondary" asChild>
              <Link href="/cart" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

