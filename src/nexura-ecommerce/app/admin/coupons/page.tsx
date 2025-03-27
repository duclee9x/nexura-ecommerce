"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Power,
  PowerOff,
  Tag,
  Percent,
  DollarSign,
  Truck,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample product categories
const productCategories = [
  { id: 1, name: "Backpacks", count: 24 },
  { id: 2, name: "Bags", count: 18 },
  { id: 3, name: "Accessories", count: 32 },
  { id: 4, name: "Travel Gear", count: 15 },
  { id: 5, name: "Outdoor", count: 20 },
]

// Sample products
const products = [
  { id: 101, name: "Urban Backpack", category: "Backpacks", price: 89.99, sku: "BP-001" },
  { id: 102, name: "Travel Backpack", category: "Backpacks", price: 129.99, sku: "BP-002" },
  { id: 103, name: "Messenger Bag", category: "Bags", price: 69.99, sku: "BG-001" },
  { id: 104, name: "Laptop Sleeve", category: "Accessories", price: 29.99, sku: "ACC-001" },
  { id: 105, name: "Water Bottle", category: "Accessories", price: 19.99, sku: "ACC-002" },
  { id: 106, name: "Travel Pillow", category: "Travel Gear", price: 24.99, sku: "TG-001" },
  { id: 107, name: "Hiking Backpack", category: "Outdoor", price: 149.99, sku: "OUT-001" },
  { id: 108, name: "Duffel Bag", category: "Bags", price: 79.99, sku: "BG-002" },
]

// Sample coupon data
const initialCoupons = [
  {
    id: 1,
    code: "SUMMER23",
    type: "percentage",
    value: 20,
    minPurchase: 50,
    maxUses: 1000,
    usedCount: 145,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "active",
    productScope: "all",
    customerScope: "all",
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: 2,
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 0,
    maxUses: null,
    usedCount: 278,
    startDate: "2023-01-01",
    endDate: null,
    status: "active",
    productScope: "all",
    customerScope: "new",
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: 3,
    code: "FLASH50",
    type: "percentage",
    value: 50,
    minPurchase: 100,
    maxUses: 500,
    usedCount: 0,
    startDate: "2023-09-10",
    endDate: "2023-09-15",
    status: "scheduled",
    productScope: "categories",
    customerScope: "all",
    selectedCategories: [1, 3],
    selectedProducts: [],
  },
  {
    id: 4,
    code: "FREESHIP",
    type: "shipping",
    value: 15,
    minPurchase: 75,
    maxUses: 2000,
    usedCount: 523,
    startDate: "2023-05-15",
    endDate: "2023-12-31",
    status: "active",
    productScope: "all",
    customerScope: "all",
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: 5,
    code: "HOLIDAY25",
    type: "percentage",
    value: 25,
    minPurchase: 150,
    maxUses: 1000,
    usedCount: 0,
    startDate: "2023-12-01",
    endDate: "2023-12-25",
    status: "scheduled",
    productScope: "products",
    customerScope: "all",
    selectedCategories: [],
    selectedProducts: [101, 103, 106],
  },
  {
    id: 6,
    code: "EXPIRED20",
    type: "percentage",
    value: 20,
    minPurchase: 50,
    maxUses: 1000,
    usedCount: 842,
    startDate: "2022-11-20",
    endDate: "2023-01-05",
    status: "expired",
    productScope: "all",
    customerScope: "all",
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: 7,
    code: "DISABLED15",
    type: "percentage",
    value: 15,
    minPurchase: 25,
    maxUses: 500,
    usedCount: 123,
    startDate: "2023-02-01",
    endDate: "2023-12-31",
    status: "disabled",
    productScope: "all",
    customerScope: "all",
    selectedCategories: [],
    selectedProducts: [],
  },
]

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [coupons, setCoupons] = useState(initialCoupons)
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false)
  const [isEditCouponOpen, setIsEditCouponOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [selectedProductTab, setSelectedProductTab] = useState("categories")
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([])
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "percentage",
    value: "",
    minPurchase: "",
    maxUses: "",
    productScope: "all",
    customerScope: "all",
    selectedCategories: [] as number[],
    selectedProducts: [] as number[],
  })

  const { toast } = useToast()

  // Filter coupons based on search and status filter
  const filteredCoupons = coupons.filter((coupon) => {
    // Filter by search query
    if (searchQuery && !coupon.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && coupon.status !== statusFilter) {
      return false
    }

    return true
  })

  // Handle copy coupon code
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Coupon code copied",
      description: `"${code}" has been copied to clipboard.`,
    })
  }

  // Handle enable/disable coupon
  const handleToggleCouponStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "disabled" : "active"

    setCoupons(coupons.map((coupon) => (coupon.id === id ? { ...coupon, status: newStatus } : coupon)))

    toast({
      title: `Coupon ${newStatus === "active" ? "enabled" : "disabled"}`,
      description: `The coupon has been ${newStatus === "active" ? "enabled" : "disabled"} successfully.`,
    })
  }

  // Handle delete coupon
  const handleDeleteCoupon = (id: number) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id))

    toast({
      title: "Coupon deleted",
      description: "The coupon has been successfully deleted.",
    })
  }

  // Handle edit coupon
  const handleEditCoupon = (coupon: any) => {
    setSelectedCoupon(coupon)
    setStartDate(coupon.startDate ? new Date(coupon.startDate) : new Date())
    setEndDate(coupon.endDate ? new Date(coupon.endDate) : undefined)
    setSelectedCategoryIds(coupon.selectedCategories || [])
    setSelectedProductIds(coupon.selectedProducts || [])
    setSelectedProductTab(coupon.productScope === "categories" ? "categories" : "products")
    setIsEditCouponOpen(true)
  }

  // Handle save edited coupon
  const handleSaveEditedCoupon = () => {
    if (!selectedCoupon) return

    const updatedCoupon = {
      ...selectedCoupon,
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : null,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : null,
      selectedCategories: selectedCategoryIds,
      selectedProducts: selectedProductIds,
    }

    setCoupons(coupons.map((coupon) => (coupon.id === selectedCoupon.id ? updatedCoupon : coupon)))

    setIsEditCouponOpen(false)

    toast({
      title: "Coupon updated",
      description: "The coupon has been successfully updated.",
    })
  }

  // Handle create new coupon
  const handleCreateCoupon = () => {
    // Validate required fields
    if (!newCoupon.code || !newCoupon.type || !newCoupon.value) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new coupon object
    const couponToAdd = {
      id: Math.max(...coupons.map((c) => c.id)) + 1,
      ...newCoupon,
      value: Number.parseFloat(newCoupon.value),
      minPurchase: newCoupon.minPurchase ? Number.parseFloat(newCoupon.minPurchase) : 0,
      maxUses: newCoupon.maxUses ? Number.parseInt(newCoupon.maxUses) : null,
      usedCount: 0,
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : null,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : null,
      status: "active",
      selectedCategories: newCoupon.productScope === "categories" ? selectedCategoryIds : [],
      selectedProducts: newCoupon.productScope === "products" ? selectedProductIds : [],
    }

    // Add to coupons list
    setCoupons([couponToAdd, ...coupons])

    // Reset form
    setNewCoupon({
      code: "",
      type: "percentage",
      value: "",
      minPurchase: "",
      maxUses: "",
      productScope: "all",
      customerScope: "all",
      selectedCategories: [],
      selectedProducts: [],
    })
    setStartDate(new Date())
    setEndDate(undefined)
    setSelectedCategoryIds([])
    setSelectedProductIds([])
    setIsAddCouponOpen(false)

    toast({
      title: "Coupon created",
      description: "The new coupon has been successfully created.",
    })
  }

  // Toggle category selection
  const toggleCategorySelection = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Toggle product selection
  const toggleProductSelection = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  // Get discount type icon
  const getDiscountTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4 mr-2" />
      case "fixed":
        return <DollarSign className="h-4 w-4 mr-2" />
      case "shipping":
        return <Truck className="h-4 w-4 mr-2" />
      default:
        return <Tag className="h-4 w-4 mr-2" />
    }
  }

  // Get product scope display text
  const getProductScopeText = (coupon: any) => {
    if (coupon.productScope === "all") {
      return "All products"
    } else if (coupon.productScope === "categories") {
      const categoryCount = coupon.selectedCategories.length
      return categoryCount === 1 ? "1 category" : `${categoryCount} categories`
    } else if (coupon.productScope === "products") {
      const productCount = coupon.selectedProducts.length
      return productCount === 1 ? "1 product" : `${productCount} products`
    }
    return "Unknown"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Coupon Management</h1>
              <p className="text-muted-foreground">Create and manage discount coupons for your store</p>
            </div>
            <Dialog open={isAddCouponOpen} onOpenChange={setIsAddCouponOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Coupon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Coupon</DialogTitle>
                  <DialogDescription>Fill in the details to create a new discount coupon.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Coupon Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="code"
                      placeholder="e.g. SUMMER23"
                      className="col-span-3"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Discount Type <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={newCoupon.type}
                      onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <div className="flex items-center">
                            <Percent className="h-4 w-4 mr-2" />
                            Percentage Discount
                          </div>
                        </SelectItem>
                        <SelectItem value="fixed">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Fixed Amount
                          </div>
                        </SelectItem>
                        <SelectItem value="shipping">
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 mr-2" />
                            Free Shipping
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="value" className="text-right">
                      Discount Value <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative col-span-3">
                      {newCoupon.type === "percentage" && (
                        <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      {newCoupon.type === "fixed" && (
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      <Input
                        id="value"
                        type="number"
                        placeholder={newCoupon.type === "percentage" ? "e.g. 20" : "e.g. 10.00"}
                        className={newCoupon.type === "fixed" ? "pl-8" : undefined}
                        value={newCoupon.value}
                        onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="min-purchase" className="text-right">
                      Min Purchase
                    </Label>
                    <div className="relative col-span-3">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="min-purchase"
                        type="number"
                        placeholder="e.g. 50"
                        className="pl-8"
                        value={newCoupon.minPurchase}
                        onChange={(e) => setNewCoupon({ ...newCoupon, minPurchase: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="max-uses" className="text-right">
                      Max Uses
                    </Label>
                    <Input
                      id="max-uses"
                      type="number"
                      placeholder="Leave empty for unlimited"
                      className="col-span-3"
                      value={newCoupon.maxUses}
                      onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="col-span-3 justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="col-span-3 justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>No end date (ongoing)</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Products</Label>
                    <Select
                      defaultValue="all"
                      value={newCoupon.productScope}
                      onValueChange={(value) => {
                        setNewCoupon({ ...newCoupon, productScope: value })
                        if (value === "categories") {
                          setSelectedProductTab("categories")
                        } else if (value === "products") {
                          setSelectedProductTab("products")
                        }
                      }}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="categories">Selected Categories</SelectItem>
                        <SelectItem value="products">Selected Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newCoupon.productScope !== "all" && (
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-start-2 col-span-3">
                        <Tabs value={selectedProductTab} onValueChange={setSelectedProductTab}>
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="categories" disabled={newCoupon.productScope !== "categories"}>
                              Categories
                            </TabsTrigger>
                            <TabsTrigger value="products" disabled={newCoupon.productScope !== "products"}>
                              Products
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="categories" className="mt-2">
                            <ScrollArea className="h-[200px] border rounded-md p-4">
                              <div className="space-y-4">
                                {productCategories.map((category) => (
                                  <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`category-${category.id}`}
                                      checked={selectedCategoryIds.includes(category.id)}
                                      onCheckedChange={() => toggleCategorySelection(category.id)}
                                    />
                                    <Label htmlFor={`category-${category.id}`} className="flex-1">
                                      {category.name}
                                      <span className="text-muted-foreground text-xs ml-2">
                                        ({category.count} products)
                                      </span>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {selectedCategoryIds.length} categories selected
                            </div>
                          </TabsContent>
                          <TabsContent value="products" className="mt-2">
                            <div className="mb-2">
                              <Input placeholder="Search products..." className="mb-2" />
                            </div>
                            <ScrollArea className="h-[200px] border rounded-md p-4">
                              <div className="space-y-4">
                                {products.map((product) => (
                                  <div key={product.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`product-${product.id}`}
                                      checked={selectedProductIds.includes(product.id)}
                                      onCheckedChange={() => toggleProductSelection(product.id)}
                                    />
                                    <Label htmlFor={`product-${product.id}`} className="flex-1">
                                      {product.name}
                                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                                        <span className="mr-2">{product.sku}</span>
                                        <span className="mr-2">•</span>
                                        <span className="mr-2">{product.category}</span>
                                        <span className="mr-2">•</span>
                                        <span>${product.price.toFixed(2)}</span>
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {selectedProductIds.length} products selected
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Customers</Label>
                    <Select
                      defaultValue="all"
                      value={newCoupon.customerScope}
                      onValueChange={(value) => setNewCoupon({ ...newCoupon, customerScope: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="new">New Customers</SelectItem>
                        <SelectItem value="returning">Returning Customers</SelectItem>
                        <SelectItem value="specific">Specific Customer Groups</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCouponOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleCreateCoupon}>
                    Create Coupon
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Coupons</CardTitle>
                  <CardDescription>Manage your store's discount coupons</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search coupons..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Min Purchase</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Applies To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No coupons found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCoupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-medium">{coupon.code}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getDiscountTypeIcon(coupon.type)}
                            {coupon.type === "percentage"
                              ? `${coupon.value}%`
                              : coupon.type === "fixed"
                                ? `$${coupon.value}`
                                : `Free shipping (min $${coupon.minPurchase})`}
                          </div>
                        </TableCell>
                        <TableCell>${coupon.minPurchase}</TableCell>
                        <TableCell>
                          {coupon.usedCount} / {coupon.maxUses || "∞"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {getProductScopeText(coupon)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              coupon.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : coupon.status === "scheduled"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : coupon.status === "disabled"
                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleCopyCoupon(coupon.code)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Code
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditCoupon(coupon)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {coupon.status !== "expired" && (
                                <DropdownMenuItem onClick={() => handleToggleCouponStatus(coupon.id, coupon.status)}>
                                  {coupon.status === "active" ? (
                                    <>
                                      <PowerOff className="h-4 w-4 mr-2" />
                                      Disable
                                    </>
                                  ) : (
                                    <>
                                      <Power className="h-4 w-4 mr-2" />
                                      Enable
                                    </>
                                  )}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById(`delete-coupon-${coupon.id}`)?.click()
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialog>
                            <AlertDialogTrigger className="hidden" id={`delete-coupon-${coupon.id}`} />
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the coupon "{coupon.code}". This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCoupon(coupon.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredCoupons.length} of {coupons.length} coupons
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>

      {/* Edit Coupon Dialog */}
      <Dialog open={isEditCouponOpen} onOpenChange={setIsEditCouponOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>Update the details for coupon "{selectedCoupon?.code}".</DialogDescription>
          </DialogHeader>
          {selectedCoupon && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-code" className="text-right">
                  Coupon Code
                </Label>
                <Input
                  id="edit-code"
                  value={selectedCoupon.code}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, code: e.target.value.toUpperCase() })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Discount Type
                </Label>
                <Select
                  value={selectedCoupon.type}
                  onValueChange={(value) => setSelectedCoupon({ ...selectedCoupon, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      <div className="flex items-center">
                        <Percent className="h-4 w-4 mr-2" />
                        Percentage Discount
                      </div>
                    </SelectItem>
                    <SelectItem value="fixed">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Fixed Amount
                      </div>
                    </SelectItem>
                    <SelectItem value="shipping">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Free Shipping
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Discount Value
                </Label>
                <div className="relative col-span-3">
                  {selectedCoupon.type === "percentage" && (
                    <Percent className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  )}
                  {selectedCoupon.type === "fixed" && (
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  )}
                  <Input
                    id="edit-value"
                    type="number"
                    value={selectedCoupon.value}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, value: Number.parseFloat(e.target.value) })}
                    className={selectedCoupon.type === "fixed" ? "pl-8" : undefined}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-min-purchase" className="text-right">
                  Min Purchase
                </Label>
                <div className="relative col-span-3">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="edit-min-purchase"
                    type="number"
                    value={selectedCoupon.minPurchase}
                    onChange={(e) =>
                      setSelectedCoupon({ ...selectedCoupon, minPurchase: Number.parseFloat(e.target.value) })
                    }
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-max-uses" className="text-right">
                  Max Uses
                </Label>
                <Input
                  id="edit-max-uses"
                  type="number"
                  value={selectedCoupon.maxUses || ""}
                  onChange={(e) =>
                    setSelectedCoupon({
                      ...selectedCoupon,
                      maxUses: e.target.value ? Number.parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="Leave empty for unlimited"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="col-span-3 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="col-span-3 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>No end date (ongoing)</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Products</Label>
                <Select
                  value={selectedCoupon.productScope}
                  onValueChange={(value) => {
                    setSelectedCoupon({ ...selectedCoupon, productScope: value })
                    if (value === "categories") {
                      setSelectedProductTab("categories")
                    } else if (value === "products") {
                      setSelectedProductTab("products")
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="categories">Selected Categories</SelectItem>
                    <SelectItem value="products">Selected Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedCoupon.productScope !== "all" && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-start-2 col-span-3">
                    <Tabs value={selectedProductTab} onValueChange={setSelectedProductTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="categories" disabled={selectedCoupon.productScope !== "categories"}>
                          Categories
                        </TabsTrigger>
                        <TabsTrigger value="products" disabled={selectedCoupon.productScope !== "products"}>
                          Products
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="categories" className="mt-2">
                        <ScrollArea className="h-[200px] border rounded-md p-4">
                          <div className="space-y-4">
                            {productCategories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edit-category-${category.id}`}
                                  checked={selectedCategoryIds.includes(category.id)}
                                  onCheckedChange={() => toggleCategorySelection(category.id)}
                                />
                                <Label htmlFor={`edit-category-${category.id}`} className="flex-1">
                                  {category.name}
                                  <span className="text-muted-foreground text-xs ml-2">
                                    ({category.count} products)
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {selectedCategoryIds.length} categories selected
                        </div>
                      </TabsContent>
                      <TabsContent value="products" className="mt-2">
                        <div className="mb-2">
                          <Input placeholder="Search products..." className="mb-2" />
                        </div>
                        <ScrollArea className="h-[200px] border rounded-md p-4">
                          <div className="space-y-4">
                            {products.map((product) => (
                              <div key={product.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edit-product-${product.id}`}
                                  checked={selectedProductIds.includes(product.id)}
                                  onCheckedChange={() => toggleProductSelection(product.id)}
                                />
                                <Label htmlFor={`edit-product-${product.id}`} className="flex-1">
                                  {product.name}
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <span className="mr-2">{product.sku}</span>
                                    <span className="mr-2">•</span>
                                    <span className="mr-2">{product.category}</span>
                                    <span className="mr-2">•</span>
                                    <span>${product.price.toFixed(2)}</span>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {selectedProductIds.length} products selected
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Customers</Label>
                <Select
                  value={selectedCoupon.customerScope}
                  onValueChange={(value) => setSelectedCoupon({ ...selectedCoupon, customerScope: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                    <SelectItem value="returning">Returning Customers</SelectItem>
                    <SelectItem value="specific">Specific Customer Groups</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCouponOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveEditedCoupon}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

