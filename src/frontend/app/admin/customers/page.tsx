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
import { Search, ChevronDown, Eye, Download, Mail, ArrowUpDown, X, UserPlus } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample customer data
const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    status: "active",
    orders: 5,
    totalSpent: 645.99,
    lastOrder: "2023-03-15T10:30:00",
    dateJoined: "2022-11-05T08:15:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, USA",
    status: "active",
    orders: 3,
    totalSpent: 325.5,
    lastOrder: "2023-03-14T14:45:00",
    dateJoined: "2022-12-10T11:30:00",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, USA",
    status: "active",
    orders: 7,
    totalSpent: 890.25,
    lastOrder: "2023-03-14T09:15:00",
    dateJoined: "2022-09-22T15:45:00",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    location: "Miami, USA",
    status: "inactive",
    orders: 2,
    totalSpent: 159.99,
    lastOrder: "2023-02-20T16:20:00",
    dateJoined: "2023-01-15T09:10:00",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 876-5432",
    location: "Seattle, USA",
    status: "active",
    orders: 4,
    totalSpent: 475.25,
    lastOrder: "2023-03-12T11:10:00",
    dateJoined: "2022-10-05T14:20:00",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 345-6789",
    location: "Boston, USA",
    status: "active",
    orders: 6,
    totalSpent: 720.5,
    lastOrder: "2023-03-11T13:30:00",
    dateJoined: "2022-08-18T10:05:00",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 654-3210",
    location: "Denver, USA",
    status: "active",
    orders: 3,
    totalSpent: 295.75,
    lastOrder: "2023-03-10T15:45:00",
    dateJoined: "2022-12-22T16:30:00",
  },
  {
    id: 8,
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    phone: "+1 (555) 432-1098",
    location: "Austin, USA",
    status: "inactive",
    orders: 1,
    totalSpent: 85.0,
    lastOrder: "2023-01-15T10:20:00",
    dateJoined: "2023-01-05T13:45:00",
  },
  {
    id: 9,
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    phone: "+1 (555) 789-0123",
    location: "Portland, USA",
    status: "active",
    orders: 2,
    totalSpent: 175.25,
    lastOrder: "2023-03-08T09:15:00",
    dateJoined: "2023-02-10T11:20:00",
  },
  {
    id: 10,
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    phone: "+1 (555) 210-9876",
    location: "San Diego, USA",
    status: "active",
    orders: 4,
    totalSpent: 435.5,
    lastOrder: "2023-03-07T14:30:00",
    dateJoined: "2022-11-15T09:30:00",
  },
]

export default function CustomersManagementPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortField, setSortField] = useState("lastOrder")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter((customer) => {
    // Filter by search query
    if (
      searchQuery &&
      !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !customer.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && customer.status !== selectedStatus) {
      return false
    }

    return true
  })

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "orders") {
      return sortDirection === "asc" ? a.orders - b.orders : b.orders - a.orders
    } else if (sortField === "totalSpent") {
      return sortDirection === "asc" ? a.totalSpent - b.totalSpent : b.totalSpent - a.totalSpent
    } else if (sortField === "lastOrder") {
      return sortDirection === "asc"
        ? new Date(a.lastOrder).getTime() - new Date(b.lastOrder).getTime()
        : new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
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
    setNewCustomer((prev) => ({ ...prev, [name]: value }))
  }

  // Handle add new customer
  const handleAddCustomer = () => {
    // Validate form
    if (!newCustomer.name || !newCustomer.email) {
      return
    }

    // Create new customer
    const newCustomerData = {
      id: customers.length + 1,
      ...newCustomer,
      status: "active",
      orders: 0,
      totalSpent: 0,
      lastOrder: "",
      dateJoined: new Date().toISOString(),
    }

    // Add to customers
    setCustomers((prev) => [newCustomerData, ...prev])

    // Reset form
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      location: "",
    })
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
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={newCustomer.name}
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

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="New York, USA"
                        value={newCustomer.location}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                      currentItems.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">
                            {customer.name}
                            <div className="text-xs text-muted-foreground mt-1">
                              Joined {formatDate(customer.dateJoined)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              {customer.email}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{customer.phone}</div>
                          </TableCell>
                          <TableCell>{customer.location}</TableCell>
                          <TableCell>{customer.orders}</TableCell>
                          <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>{customer.lastOrder ? formatDate(customer.lastOrder) : "Never"}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                customer.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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
                                <DropdownMenuItem onClick={() => router.push(`/admin/customers/${customer.id}`)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push(`/admin/customers/edit/${customer.id}`)}>
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

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

