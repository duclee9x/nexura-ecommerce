"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Trash2, Plus, Mail, User, MapPin, ShoppingBag, Send, FileText } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import UserHooks from "@/hooks/user-hooks"
// Sample customer data
const sampleCustomer = {
  id:        1,
  firstName: "John",
  lastName:  "Doe",
  email:     "john.doe@example.com",
  phone:     "+1 (555) 123-4567",
  company:   "Acme Inc.",
  notes:     "Prefers email communication. Interested in premium products.",
  status:    "active",
  orders:    [
    {
      id:     "ORD-2023-1001",
      date:   "2023-03-15T10:30:00",
      total:  165.99,
      status: "delivered",
      items:  2,
    },
    {
      id:     "ORD-2023-0845",
      date:   "2023-02-28T14:15:00",
      total:  89.5,
      status: "delivered",
      items:  1,
    },
    {
      id:     "ORD-2023-0732",
      date:   "2023-01-17T09:45:00",
      total:  245.0,
      status: "delivered",
      items:  3,
    },
    {
      id:     "ORD-2022-0698",
      date:   "2022-12-05T16:20:00",
      total:  145.5,
      status: "delivered",
      items:  2,
    },
    {
      id:     "ORD-2022-0542",
      date:   "2022-11-10T11:30:00",
      total:  75.99,
      status: "delivered",
      items:  1,
    },
  ],
  addresses: [
    {
      id:         1,
      type:       "billing",
      default:    true,
      firstName:  "John",
      lastName:   "Doe",
      company:    "Acme Inc.",
      address1:   "123 Main Street",
      address2:   "Apt 4B",
      city:       "New York",
      state:      "NY",
      postalCode: "10001",
      country:    "United States",
      phone:      "+1 (555) 123-4567",
    },
    {
      id:         2,
      type:       "shipping",
      default:    true,
      firstName:  "John",
      lastName:   "Doe",
      company:    "Acme Inc.",
      address1:   "123 Main Street",
      address2:   "Apt 4B",
      city:       "New York",
      state:      "NY",
      postalCode: "10001",
      country:    "United States",
      phone:      "+1 (555) 123-4567",
    },
  ],
  totalSpent: 722.98,
  dateJoined: "2022-11-05T08:15:00",
  lastActive: "2023-03-15T14:30:00",
}

// Email templates
const emailTemplates = [
  { id: "welcome", name: "Welcome Email" },
  { id: "order_confirmation", name: "Order Confirmation" },
  { id: "shipping_update", name: "Shipping Update" },
  { id: "abandoned_cart", name: "Abandoned Cart" },
  { id: "feedback_request", name: "Feedback Request" },
  { id: "custom", name: "Custom Email" },
]

export default function CustomerEditPage() {
  const router = useRouter()
  const params = useParams()
  const customerId = params.id
  const { useDeleteUser } = UserHooks()
  const { mutateAsync: deleteUser } = useDeleteUser
  const [ isLoading, setIsLoading ] = useState(true)
  const [ activeTab, setActiveTab ] = useState("profile")
  const [ customer, setCustomer ] = useState(sampleCustomer)
  const [ hasChanges, setHasChanges ] = useState(false)
  const [ emailData, setEmailData ] = useState({
    template: "custom",
    subject:  "",
    message:  "",
  })

  // Simulate loading customer data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    }).format(date)
  }

  // Format date with time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year:   "numeric",
      month:  "short",
      day:    "numeric",
      hour:   "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setCustomer((prev) => {
      // Handle nested properties
      if (name.includes(".")) {
        const [ parent, child ] = name.split(".")
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof typeof prev] as Record<string, any>),
            [child]: value,
          },
        }
      }

      return { ...prev, [name]: value }
    })

    setHasChanges(true)
  }

 

  // Handle email template change
  const handleEmailTemplateChange = (value: string) => {
    setEmailData(prev => ({ ...prev, template: value }))

    // Set default subject and message based on template
    if (value === "welcome") {
      setEmailData(prev => ({
        ...prev,
        subject: `Welcome to NEXURA, ${customer.firstName}!`,
        message: `Dear ${customer.firstName},\n\nWelcome to NEXURA! We're thrilled to have you join our community of fashion enthusiasts.\n\nWith your new account, you can:\n- Track your orders\n- Save your favorite items\n- Get personalized recommendations\n\nIf you have any questions, feel free to reply to this email.\n\nBest regards,\nThe NEXURA Team`,
      }))
    } else if (value === "order_confirmation") {
      setEmailData(prev => ({
        ...prev,
        subject: "Your NEXURA Order Confirmation",
        message: `Dear ${customer.firstName},\n\nThank you for your order! We're processing it now and will send you another email when it ships.\n\nOrder Number: ORD-${Date.now().toString().slice(-7)}\n\nBest regards,\nThe NEXURA Team`,
      }))
    } else if (value === "custom") {
      setEmailData(prev => ({
        ...prev,
        subject: "",
        message: "",
      }))
    }
  }

  // Handle email input changes
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailData(prev => ({ ...prev, [name]: value }))
  }

  // Handle save
  const handleSave = () => {
    // In a real app, this would save to the database
    setHasChanges(false)

    toast({
      title:       "Customer Saved",
      description: "Customer information has been updated successfully.",
    })
  }

  // Handle status change
  const handleStatusChange = () => {
    setCustomer(prev => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active",
    }))

    setHasChanges(true)

    toast({
      title: customer.status === "active" ? "Customer Deactivated" : "Customer Activated",
      description:
        customer.status === "active"
          ? "Customer account has been deactivated."
          : "Customer account has been activated.",
    })
  }

  // Handle delete
  const handleDelete = () => {
    try {
      deleteUser({ id: customerId as string })
      toast({
        title:       "Customer Deleted",
        description: "Customer has been deleted (In Inactive Status).",
      })

      router.push("/admin/customers")
    } catch (error) {
      toast({
        title:       "Error",
        description: error instanceof Error ? error.message : "Failed to delete customer.",
      })
    }
  }

  // Handle send email
  const handleSendEmail = () => {
    // In a real app, this would send an email
    toast({
      title:       "Email Sent",
      description: `Email has been sent to ${customer.email}.`,
    })

    // Reset email form
    setEmailData({
      template: "custom",
      subject:  "",
      message:  "",
    })
  }

  // Handle add address
  const handleAddAddress = (type: string) => {
    const newAddress = {
      id:         Date.now(),
      type,
      default:    customer.addresses.filter(a => a.type === type).length === 0,
      firstName:  customer.firstName,
      lastName:   customer.lastName,
      company:    customer.company,
      address1:   "",
      address2:   "",
      city:       "",
      state:      "",
      postalCode: "",
      country:    "United States",
      phone:      customer.phone,
    }

    setCustomer(prev => ({
      ...prev,
      addresses: [ ...prev.addresses, newAddress ],
    }))

    setHasChanges(true)
  }

  // Handle remove address
  const handleRemoveAddress = (id: number) => {
    setCustomer(prev => ({
      ...prev,
      addresses: prev.addresses.filter(address => address.id !== id),
    }))

    setHasChanges(true)
  }

  // Handle address change
  const handleAddressChange = (id: number, field: string, value: string) => {
    setCustomer(prev => ({
      ...prev,
      addresses: prev.addresses.map(address => (address.id === id ? { ...address, [field]: value } : address)),
    }))

    setHasChanges(true)
  }

  // Handle set default address
  const handleSetDefaultAddress = (id: number, type: string) => {
    setCustomer(prev => ({
      ...prev,
      addresses: prev.addresses.map(address =>
        address.type === type ? { ...address, default: address.id === id } : address,
      ),
    }))

    setHasChanges(true)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">

        <div className="flex flex-1">
          <AdminSidebar />

          <main className="flex-1 p-6">
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold dark:text-white">Loading Customer...</h1>
            </div>

            <div className="space-y-6">
              <div className="w-full h-8 bg-muted rounded animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
                <div className="w-full h-32 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-1 dark:text-white">
                  {customer.firstName} {customer.lastName}
                </h1>
                <p className="text-muted-foreground">
                  Customer since {formatDate(customer.dateJoined)} • Last active {formatDate(customer.lastActive)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this customer and all associated data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="outline" size="sm" onClick={handleStatusChange}>
                {customer.status === "active" ? "Deactivate" : "Activate"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Send Email to Customer</DialogTitle>
                    <DialogDescription>
                      Send a personalized email to {customer.firstName} {customer.lastName} ({customer.email})
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="template">Email Template</Label>
                      <Select value={emailData.template} onValueChange={handleEmailTemplateChange}>
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {emailTemplates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={emailData.subject}
                        onChange={handleEmailInputChange}
                        placeholder="Enter email subject"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={8}
                        value={emailData.message}
                        onChange={handleEmailInputChange}
                        placeholder="Enter your message"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={handleSendEmail}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Badge
              className={`${customer.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </Badge>
            <div className="ml-4 text-muted-foreground">
              <span className="font-medium">${customer.totalSpent.toFixed(2)}</span> lifetime spent
            </div>
            <div className="ml-4 text-muted-foreground">
              <span className="font-medium">{customer.orders.length}</span> orders
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Addresses</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Notes</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                  <CardDescription>Basic customer details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={customer.phone} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" value={customer.company} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="status">Account Status</Label>
                      <Switch
                        id="status"
                        checked={customer.status === "active"}
                        onCheckedChange={() => handleStatusChange()}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {customer.status === "active"
                        ? "Customer can log in and place orders"
                        : "Customer account is disabled"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View customer's order history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customer.orders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                              No orders found
                            </TableCell>
                          </TableRow>
                        ) : (
                          customer.orders.map(order => (
                            <TableRow
                              key={order.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => router.push(`/admin/orders/${order.id}`)}
                            >
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{formatDateTime(order.date)}</TableCell>
                              <TableCell>
                                {order.items} item{order.items !== 1 ? "s" : ""}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`${order.status === "delivered"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : order.status === "processing"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : order.status === "shipped"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }`}
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => router.push("/admin/orders/new")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Order
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Addresses</CardTitle>
                  <CardDescription>Manage billing and shipping addresses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Billing Addresses */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Billing Addresses</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddAddress("billing")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Address
                        </Button>
                      </div>

                      {customer.addresses.filter(a => a.type === "billing").length === 0 ? (
                        <div className="border rounded-md p-6 text-center text-muted-foreground">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p>No billing addresses</p>
                          <p className="text-sm">Add a billing address for this customer</p>
                        </div>
                      ) : (
                        customer.addresses
                          .filter(a => a.type === "billing")
                          .map(address => (
                            <div key={address.id} className="border rounded-md p-4 relative">
                              {address.default && <Badge className="absolute top-4 right-4 bg-primary">Default</Badge>}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`billing-firstName-${address.id}`}>First Name</Label>
                                  <Input
                                    id={`billing-firstName-${address.id}`}
                                    value={address.firstName}
                                    onChange={e => handleAddressChange(address.id, "firstName", e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`billing-lastName-${address.id}`}>Last Name</Label>
                                  <Input
                                    id={`billing-lastName-${address.id}`}
                                    value={address.lastName}
                                    onChange={e => handleAddressChange(address.id, "lastName", e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`billing-company-${address.id}`}>Company</Label>
                                <Input
                                  id={`billing-company-${address.id}`}
                                  value={address.company}
                                  onChange={e => handleAddressChange(address.id, "company", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`billing-address1-${address.id}`}>Address Line 1</Label>
                                <Input
                                  id={`billing-address1-${address.id}`}
                                  value={address.address1}
                                  onChange={e => handleAddressChange(address.id, "address1", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`billing-address2-${address.id}`}>Address Line 2</Label>
                                <Input
                                  id={`billing-address2-${address.id}`}
                                  value={address.address2}
                                  onChange={e => handleAddressChange(address.id, "address2", e.target.value)}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`billing-city-${address.id}`}>City</Label>
                                  <Input
                                    id={`billing-city-${address.id}`}
                                    value={address.city}
                                    onChange={e => handleAddressChange(address.id, "city", e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`billing-state-${address.id}`}>State/Province</Label>
                                  <Input
                                    id={`billing-state-${address.id}`}
                                    value={address.state}
                                    onChange={e => handleAddressChange(address.id, "state", e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`billing-postalCode-${address.id}`}>Postal Code</Label>
                                  <Input
                                    id={`billing-postalCode-${address.id}`}
                                    value={address.postalCode}
                                    onChange={e => handleAddressChange(address.id, "postalCode", e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`billing-country-${address.id}`}>Country</Label>
                                <Input
                                  id={`billing-country-${address.id}`}
                                  value={address.country}
                                  onChange={e => handleAddressChange(address.id, "country", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`billing-phone-${address.id}`}>Phone</Label>
                                <Input
                                  id={`billing-phone-${address.id}`}
                                  value={address.phone}
                                  onChange={e => handleAddressChange(address.id, "phone", e.target.value)}
                                />
                              </div>

                              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                {!address.default && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSetDefaultAddress(address.id, "billing")}
                                  >
                                    Set as Default
                                  </Button>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive ml-auto"
                                  onClick={() => handleRemoveAddress(address.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>

                    {/* Shipping Addresses */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Shipping Addresses</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddAddress("shipping")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Address
                        </Button>
                      </div>

                      {customer.addresses.filter(a => a.type === "shipping").length === 0 ? (
                        <div className="border rounded-md p-6 text-center text-muted-foreground">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p>No shipping addresses</p>
                          <p className="text-sm">Add a shipping address for this customer</p>
                        </div>
                      ) : (
                        customer.addresses
                          .filter(a => a.type === "shipping")
                          .map(address => (
                            <div key={address.id} className="border rounded-md p-4 relative">
                              {address.default && <Badge className="absolute top-4 right-4 bg-primary">Default</Badge>}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`shipping-firstName-${address.id}`}>First Name</Label>
                                  <Input
                                    id={`shipping-firstName-${address.id}`}
                                    value={address.firstName}
                                    onChange={e => handleAddressChange(address.id, "firstName", e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`shipping-lastName-${address.id}`}>Last Name</Label>
                                  <Input
                                    id={`shipping-lastName-${address.id}`}
                                    value={address.lastName}
                                    onChange={e => handleAddressChange(address.id, "lastName", e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`shipping-company-${address.id}`}>Company</Label>
                                <Input
                                  id={`shipping-company-${address.id}`}
                                  value={address.company}
                                  onChange={e => handleAddressChange(address.id, "company", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`shipping-address1-${address.id}`}>Address Line 1</Label>
                                <Input
                                  id={`shipping-address1-${address.id}`}
                                  value={address.address1}
                                  onChange={e => handleAddressChange(address.id, "address1", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`shipping-address2-${address.id}`}>Address Line 2</Label>
                                <Input
                                  id={`shipping-address2-${address.id}`}
                                  value={address.address2}
                                  onChange={e => handleAddressChange(address.id, "address2", e.target.value)}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`shipping-city-${address.id}`}>City</Label>
                                  <Input
                                    id={`shipping-city-${address.id}`}
                                    value={address.city}
                                    onChange={e => handleAddressChange(address.id, "city", e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`shipping-state-${address.id}`}>State/Province</Label>
                                  <Input
                                    id={`shipping-state-${address.id}`}
                                    value={address.state}
                                    onChange={e => handleAddressChange(address.id, "state", e.target.value)}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`shipping-postalCode-${address.id}`}>Postal Code</Label>
                                  <Input
                                    id={`shipping-postalCode-${address.id}`}
                                    value={address.postalCode}
                                    onChange={e => handleAddressChange(address.id, "postalCode", e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`shipping-country-${address.id}`}>Country</Label>
                                <Input
                                  id={`shipping-country-${address.id}`}
                                  value={address.country}
                                  onChange={e => handleAddressChange(address.id, "country", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2 mb-4">
                                <Label htmlFor={`shipping-phone-${address.id}`}>Phone</Label>
                                <Input
                                  id={`shipping-phone-${address.id}`}
                                  value={address.phone}
                                  onChange={e => handleAddressChange(address.id, "phone", e.target.value)}
                                />
                              </div>

                              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                {!address.default && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSetDefaultAddress(address.id, "shipping")}
                                  >
                                    Set as Default
                                  </Button>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive ml-auto"
                                  onClick={() => handleRemoveAddress(address.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Notes</CardTitle>
                  <CardDescription>Add private notes about this customer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={8}
                      value={customer.notes}
                      onChange={handleInputChange}
                      placeholder="Add notes about this customer..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Notes are only visible to administrators, not to the customer.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={!hasChanges}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Notes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

