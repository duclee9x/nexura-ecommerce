"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Search, Package, Truck, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "@/contexts/session-context"
import { useCurrency } from "@/contexts/currency-context"
import type { OrderStatus, Order } from "@nexura/grpc_gateway/protos"
import OrderHooks from "@/hooks/order-hooks"

// Loading Skeleton Component
function OrderItemSkeleton() {
  return (
    <div className="border dark:border-gray-800 rounded-lg p-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right space-y-2">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Error Component
function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  )
}

function OrderItem({ order }: { order: Order }) {
  console.log(order, "order")
  const router = useRouter()
  const { formatPrice } = useCurrency()

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "ORDER_DELIVERED":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "ORDER_SHIPPED":
        return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case "ORDER_PROCESSING":
      default:
        return <Package className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "ORDER_DELIVERED":
        return "Delivered"
      case "ORDER_SHIPPED":
        return "Shipped"
      case "ORDER_PROCESSING":
        return "Processing"
      case "ORDER_PENDING":
        return "Pending"
      case "ORDER_CANCELLED":
        return "Cancelled"
      case "ORDER_COMPLETED":
        return "Completed"
      case "ORDER_COMPENSATING":
        return "Compensating"
      case "ORDER_FAILED":
        return "Failed"
      case "ORDER_REFUNDED":
        return "Refunded"
      case "ORDER_EXPIRED":
        return "Expired"
      case "ORDER_ON_HOLD":
        return "On Hold"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="border dark:border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Order #{order.id.split("-")[0]}</h2>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs">
              {getStatusIcon(order.status)}
              <span>{getStatusText(order.status)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium">{formatPrice(order.totalAmount)}</div>
            <div className="text-sm text-muted-foreground">
              {order.items.reduce((total, item) => total + item.quantity, 0)} item(s)
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => router.push(`/orders/${order.id}`)}
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {order.items.map((item) => (
          <div key={item.variantId} className="flex items-center gap-3">
            <div className="relative w-16 h-16 border dark:border-gray-800">
              <Image src={item.image || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
            </div>
            <div>
              <Link href={`/products/${item.productSlug}`} className="font-medium text-sm hover:underline">
                {item.productName} - {item.variantName}
              </Link>
              <p className="text-xs text-muted-foreground">
                Qty: {item.quantity} × {formatPrice(item.price)}
              </p>
              {order.status === "ORDER_DELIVERED" && (
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  Buy Again
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const { user } = useSession()
  const { useListOrders } = OrderHooks()
  const { data: orders, isLoading, error, refetch } = useListOrders(user?.id || "")

  // Filter orders based on search query and filters
  const filteredOrders = orders?.filter((order: Order) => {
    // Search filter
    if (searchQuery && !order.id.includes(searchQuery)) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // Time filter (simplified for demo)
    if (timeFilter === "last30days") {
      const orderDate = new Date(order.createdAt)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      if (orderDate < thirtyDaysAgo) {
        return false
      }
    }

    return true
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">My Orders</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>

        {/* Loading Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-[180px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 w-[180px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Loading Orders */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <OrderItemSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">My Orders</h1>
        </div>
        <ErrorState 
          message={error.message || "Failed to load orders. Please try again later."} 
          onRetry={refetch}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/")}>
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">My Orders</h1>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order number"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Select value={statusFilter.toString()} onValueChange={(value) => setStatusFilter(value === "all" ? "all" : value as OrderStatus)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ORDER_PENDING">Pending</SelectItem>
              <SelectItem value="ORDER_PROCESSING">Processing</SelectItem>
              <SelectItem value="ORDER_SHIPPED">Shipped</SelectItem>
              <SelectItem value="ORDER_DELIVERED">Delivered</SelectItem>
              <SelectItem value="ORDER_CANCELLED">Cancelled</SelectItem>
              <SelectItem value="ORDER_COMPLETED">Completed</SelectItem>
              <SelectItem value="ORDER_FAILED">Failed</SelectItem>
              <SelectItem value="ORDER_REFUNDED">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders?.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No orders found</h2>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all" || timeFilter !== "all"
                ? "Try adjusting your filters to find what you're looking for."
                : "You haven't placed any orders yet."}
            </p>
          </div>
          <Button onClick={() => router.push("/products")} className="mt-4">
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders?.map((order: Order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

