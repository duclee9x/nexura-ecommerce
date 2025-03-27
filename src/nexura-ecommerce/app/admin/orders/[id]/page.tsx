"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

// Sample order data
const orderData = {
  id: "ORD-2023-1001",
  date: "2023-03-15T10:30:00",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
  },
  items: [
    {
      id: 1,
      name: "Urban Backpack",
      sku: "BP-URB-001",
      price: 120.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Urban+Backpack",
    },
    {
      id: 8,
      name: "Laptop Sleeve",
      sku: "ACC-LTS-008",
      price: 45.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Laptop+Sleeve",
    },
    {
      id: 10,
      name: "Water Bottle",
      sku: "ACC-WBT-010",
      price: 18.0,
      quantity: 3,
      image: "/placeholder.svg?height=80&width=80&text=Water+Bottle",
    },
  ],
  status: "processing",
  paymentStatus: "paid",
  paymentMethod: "Credit Card (Visa ****4567)",
  shippingMethod: "Standard Shipping",
  trackingNumber: "TRK123456789US",
  subtotal: 201.0,
  shipping: 12.99,
  tax: 32.0,
  total: 245.99,
  notes: "Customer requested gift wrapping for the backpack.",
  history: [
    {
      date: "2023-03-15T10:30:00",
      status: "created",
      note: "Order placed by customer",
    },
    {
      date: "2023-03-15T10:35:00",
      status: "payment_received",
      note: "Payment received via Credit Card",
    },
    {
      date: "2023-03-15T14:20:00",
      status: "processing",
      note: "Order is being processed",
    },
  ],
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const orderId = params.id
  const [order, setOrder] = useState(orderData)
  const [activeTab, setActiveTab] = useState("details")
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "")
  const [noteText, setNoteText] = useState("")

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "created":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "payment_received":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "refunded":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Handle status change
  const handleStatusChange = (status: string) => {
    setOrderStatus(status)

    // In a real app, you would update the order status via API
    setOrder((prev) => ({
      ...prev,
      status,
      history: [
        ...prev.history,
        {
          date: new Date().toISOString(),
          status,
          note: `Order status changed to ${status}`,
        },
      ],
    }))

    toast({
      title: "Status Updated",
      description: `Order status has been updated to ${status}.`,
    })
  }

  // Handle tracking number update
  const handleTrackingUpdate = () => {
    if (!trackingNumber.trim()) return

    // In a real app, you would update the tracking number via API
    setOrder((prev) => ({
      ...prev,
      trackingNumber,
      history: [
        ...prev.history,
        {
          date: new Date().toISOString(),
          status: "tracking_updated",
          note: `Tracking number updated to ${trackingNumber}`,
        },
      ],
    }))

    toast({
      title: "Tracking Updated",
      description: "Tracking number has been updated.",
    })
  }

  // Handle add note
  const handleAddNote = () => {
    if (!noteText.trim()) return

    // In a real app, you would add the note via API
    setOrder((prev) => ({
      ...prev,
      history: [
        ...prev.history,
        {
          date: new Date().toISOString(),
          status: "note_added",
          note: noteText,
        },
      ],
    }))

    setNoteText("")

    toast({
      title: "Note Added",
      description: "Note has been added to the order.",
    })
  }

  // Handle cancel order
  const handleCancelOrder = () => {
    // In a real app, you would cancel the order via API
    setOrder((prev) => ({
      ...prev,
      status: "cancelled",
      history: [
        ...prev.history,
        {
          date: new Date().toISOString(),
          status: "cancelled",
          note: "Order cancelled by admin",
        },
      ],
    }))

    setOrderStatus("cancelled")

    toast({
      title: "Order Cancelled",
      description: "Order has been cancelled.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

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
                  {order.id} • {formatDate(order.date)}
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
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Order
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
                    <Badge className={`ml-2 ${getStatusBadgeColor(orderStatus)}`}>
                      {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                    </Badge>
                  </CardDescription>
                </div>

                <Select value={orderStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
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
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          placeholder="Enter tracking number..."
                          className="rounded-r-none"
                        />
                        <Button onClick={handleTrackingUpdate} className="rounded-l-none">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Payment Status</Label>
                      <div className="mt-1">
                        <Badge className={`${getPaymentStatusBadgeColor(order.paymentStatus)}`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border rounded-md p-4 bg-muted/50">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.shippingMethod}</p>
                        {order.trackingNumber && (
                          <p className="text-sm text-muted-foreground">Tracking: {order.trackingNumber}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.paymentMethod}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
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
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{order.customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{order.customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                      <div>
                        <p>{order.customer.address.street}</p>
                        <p>
                          {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}
                        </p>
                        <p>{order.customer.address.country}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/admin/customers/${order.customer.email}`)}
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
                        {order.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="font-medium">{item.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
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
                    {order.history.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div
                            className={`rounded-full p-1 ${
                              event.status === "cancelled"
                                ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {event.status === "created" && <Package className="h-5 w-5" />}
                            {event.status === "payment_received" && <CreditCard className="h-5 w-5" />}
                            {event.status === "processing" && <Clock className="h-5 w-5" />}
                            {event.status === "shipped" && <Truck className="h-5 w-5" />}
                            {event.status === "completed" && <CheckCircle className="h-5 w-5" />}
                            {event.status === "cancelled" && <XCircle className="h-5 w-5" />}
                            {event.status === "tracking_updated" && <Truck className="h-5 w-5" />}
                            {event.status === "note_added" && <Send className="h-5 w-5" />}
                          </div>
                          {index < order.history.length - 1 && <div className="h-full w-px bg-border mt-1"></div>}
                        </div>
                        <div className="pb-6">
                          <div className="flex items-center">
                            <Badge className={`${getStatusBadgeColor(event.status)}`}>
                              {event.status
                                .split("_")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </Badge>
                            <span className="text-sm text-muted-foreground ml-2">{formatDate(event.date)}</span>
                          </div>
                          <p className="mt-1">{event.note}</p>
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
                    {order.notes && (
                      <div className="p-4 border rounded-md bg-muted/50">
                        <div className="flex items-center mb-2">
                          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                          <h3 className="font-medium">Customer Note</h3>
                        </div>
                        <p>{order.notes}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="note">Add Note</Label>
                      <Textarea
                        id="note"
                        placeholder="Add a note about this order..."
                        rows={3}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      />
                      <Button onClick={handleAddNote} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Previous Notes</h3>
                      <div className="space-y-4">
                        {order.history
                          .filter((event) => event.status === "note_added")
                          .map((note, index) => (
                            <div key={index} className="p-4 border rounded-md">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Admin Note</span>
                                <span className="text-sm text-muted-foreground">{formatDate(note.date)}</span>
                              </div>
                              <p>{note.note}</p>
                            </div>
                          ))}

                        {order.history.filter((event) => event.status === "note_added").length === 0 && (
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

