"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, UserRoundPen, Download, Mail, ArrowUpDown, X, UserPlus, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { useCurrency } from "@/contexts/currency-context"
import UserHooks from "@/hooks/user-hooks"

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
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
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

export default function CustomersManagementPage() {
  const router = useRouter()
  const { useGetAllUsers, useRegisterUserForAdmin } = UserHooks()
  const { mutateAsync: registerUserForAdmin } = useRegisterUserForAdmin
  const { formatPrice, formatDate } = useCurrency()
  const { data: users, error, isLoading, refetch } = useGetAllUsers()
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ selectedStatus, setSelectedStatus ] = useState("all")
  const [ sortField, setSortField ] = useState("lastOrder")
  const [ sortDirection, setSortDirection ] = useState<"asc" | "desc">("desc")
  const [ currentPage, setCurrentPage ] = useState(1)
  const [itemsPerPage] = useState(5)
  const [ newCustomer, setNewCustomer ] = useState({
    firstName: "",
    lastName:  "",
    email:     "",
    phone:     "",
  })

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
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Customers</h1>
              <p className="text-muted-foreground">Manage your customer database</p>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>View and manage all customers</CardDescription>
                </div>
                <div className="h-10 w-[140px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
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
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Customers</h1>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>View and manage all customers</CardDescription>
                </div>
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

  if (!users) return null
  // Filter customers based on search and filters
  const filteredCustomers = users.filter((user) => {
    // Filter by search query
    if (
      searchQuery &&
      !user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && user.isActive !== selectedStatus) {
      return false
    }

    return true
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName)
    } else if (sortField === "orders") {
      return sortDirection === "asc" ? a.totalOrders - b.totalOrders : b.totalOrders - a.totalOrders
    } else if (sortField === "totalSpent") {
      return sortDirection === "asc" ? a.totalSpent - b.totalSpent : b.totalSpent - a.totalSpent
    } else if (sortField === "lastOrder") {
      return sortDirection === "asc"
        ? new Date(a.lastOrderDate).getTime() - new Date(b.lastOrderDate).getTime()
        : new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
    }
    return 0
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle new customer form change
  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCustomer(prev => ({ ...prev, [name]: value }))
  }

  // Handle add new customer
  const handleAddCustomer = () => {
    // Validate form
    if (!newCustomer.firstName || !newCustomer.lastName || !newCustomer.email) {
      return
    }

    // Create new customer
    registerUserForAdmin({
      firstName: newCustomer.firstName,
      lastName:  newCustomer.lastName,
      email:     newCustomer.email,
      phone:     newCustomer.phone,
    })

    // Add to customers
    // setCustomers((prev) => [newCustomerData, ...prev])

    // Reset form
    // setNewCustomer({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   location: "",
    // })
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Customers</h1>
            <p className="text-muted-foreground">Manage your customer database</p>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage all customers</CardDescription>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>Enter the details to add a new customer to your database.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={newCustomer.firstName}
                        onChange={handleNewCustomerChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={newCustomer.lastName}
                        onChange={handleNewCustomerChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={newCustomer.email}
                        onChange={handleNewCustomerChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={newCustomer.phone}
                        onChange={handleNewCustomerChange}
                      />
                    </div>

                  </div>

                  <DialogFooter>
                    <Button onClick={handleAddCustomer}>Add Customer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedStatus("all")
                    }}
                  >
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
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                          Customer
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("orders")}>
                          Orders
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("totalSpent")}>
                          Total Spent
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastOrder")}>
                          Last Order
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No customers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map(customer => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">
                            {customer.firstName} {customer.lastName}
                            <div className="text-xs text-muted-foreground mt-1">
                              Joined {formatDate(customer.createdAt, true)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              {customer.email}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{customer.phone}</div>
                          </TableCell>
                          <TableCell>{customer.address?.city}</TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>{formatPrice(customer.totalSpent)}</TableCell>
                          <TableCell>{customer.lastOrderDate ? formatDate(customer.lastOrderDate, true) : "Never"}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${customer.isActive === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {customer.isActive === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/admin/customers/edit/${customer.id}`)}>
                                  <UserRoundPen className="h-4 w-4 mr-2" />
                                  Edit Customer
                                </DropdownMenuItem>
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
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedCustomers.length)} of{" "}
                {sortedCustomers.length} customers
              </div>

              <Button variant="outline" onClick={() => window.print()}>
                <Download className="h-4 w-4 mr-2" />
                Export Customers
              </Button>
            </CardFooter>
          </Card>
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

