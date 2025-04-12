"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, Eye, ArrowUpDown, ChevronDown, X } from "lucide-react"
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Loading from "./loading"
import { useCurrency } from "@/contexts/currency-context"

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Urban Backpack",
    sku: "BP-URB-001",
    category: "backpack",
    price: 120,
    stock: 45,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: true,
    sales: 128,
  },
  {
    id: 2,
    name: "Hyper Backpack",
    sku: "BP-HYP-002",
    category: "backpack",
    price: 140,
    stock: 32,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 96,
  },
  {
    id: 3,
    name: "Smart Carry Backpack",
    sku: "BP-SCB-003",
    category: "backpack",
    price: 95,
    stock: 18,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 64,
  },
  {
    id: 4,
    name: "Aero Backpack",
    sku: "BP-AER-004",
    category: "backpack",
    price: 127,
    stock: 27,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: true,
    sales: 112,
  },
  {
    id: 5,
    name: "Commuter Backpack",
    sku: "BP-COM-005",
    category: "backpack",
    price: 110,
    stock: 38,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 87,
  },
  {
    id: 6,
    name: "Weekender Duffel",
    sku: "BG-WKD-006",
    category: "bag",
    price: 150,
    stock: 24,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 76,
  },
  {
    id: 7,
    name: "Messenger Bag",
    sku: "BG-MSG-007",
    category: "bag",
    price: 85,
    stock: 42,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 93,
  },
  {
    id: 8,
    name: "Laptop Sleeve",
    sku: "ACC-LTS-008",
    category: "accessory",
    price: 45,
    stock: 56,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 145,
  },
  {
    id: 9,
    name: "Travel Organizer",
    sku: "ACC-TRO-009",
    category: "accessory",
    price: 35,
    stock: 68,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: false,
    sales: 118,
  },
  {
    id: 10,
    name: "Water Bottle",
    sku: "ACC-WBT-010",
    category: "accessory",
    price: 18,
    stock: 94,
    image: "/placeholder.svg?height=300&width=300",
    status: "active",
    featured: true,
    sales: 203,
  },
]

// Sample inventory products (not yet in catalog)
const initialInventory = [
  {
    id: 101,
    name: "Pro Traveler Backpack",
    sku: "BP-PRO-001",
    category: "backpack",
    price: 165,
    stock: 24,
    image: "/placeholder.svg?height=300&width=300&text=Pro+Traveler",
  },
  {
    id: 102,
    name: "Weekend Duffle Bag",
    sku: "BG-DUF-002",
    category: "bag",
    price: 120,
    stock: 18,
    image: "/placeholder.svg?height=300&width=300&text=Weekend+Duffle",
  },
  {
    id: 103,
    name: "Cable Organizer",
    sku: "ACC-ORG-003",
    category: "accessory",
    price: 25,
    stock: 45,
    image: "/placeholder.svg?height=300&width=300&text=Cable+Organizer",
  },
]

interface ProductType {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  image: string
  status: string
  featured: boolean
  sales: number
}

export default function ProductManagementPage() {
  const router = useRouter()
  const { formatPrice } = useCurrency()
  const [products, setProducts] = useState(initialProducts)
  const [inventory, setInventory] = useState(initialInventory)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && product.status !== selectedStatus) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price
    } else if (sortField === "stock") {
      return sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock
    } else if (sortField === "sales") {
      return sortDirection === "asc" ? a.sales - b.sales : b.sales - a.sales
    }
    return 0
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle feature toggle
  const handleFeatureToggle = (id: number, featured: boolean) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, featured } : product)))

    toast({
      title: featured ? "Product Featured" : "Product Unfeatured",
      description: `${featured ? "Added to" : "Removed from"} featured products.`,
    })
  }

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))

    toast({
      title: "Product Deleted",
      description: "Product has been removed from catalog.",
    })
  }

  // Handle add to catalog
  const handleAddToCatalog = (product: ProductType) => {
    // Add to products
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        status: "active",
        featured: false,
        sales: 0,
      },
    ])

    // Remove from inventory
    setInventory((prev) => prev.filter((item) => item.id !== product.id))

    toast({
      title: "Product Added",
      description: `${product.name} has been added to the catalog.`,
    })
  }

  return (
    <Suspense fallback={<Loading />}>
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Product Management</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>View and manage your product catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or SKU..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="backpack">Backpacks</SelectItem>
                        <SelectItem value="bag">Bags</SelectItem>
                        <SelectItem value="accessory">Accessories</SelectItem>
                      </SelectContent>
                    </Select>

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
                        setSelectedCategory("all")
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
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                            Product
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("price")}>
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("stock")}>
                            Stock
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("sales")}>
                            Sales
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                            No products found
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentItems.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="relative w-10 h-10 rounded-md overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-muted-foreground">{product.sku}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </TableCell>
                            <TableCell>{formatPrice(product.price)}</TableCell>
                            <TableCell>
                              <span className={product.stock < 20 ? "text-destructive" : ""}>{product.stock}</span>
                            </TableCell>
                            <TableCell>{product.sales}</TableCell>
                            <TableCell>
                              <Switch
                                checked={product.featured}
                                onCheckedChange={(checked) => handleFeatureToggle(product.id, checked)}
                              />
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
                                  <DropdownMenuItem onClick={() => router.push(`/products/${product.id}`)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => router.push(`/admin/products/edit/${product.id}`)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                        <span className="text-destructive">Delete</span>
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete this product from your catalog.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDeleteProduct(product.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
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
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} of{" "}
                  {sortedProducts.length} products
                </div>

                <Button onClick={() => router.push("/admin/products/add")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Button>
              </CardFooter>
            </Card>

            {/* Inventory Products */}
            {inventory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Products</CardTitle>
                  <CardDescription>Products ready to be added to your catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inventory.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="relative aspect-square">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-muted-foreground">{product.sku}</span>
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm">
                              Category: <span className="capitalize">{product.category}</span>
                            </span>
                            <span className="text-sm">Stock: {product.stock}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full" onClick={() => handleAddToCatalog(product as ProductType)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Catalog
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
    </Suspense>
  )
}

