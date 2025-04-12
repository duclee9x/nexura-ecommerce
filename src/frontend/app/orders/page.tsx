"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Search, Package, Truck, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample orders data
const orders = [
  {
    id: "123456789",
    date: "March 15, 2024",
    status: "Processing",
    items: [
      {
        id: 1,
        name: "Urban Backpack",
        price: 120,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 8,
        name: "Laptop Sleeve",
        price: 45,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    total: 190.2,
  },
  {
    id: "987654321",
    date: "February 28, 2024",
    status: "Delivered",
    items: [
      {
        id: 2,
        name: "Hyper Backpack",
        price: 140,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    total: 151.2,
  },
  {
    id: "456789123",
    date: "January 15, 2024",
    status: "Delivered",
    items: [
      {
        id: 10,
        name: "Water Bottle",
        price: 18,
        quantity: 2,
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: 11,
        name: "Extension Strap",
        price: 12,
        quantity: 1,
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    total: 51.84,
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    // Search filter
    if (searchQuery && !order.id.includes(searchQuery)) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && order.status.toLowerCase() !== statusFilter) {
      return false
    }

    // Time filter (simplified for demo)
    if (timeFilter === "last30days") {
      const orderDate = new Date(order.date)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      if (orderDate < thirtyDaysAgo) {
        return false
      }
    }

    return true
  })

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case "processing":
      default:
        return <Package className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    }
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
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
      {filteredOrders.length === 0 ? (
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
          {filteredOrders.map((order) => (
            <div key={order.id} className="border dark:border-gray-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold">Order #{order.id}</h2>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">${order.total.toFixed(2)}</div>
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
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-16 h-16 border dark:border-gray-800">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/products/${item.id}`} className="font-medium text-sm hover:underline">
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                      {order.status === "Delivered" && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

