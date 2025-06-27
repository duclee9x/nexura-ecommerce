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
    
    let isMounted = true
    let checkCount = 0
    const maxChecks = 30 // Maximum number of checks (30 * 3s = 90 seconds total)
    
    const checkOrderStatus = async () => {
      if (!isMounted) return
      
      try {
        console.log(`Checking workflow status (attempt ${checkCount + 1}/${maxChecks})`)
        
        // If we've checked too many times, give up
        if (checkCount >= maxChecks) {
          throw new Error("Workflow processing is taking too long. Please check back later.")
        }
        
        // If we don't have order data yet, wait for the next check
        if (!order) {
          console.log("Order data not loaded yet, waiting...")
          return
        }
        
        // Check if workflow is still running
        if (order.runtimeStatus === "RUNNING") {
          console.log("Workflow still running, checking again soon...")
          return
        }
        
        // Check if workflow output exists in properties
        const outputString = order.properties?.['dapr.workflow.output']
        
        // If output doesn't exist yet, wait for the next check
        if (!outputString) {
          console.log("Workflow output not available yet, will check again...")
          return
        }
        
        // If output exists but is empty, treat as error
        if (outputString.trim() === '') {
          throw new Error("Workflow output is empty")
        }
        
        // Try to parse the output
        const output = JSON.parse(outputString)
        
        // Check if the workflow completed successfully
        if (output?.success === true) {
          // Handle successful workflow completion
          if (!output?.data?.orderId) {
            throw new Error("Order ID not found in workflow output")
          }
          
          const orderId = output.data.orderId
          console.log("Order processed successfully, redirecting to success page")
          router.push(`/checkout/success?order=${orderId}`)
        } else {
          // Handle workflow failure
          const errorMessage = output?.error || "Order processing failed"
          const orderId = output?.data?.orderId
          
          if (orderId) {
            console.log(`Order processing failed for order ${orderId}:`, errorMessage)
            router.push(`/checkout/failure?order=${orderId}&error=${encodeURIComponent(errorMessage)}`)
          } else {
            console.log("Order processing failed:", errorMessage)
            router.push(`/checkout/failure?error=${encodeURIComponent(errorMessage)}`)
          }
        }
      } catch (error) {
        console.error("Error processing workflow result:", error)
        
        // If we get an error but have more checks left, just log and continue
        if (checkCount < maxChecks && 
            error instanceof Error && 
            (error.message.includes("not available") || 
             error.message.includes("still running") ||
             error.message.includes("not loaded"))) {
          console.log("Will retry:", error.message)
          return
        }
        
        // For other errors or max retries reached, show error
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        router.push(`/checkout/failure?error=${encodeURIComponent(errorMessage)}`)
      } finally {
        checkCount++
      }
    }
    
    // Initial check
    checkOrderStatus()
    
    // Set up interval for subsequent checks
    const intervalId = setInterval(() => {
      if (isMounted) {
        checkOrderStatus()
      }
    }, 1000) // Check every 3 seconds
    
    // Cleanup
    return () => {
      isMounted = false
      clearInterval(intervalId)
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
