"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronDown, Eye, Download, Calendar, ArrowUpDown, X, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import OrderHooks from "@/hooks/order-hooks"
import { useCurrency } from "@/contexts/currency-context"
import { DateRange } from "react-day-picker"
import type { PaymentStatus, OrderStatus } from "@nexura/grpc_gateway/protos"
import { getPaymentStatusBadgeColor, getStatusBadgeColor, mapStatus } from "@/lib/utils"

// Loading Skeleton Components
function TableSkeleton() {
  return (
    <div className="space-y-4">
      {[
        1, 2, 3, 4, 5
      ].map(i => (
        <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  )
}

function FilterSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-10 w-[150px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 w-[150px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 w-[150px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 w-[100px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
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

export default function OrdersManagementPage() {
  const router = useRouter()
  const { formatDate, formatPrice } = useCurrency()
  const { useListAllOrders } = OrderHooks()
  const { data: orders, error, isLoading, refetch } = useListAllOrders()
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ selectedStatus, setSelectedStatus ] = useState<OrderStatus | "all">("all")
  const [ selectedPaymentStatus, setSelectedPaymentStatus ] = useState<PaymentStatus | "all">("all")
  const [ dateRange, setDateRange ] = useState<DateRange | undefined>(undefined)
  const [ sortField, setSortField ] = useState("date")
  const [ sortDirection, setSortDirection ] = useState<"asc" | "desc">("desc")
  const [ currentPage, setCurrentPage ] = useState(1)
  const [itemsPerPage] = useState(5)

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Orders</h1>
              <p className="text-muted-foreground">Manage and process customer orders</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <FilterSkeleton />
                <TableSkeleton />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Orders</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorState 
                  message={"Internal server error. Please try again later."} 
                  onRetry={refetch}
                />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  if (!orders) return null

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    // Filter by search query
    if (
      searchQuery &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.user?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by order status
    if (selectedStatus !== "all" && order.status !== selectedStatus) {
      return false
    }

    // Filter by payment status
    if (selectedPaymentStatus !== "all" && order.payment?.method !== selectedPaymentStatus) {
      return false
    }

    // Filter by date range
    if (dateRange) {
      const orderDate = new Date(order.createdAt)
      const from = dateRange?.from
        ? new Date(dateRange.from)
        : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
      const to = dateRange?.to ? new Date(dateRange.to) : new Date()
      to?.setHours(23, 59, 59, 999) // Include the entire "to" day

      if (orderDate < from || orderDate > to) {
        return false
      }
    }

    return true
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === "Date") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortField === "Amount") {
      const aAmount = a.totalAmount
      const bAmount = b.totalAmount
      return sortDirection === "asc" ? aAmount - bAmount : bAmount - aAmount
    } else if (sortField === "Customer") {
      const aName = `${a.user?.firstName} ${a.user?.lastName}`
      const bName = `${b.user?.firstName} ${b.user?.lastName}`
      return sortDirection === "asc" ? aName.localeCompare(bName) : bName.localeCompare(aName)
    }
    return 0
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStatus("all")
    setSelectedPaymentStatus("all")
    setDateRange({ from: undefined, to: undefined })
  }

  // Get status badge color
  
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Orders</h1>
            <p className="text-muted-foreground">Manage and process customer orders</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by order ID, customer name, or email..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <Select value={selectedStatus} onValueChange={value => setSelectedStatus(value as OrderStatus)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Order Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="ORDER_PROCESSING">Processing</SelectItem>
                      <SelectItem value="ORDER_SHIPPED">Shipped</SelectItem>
                      <SelectItem value="ORDER_COMPLETED">Completed</SelectItem>
                      <SelectItem value="ORDER_CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedPaymentStatus} onValueChange={value => setSelectedPaymentStatus(value as PaymentStatus)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payments</SelectItem>
                      <SelectItem value="PAYMENT_PAID">Paid</SelectItem>
                      <SelectItem value="PAYMENT_PENDING">Pending</SelectItem>
                      <SelectItem value="PAYMENT_FAILED">Failed</SelectItem>
                      <SelectItem value="PAYMENT_CANCELLED">Cancelled</SelectItem>
                      <SelectItem value="PAYMENT_REFUNDED">Refunded</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[150px] justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange?.to ? (
                            <>
                              {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                            </>
                          ) : (
                            dateRange.from.toLocaleDateString()
                          )
                        ) : (
                          "Date Range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={range => setDateRange(range)}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("date")}>
                          Order
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("customer")}>
                          Customer
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("total")}>
                          Total
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            #{order.id.slice(0, 8)}
                            <div className="text-xs text-muted-foreground mt-1">
                              {order.items.length} {order.items.length === 1 ? "item" : "items"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>{order.user?.firstName} {order.user?.lastName}</div>
                            <div className="text-xs text-muted-foreground mt-1">{order.user?.email}</div>
                          </TableCell>
                          <TableCell>{formatDate(order.createdAt)}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusBadgeColor(order.status)}`}>
                              {mapStatus(order.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getPaymentStatusBadgeColor(order.payment?.status as PaymentStatus)}`}
                            >
                              {mapStatus(order.payment?.status as PaymentStatus)}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/admin/orders/${order.id}`)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Invoice
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {/* <DropdownMenuItem onClick={() => router.push(`/admin/orders/edit/${order.id}`)}>
                                  Edit Order
                                </DropdownMenuItem> */}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedOrders.length)} of {sortedOrders.length}{" "}
                orders
              </div>

              <Button variant="outline" onClick={() => window.print()}>
                <Download className="h-4 w-4 mr-2" />
                Export Orders
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}

