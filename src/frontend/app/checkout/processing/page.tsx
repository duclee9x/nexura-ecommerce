"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import OrderHooks from "@/hooks/order-hooks"

type OrderStatus = "pending" | "success" | "failed"

interface Order {
  id:     string
  status: OrderStatus
  // Add other order properties as needed
}

export default function ProcessingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const instanceID = searchParams.get("instanceID")
  const { useGetOrderWorkflow } = OrderHooks()
  // Always call the hook, even if instanceID is null
  const { data: order, error, isPending } = useGetOrderWorkflow(instanceID ?? "")

  useEffect(() => {
    if (!instanceID) return
    const checkOrderStatus = () => {
      console.log("order", order)
      if (order && order.runtimeStatus !== "RUNNING") {
        const outputString = order.properties['dapr.workflow.output']
        const output = JSON.parse(outputString)
        const orderId = output.data.orderId
        router.push(`/checkout/success?order=${orderId}`)
      }
    }
    checkOrderStatus()
    const interval = setInterval(checkOrderStatus, 3000)
    return () => clearInterval(interval)
  }, [
    instanceID, order, router
  ])

  if (!instanceID) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Invalid Order</h1>
          <p className="text-muted-foreground mb-8">
            No order ID was provided. Please try placing your order again.
          </p>
          <Button asChild>
            <Link href="/cart">Return to Cart</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (error || (order && order.status === "failed")) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Order Failed</h1>
          <p className="text-muted-foreground mb-8">
            We apologize, but there was an error processing your order. Please try again or contact support if the issue persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/cart">Return to Cart</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Processing Your Order</h1>
        <p className="text-muted-foreground">
          Please wait while we process your order. This may take a few moments...
        </p>
      </div>
    </div>
  )
}
