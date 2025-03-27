"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Upload, Plus, FileText, AlertCircle, CheckCircle2, Download, Info, Trash2, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

// Sample product categories and types
const productCategories = ["backpack", "bag", "accessory"]
const productTypes = ["everyday", "travel", "sport", "business"]
const colorOptions = ["black", "gray", "blue", "green", "red", "brown"]

// Sample inventory data
const initialInventory = [
  {
    id: 101,
    sku: "BP-PRO-001",
    name: "Pro Traveler Backpack",
    category: "backpack",
    type: "travel",
    price: 165,
    stock: 24,
    colors: ["black", "gray", "blue"],
    status: "draft",
  },
  {
    id: 102,
    sku: "BG-DUF-002",
    name: "Weekend Duffle Bag",
    category: "bag",
    type: "travel",
    price: 120,
    stock: 18,
    colors: ["black", "brown"],
    status: "draft",
  },
  {
    id: 103,
    sku: "ACC-ORG-003",
    name: "Cable Organizer",
    category: "accessory",
    type: "travel",
    price: 25,
    stock: 45,
    colors: ["black", "gray"],
    status: "draft",
  },
  {
    id: 104,
    sku: "BP-CMP-004",
    name: "Compact Daypack",
    category: "backpack",
    type: "everyday",
    price: 85,
    stock: 32,
    colors: ["black", "blue", "red"],
    status: "published",
  },
  {
    id: 105,
    sku: "ACC-WBT-005",
    name: "Insulated Water Bottle",
    category: "accessory",
    type: "sport",
    price: 28,
    stock: 56,
    colors: ["black", "blue", "green"],
    status: "published",
  },
]

export default function InventoryManagementPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("inventory")
  const [inventory, setInventory] = useState(initialInventory)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // New product form state
  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    type: "",
    price: "",
    stock: "",
    colors: [] as string[],
    featured: false,
    new: false,
    sale: false,
  })

  // Bulk upload state
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResults, setUploadResults] = useState<{
    success: number
    errors: Array<{ row: number; message: string }>
  }>({ success: 0, errors: [] })
  const [showUploadResults, setShowUploadResults] = useState(false)

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setNewProduct((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle color selection
  const handleColorChange = (color: string) => {
    setNewProduct((prev) => {
      const colors = [...prev.colors]
      if (colors.includes(color)) {
        return { ...prev, colors: colors.filter((c) => c !== color) }
      } else {
        return { ...prev, colors: [...colors, color] }
      }
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newProduct.sku || !newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new product
    const product = {
      id: Date.now(),
      ...newProduct,
      price: Number.parseFloat(newProduct.price),
      stock: Number.parseInt(newProduct.stock),
      status: "draft",
    }

    // Add to inventory
    setInventory((prev) => [product, ...prev])

    // Reset form
    setNewProduct({
      sku: "",
      name: "",
      description: "",
      category: "",
      type: "",
      price: "",
      stock: "",
      colors: [],
      featured: false,
      new: false,
      sale: false,
    })

    // Show success message
    toast({
      title: "Product Added",
      description: `${product.name} has been added to inventory.`,
    })

    // Switch to inventory tab
    setActiveTab("inventory")
  }

  // Handle file selection for bulk upload
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV file.",
        variant: "destructive",
      })
      return
    }

    // Simulate file upload
    setIsUploading(true)
    setUploadProgress(0)

    // Reset results
    setUploadResults({ success: 0, errors: [] })
    setShowUploadResults(false)

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate processing
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      setIsUploading(false)

      // Simulate results
      const success = Math.floor(Math.random() * 10) + 5
      const errors = []

      // Generate some random errors
      if (Math.random() > 0.5) {
        errors.push({ row: 2, message: "Invalid SKU format" })
        errors.push({ row: 5, message: "Price must be a number" })
        errors.push({ row: 8, message: "Missing required field: category" })
      }

      setUploadResults({ success, errors })
      setShowUploadResults(true)

      // Add some sample products to inventory
      const newProducts = Array(success)
        .fill(0)
        .map((_, i) => ({
          id: Date.now() + i,
          sku: `BULK-${Date.now()}-${i}`,
          name: `Bulk Uploaded Product ${i + 1}`,
          category: productCategories[Math.floor(Math.random() * productCategories.length)],
          type: productTypes[Math.floor(Math.random() * productTypes.length)],
          price: Math.floor(Math.random() * 100) + 20,
          stock: Math.floor(Math.random() * 50) + 10,
          colors: [colorOptions[Math.floor(Math.random() * colorOptions.length)]],
          status: "draft",
        }))

      setInventory((prev) => [...newProducts, ...prev])

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 3000)
  }

  // Handle download sample CSV
  const handleDownloadSample = () => {
    // In a real app, this would generate and download a CSV file
    toast({
      title: "Sample CSV",
      description: "Sample CSV template has been downloaded.",
    })
  }

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && product.status !== selectedStatus) {
      return false
    }

    // Filter by category
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false
    }

    return true
  })

  // Handle publish product
  const handlePublishProduct = (id: number) => {
    setInventory((prev) => prev.map((product) => (product.id === id ? { ...product, status: "published" } : product)))

    toast({
      title: "Product Published",
      description: "Product has been published to the catalog.",
    })
  }

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    setInventory((prev) => prev.filter((product) => product.id !== id))

    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Inventory Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage your product inventory</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="add-product">Add Product</TabsTrigger>
            </TabsList>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>View and manage your product inventory</CardDescription>
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
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {productCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>SKU</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInventory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                              No products found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredInventory.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.sku}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </TableCell>
                              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">{product.stock}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    product.status === "published"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }`}
                                >
                                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push(`/admin/inventory/edit/${product.id}`)}
                                  >
                                    Edit
                                  </Button>

                                  {product.status === "draft" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handlePublishProduct(product.id)}
                                    >
                                      Publish
                                    </Button>
                                  )}

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete this product from your inventory.
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
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredInventory.length} of {inventory.length} products
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Bulk Upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Bulk Upload Products</DialogTitle>
                        <DialogDescription>Upload a CSV file to add multiple products at once.</DialogDescription>
                      </DialogHeader>

                      {!isUploading && !showUploadResults ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="csv-upload"
                              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 border-gray-300 dark:border-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileText className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">CSV file only (MAX. 10MB)</p>
                              </div>
                              <input
                                id="csv-upload"
                                type="file"
                                accept=".csv"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                              />
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Need help? Download our sample CSV template.
                              </span>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleDownloadSample}>
                              <Download className="h-4 w-4 mr-2" />
                              Template
                            </Button>
                          </div>
                        </div>
                      ) : isUploading ? (
                        <div className="space-y-6 py-4">
                          <div className="text-center">
                            <h3 className="font-medium mb-2">Uploading and Processing...</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Please wait while we process your file.
                            </p>
                          </div>

                          <Progress value={uploadProgress} className="h-2" />

                          <div className="text-center text-sm text-muted-foreground">
                            {uploadProgress < 100 ? "Uploading..." : "Processing..."}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6 py-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="font-medium mb-2">Upload Complete</h3>
                            <p className="text-sm text-muted-foreground">Your products have been processed.</p>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Successfully imported:</span>
                              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                {uploadResults.success} products
                              </span>
                            </div>

                            {uploadResults.errors.length > 0 && (
                              <div className="mt-4">
                                <div className="flex items-center mb-2">
                                  <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                                  <span className="text-sm font-medium">Errors:</span>
                                </div>
                                <ul className="text-sm text-destructive space-y-1 mt-2">
                                  {uploadResults.errors.map((error, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="font-medium mr-1">Row {error.row}:</span>
                                      <span>{error.message}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        {!isUploading && showUploadResults ? (
                          <Button onClick={() => setShowUploadResults(false)}>Done</Button>
                        ) : (
                          <Button variant="outline" disabled={isUploading}>
                            Cancel
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Add Product Tab */}
            <TabsContent value="add-product" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Fill in the details to add a new product to your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sku">
                          SKU <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="sku"
                          name="sku"
                          placeholder="e.g., BP-URB-001"
                          value={newProduct.sku}
                          onChange={handleInputChange}
                          required
                        />
                        <p className="text-xs text-muted-foreground">Unique identifier for your product</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Product Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="e.g., Urban Backpack"
                          value={newProduct.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter product description..."
                        rows={4}
                        value={newProduct.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={newProduct.type} onValueChange={(value) => handleSelectChange("type", value)}>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {productTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">
                          Price ($) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={newProduct.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock">
                          Stock Quantity <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="0"
                          value={newProduct.stock}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Colors</Label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {colorOptions.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox
                              id={`color-${color}`}
                              checked={newProduct.colors.includes(color)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleColorChange(color)
                                } else {
                                  handleColorChange(color)
                                }
                              }}
                            />
                            <div className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full mr-2 bg-${
                                  color === "black"
                                    ? "black"
                                    : color === "gray"
                                      ? "gray-400"
                                      : color === "blue"
                                        ? "blue-600"
                                        : color === "green"
                                          ? "green-600"
                                          : color === "red"
                                            ? "red-600"
                                            : "brown-600"
                                }`}
                              ></div>
                              <Label htmlFor={`color-${color}`} className="capitalize">
                                {color}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Product Features</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="featured"
                            checked={newProduct.featured}
                            onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
                          />
                          <Label htmlFor="featured">Featured Product</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="new"
                            checked={newProduct.new}
                            onCheckedChange={(checked) => handleCheckboxChange("new", checked === true)}
                          />
                          <Label htmlFor="new">New Arrival</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sale"
                            checked={newProduct.sale}
                            onCheckedChange={(checked) => handleCheckboxChange("sale", checked === true)}
                          />
                          <Label htmlFor="sale">On Sale</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setNewProduct({
                            sku: "",
                            name: "",
                            description: "",
                            category: "",
                            type: "",
                            price: "",
                            stock: "",
                            colors: [],
                            featured: false,
                            new: false,
                            sale: false,
                          })
                        }}
                      >
                        Reset
                      </Button>
                      <Button type="submit">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

