"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { getStatusBadgeColor, mapStatus } from "@/lib/utils"


import {
  ArrowLeft,
  Download,
  Send,
  Printer,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail,
  Plus,
  AlertTriangle,
  AlertCircle,
} from "lucide-react"

import { toast } from "@/hooks/use-toast"
import OrderHooks from "@/hooks/order-hooks"
import { useCurrency } from "@/contexts/currency-context"
import type { OrderStatus } from "@nexura/grpc_gateway/protos"
// Sample order data

const orderStatuses = [
  {
    value: "ORDER_PENDING",
    label: "Pending",
  },
  {
    value: "ORDER_PAYMENT_PAID",
    label: "Payment Paid",
  },
  {
    value: "ORDER_PROCESSING",
    label: "Processing",
  },
  {
    value: "ORDER_SHIPPED",
    label: "Shipped",
  },
  {
    value: "ORDER_COMPLETED",
    label: "Completed",
  },
  {
    value: "ORDER_CANCELLED",
    label: "Cancelled",
  },
]


export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const { useGetOrder, useUpdateOrderStatus, useAddOrderNote, useUpdateTrackingNumber } = OrderHooks()
  const { mutate: updateOrderStatus } = useUpdateOrderStatus
  const { mutate: addOrderNote } = useAddOrderNote
  const { mutate: updateTrackingNumber } = useUpdateTrackingNumber
  const { data: order, isPending } = useGetOrder(id as string)
  const [ activeTab, setActiveTab ] = useState("details")
  const [ orderStatus, setOrderStatus ] = useState(order?.status || "")
  const [ trackingNumber, setTrackingNumber ] = useState("")
  const [ noteText, setNoteText ] = useState("")
  const { formatDate, formatPrice } = useCurrency()

  // Update local state when order data changes
  useEffect(() => {
    if (order) {
      setOrderStatus(order.status)
      setTrackingNumber(order.shipping?.tracking?.number || "")
    }
  }, [order])

  if (isPending) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => router.push("/admin/orders")} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Order Status Card Skeleton */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-9 w-[180px]" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <div className="flex">
                          <Skeleton className="h-9 flex-1" />
                          <Skeleton className="h-9 w-20 ml-2" />
                        </div>
                      </div>
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border rounded-md p-4 bg-muted/50">
                      <div className="flex items-center">
                        <Skeleton className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info Card Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Skeleton className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>

                    <Skeleton className="h-9 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Skeleton */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="details">Order Items</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="p-4">
                        <div className="grid grid-cols-5 gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="space-y-4 p-4">
                        {[
                          1, 2, 3
                        ].map(i => (
                          <div key={i} className="grid grid-cols-5 gap-4">
                            <div className="flex items-center gap-3">
                              <Skeleton className="w-10 h-10 rounded-md" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => router.push("/admin/orders")} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold dark:text-white">Order Not Found</h1>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Order Not Found</h2>
              <p className="text-muted-foreground mb-8">
                We couldn't find an order with the provided order number. Please check the order number and try again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/admin/orders">View All Orders</Link>
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Go Back
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
  console.log('order', order)
  // Get status badge color
  

  // Handle status change
  const handleStatusChange = (status: OrderStatus) => {

    // In a real app, you would update the order status via API
    updateOrderStatus({ orderId: id as string, status })

    toast({
      title:       "Status Updated",
      description: `Order status has been updated to ${status}.`,
    })
  }

  // Handle tracking number update
  const handleTrackingUpdate = (trackingNumber: string) => {
    if (!trackingNumber.trim()) return

    // // In a real app, you would update the tracking number via API
    // updateOrderStatus(id as string, orderStatus as OrderStatus, trackingNumber)

    updateTrackingNumber({ orderId: id as string, trackingNumber: trackingNumber.trim() })

    toast({
      title:       "Tracking Updated",
      description: "Tracking number has been updated.",
    })
  }

  // Handle add note
  const handleAddNote = () => {
    if (!noteText.trim()) return

    addOrderNote({
      orderId: id as string,
      note:    noteText,
    })
    setNoteText("")

    toast({
      title:       "Note Added",
      description: "Note has been added to the order.",
    })
  }

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!id || Array.isArray(id)) return

    try {
      updateOrderStatus({ orderId: id as string, status: "ORDER_CANCELLED" as OrderStatus })
      
    } catch (error) {
      console.error("Error cancelling order:", error)
      toast({
        title:       "Error",
        description: "Failed to cancel the order. Please try again.",
        variant:     "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.push("/admin/orders")} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold dark:text-white">Order Details</h1>
                <p className="text-muted-foreground">
                  {order.id} • {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Invoice
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="text-destructive hover:text-destructive"
                    disabled={orderStatus === "ORDER_CANCELLED"}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {orderStatus === "ORDER_CANCELLED" ? "Order Cancelled" : "Cancel Order"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will cancel the order. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, keep it</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelOrder}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Yes, cancel order
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>
                    Current status:
                    <Badge className={`ml-2 ${getStatusBadgeColor(order.status)}`}>
                      {mapStatus(order.status)}
                    </Badge>
                  </CardDescription>
                </div>

                <Select value={order.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="tracking">Tracking Number</Label>
                      <div className="flex mt-1">
                        <Input
                          id="tracking"
                          value={trackingNumber}
                          onChange={e => setTrackingNumber(e.target.value)}
                          placeholder="Enter tracking number..."
                          className="rounded-r-none"
                        />
                        <Button onClick={() => handleTrackingUpdate(trackingNumber)} className="rounded-l-none">
                          Update
                        </Button>
                      </div>
                    </div>

                    {/* <div>
                      <Label>Payment Status</Label>
                      <div className="mt-1">
                        <Badge className={`${getPaymentStatusBadgeColor(order.payment?. || "")}`}>
                          {order.payment?.status?.charAt(0).toUpperCase() + order.payment?.status?.slice(1)}
                        </Badge>
                      </div>
                    </div> */}
                  </div>

                  <div className="flex items-center justify-between border rounded-md p-4 bg-muted/50">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.shipping?.method}</p>
                        {order.shipping?.tracking?.number && (
                          <p className="text-sm text-muted-foreground">Tracking: {order.shipping?.tracking?.number}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.payment?.method}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
                <CardDescription>Customer information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{order.user?.firstName} {order.user?.lastName}</p>
                      <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{order.user?.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{order.user?.phone}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        {order.shippingAddress ? (
                          <>
                            <p>{order.shippingAddress?.street}</p>
                            {order.shippingAddress?.countryName === "Vietnam" ? (
                              <p>
                                {order.shippingAddress?.vnWardName}, {order.shippingAddress?.vnDistrictName}, {order.shippingAddress?.vnProvinceName}
                              </p>
                            ) : (
                              <p>
                                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
                              </p>
                            )}
                            <p>{order.shippingAddress?.countryName}</p>
                          </>
                        ) : (
                          <p className="text-muted-foreground">No shipping address available</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/admin/customers/${order.user?.id}`)}
                  >
                    View Customer Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
              <TabsTrigger value="details">Order Items</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Order Items Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                  <CardDescription>Items included in this order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.variantName}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{item.productName}</p>
                                  <p className="font-medium">{item.variantName}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(order.items.reduce((acc, item) => acc + item.price * item.quantity, 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{formatPrice(order.shipping?.cost || 0)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Order History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>Timeline of order events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {order.statusHistory.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div
                            className={`rounded-full p-1 ${event.status === "ORDER_CANCELLED"
                              ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                              : "bg-primary/10 text-primary"
                            }`}
                          >
                            {event.status === "ORDER_PENDING" && <Package className="h-5 w-5" />}
                            {event.status === "ORDER_PAYMENT_PAID" && <CreditCard className="h-5 w-5" />}
                            {event.status === "ORDER_PROCESSING" && <Clock className="h-5 w-5" />}
                            {event.status === "ORDER_SHIPPED" && <Truck className="h-5 w-5" />}
                            {event.status === "ORDER_COMPLETED" && <CheckCircle className="h-5 w-5" />}
                            {event.status === "ORDER_CANCELLED" && <XCircle className="h-5 w-5" />}
                            {event.status === "ORDER_TRACKING_UPDATED" && <Truck className="h-5 w-5" />}
                            {event.status === "ORDER_NOTE_ADDED" && <Send className="h-5 w-5" />}
                          </div>
                          {index < order.statusHistory.length - 1 && <div className="h-full w-px bg-border mt-1"></div>}
                        </div>
                        <div className="pb-6">
                          <div className="flex items-center">
                            <Badge className={`${getStatusBadgeColor(event.status)}`}>
                              {mapStatus(event.status)}
                            </Badge>
                            <span className="text-sm text-muted-foreground ml-2">{formatDate(event.createdAt)}</span>
                          </div>
                          <p className="mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes</CardTitle>
                  <CardDescription>Add notes and comments to this order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.notes.length > 0 && (
                      <div className="p-4 border rounded-md bg-muted/50">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                          <h3 className="font-medium">Customer Note</h3>
                        </div>
                        {order.notes.map(note => (
                          <p key={note.id}>{note.note}</p>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="note">Add Note</Label>
                      <Textarea
                        id="note"
                        placeholder="Add a note about this order..."
                        rows={3}
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                      />
                      <Button onClick={handleAddNote} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Previous Notes</h3>
                      <div className="space-y-4">
                        {order.notes.map((note, index) => (
                          <div key={index} className="p-4 border rounded-md">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">Admin Note</span>
                              <span className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</span>
                            </div>
                            <p>{note.note}</p>
                          </div>
                        ))}

                        {order.notes.length === 0 && (
                          <p className="text-muted-foreground">No notes have been added yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Label component
function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

