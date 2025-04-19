"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Trash2, Search, Loader2 } from "lucide-react"
import Link from "next/link"
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
import { useCurrency } from "@/contexts/currency-context"
import { deleteProductGateway, getAllCategoryGateway, listProductsGateway, updateProductGateway } from "@/gateway/gateway"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Product } from "@/protos/nexura"


export default function InventoryManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { formatPrice } = useCurrency()
  const queryClient = useQueryClient()

  const { 
    data: inventory, 
    isLoading: isInventoryLoading, 
    isError: isInventoryError,
    error: inventoryError 
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      try {
        const res = await listProductsGateway()
        return res.products
      } catch (error) {
        console.error("Error fetching inventory:", error)
        throw new Error("Failed to load inventory. Please try again later.")
      }
    },
    retry: 1,
    refetchOnWindowFocus: false
  })

  const {
    data: categories,
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await getAllCategoryGateway()
        return res.categories
      } catch (error) {
        console.error("Error fetching categories:", error)
        throw new Error("Failed to load categories. Please try again later.")
      }
    },
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.stringify(categories, null, 2), "categories")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const { mutate: publishProduct } = useMutation({
    mutationFn: (product: Product) => updateProductGateway(product),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] })
      await queryClient.prefetchQuery({ queryKey: ["inventory"], queryFn: ()=>listProductsGateway().then((res) => res.products) });
    }
  })

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (productId: string) => deleteProductGateway(productId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] })
      await queryClient.prefetchQuery({ queryKey: ["inventory"], queryFn: ()=>listProductsGateway().then((res) => res.products) });
    }
  })

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
  const productCategories = inventory?.map((product) => product.categories).flat()
  // Handle form input changes
 
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
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()

  //   // Validate form
  //   if (!newProduct.sku || !newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
  //     toast({
  //       title: "Validation Error",
  //       description: "Please fill in all required fields.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   // Create new product
  //   const product = {
  //     id: Date.now(),
  //     ...newProduct,
  //     price: Number.parseFloat(newProduct.price),
  //     stock: Number.parseInt(newProduct.stock),
  //     status: "draft",
  //   }

  //   // Add to inventory
  //   setInventory((prev) => [product, ...prev])

  //   // Reset form
  //   setNewProduct({
  //     sku: "",
  //     name: "",
  //     description: "",
  //     category: "",
  //     type: "",
  //     price: "",
  //     stock: "",
  //     colors: [],
  //     featured: false,
  //     new: false,
  //     sale: false,
  //   })

  //   // Show success message
  //   toast({
  //     title: "Product Added",
  //     description: `${product.name} has been added to inventory.`,
  //   })

  //   // Switch to inventory tab
  //   setActiveTab("inventory")
  // }

  // Handle file selection for bulk upload
  // const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (!file) return

  //   // Check file type
  //   if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
  //     toast({
  //       title: "Invalid File",
  //       description: "Please upload a CSV file.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   // Simulate file upload
  //   setIsUploading(true)
  //   setUploadProgress(0)

  //   // Reset results
  //   setUploadResults({ success: 0, errors: [] })
  //   setShowUploadResults(false)

  //   // Simulate progress
  //   const interval = setInterval(() => {
  //     setUploadProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval)
  //         return 100
  //       }
  //       return prev + 5
  //     })
  //   }, 200)

  //   // Simulate processing
  //   setTimeout(() => {
  //     clearInterval(interval)
  //     setUploadProgress(100)
  //     setIsUploading(false)

  //     // Simulate results
  //     const success = Math.floor(Math.random() * 10) + 5
  //     const errors = []

  //     // Generate some random errors
  //     if (Math.random() > 0.5) {
  //       errors.push({ row: 2, message: "Invalid SKU format" })
  //       errors.push({ row: 5, message: "Price must be a number" })
  //       errors.push({ row: 8, message: "Missing required field: category" })
  //     }

  //     setUploadResults({ success, errors })
  //     setShowUploadResults(true)

  //     // Add some sample products to inventory
  //     const newProducts = Array(success)
  //       .fill(0)
  //       .map((_, i) => ({
  //         id: Date.now() + i,
  //         sku: `BULK-${Date.now()}-${i}`,
  //         name: `Bulk Uploaded Product ${i + 1}`,
  //         category: productCategories[Math.floor(Math.random() * productCategories.length)],
  //         type: productTypes[Math.floor(Math.random() * productTypes.length)],
  //         price: Math.floor(Math.random() * 100) + 20,
  //         stock: Math.floor(Math.random() * 50) + 10,
  //         colors: [colorOptions[Math.floor(Math.random() * colorOptions.length)]],
  //         status: "draft",
  //       }))

  //     setInventory((prev) => [...newProducts, ...prev])

  //     // Reset file input
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = ""
  //     }
  //   }, 3000)
  // }

  // Handle download sample CSV
  const handleDownloadSample = () => {
    // In a real app, this would generate and download a CSV file
    toast({
      title: "Sample CSV",
      description: "Sample CSV template has been downloaded.",
    })
  }

  // Get unique categories from inventory
  const usedCategories = inventory
    ? [...new Set(inventory.flatMap(product => product.categories))]
        .map(categoryId => categories?.find(c => c.id === categoryId))
        .filter((category): category is NonNullable<typeof category> => category !== undefined)
        .sort((a, b) => a.name.localeCompare(b.name))
    : []

  // Filter inventory based on search and filters
  const filteredInventory = inventory?.filter((product) => {
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
    if (selectedCategory !== "all" && product.categories.filter((category) => category.includes(selectedCategory)).length === 0) {
      return false
    }

    return true
  })

  // Handle publish product
  const handlePublishProduct = (id: string) => {
    setIsPublishing(true)
    const publishedProduct = inventory?.find((product) => product.id === id)
    if (publishedProduct === undefined) {
      toast({
        title: "Product Not Found",
        description: "Product not found in inventory.",
      })
      return
    }
    publishedProduct.status = "published"
    publishProduct(publishedProduct)

    toast({
      title: "Product Published",
      description: "Product has been published to the catalog.",
    })
    setIsPublishing(false)
  }
  // Handle delete product
  const handleDeleteProduct = (id: string) => {
    setIsDeleting(true)
    const deletedProduct = inventory?.find((product) => product.id === id)
    if (deletedProduct === undefined) {
      toast({
        title: "Product Not Found",
        description: "Product not found in inventory.",
      })
      return
    }
    deleteProduct(deletedProduct.id)
    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory.",
    })
    setIsDeleting(false)
  }

  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Inventory Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage your product inventory</p>
          </div>

          {isInventoryError ? (
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
              <div className="text-destructive text-lg font-semibold">
                {inventoryError instanceof Error ? inventoryError.message : "Failed to load inventory"}
              </div>
              <Button 
                variant="outline" 
                onClick={() => queryClient.invalidateQueries({ queryKey: ["inventory"] })}
              >
                Retry
              </Button>
            </div>
          ) : (isInventoryLoading || isCategoriesLoading) ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
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
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
                        <TableHead className="text-right">Min Price</TableHead>
                        <TableHead className="text-right">Max Price</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!filteredInventory || filteredInventory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                            No products found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInventory.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.sku}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                              {product.categories.map((category) => categories?.find((c) => c.id === category)?.name).join(", ")}
                            </TableCell>
                            <TableCell className="text-right">{formatPrice(product.variants.reduce((prev, curr) => prev < curr.price ? prev : curr.price, 0))}</TableCell>
                            <TableCell className="text-right">{formatPrice(product.variants.reduce((prev, curr) => prev > curr.price ? prev : curr.price, 0))}</TableCell>
                            <TableCell className="text-right">{product.variants.reduce((prev, curr) => prev + (curr.stock?.quantity || 0), 0)}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === "published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }`}
                              >
                                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Link href={`/admin/inventory/edit/${product.id}`}>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </Link>

                                {product.status === "draft" && (
                                  isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> :
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
                <div>Showing {filteredInventory?.length || 0} of {inventory?.length || 0} products</div>
                <Link href="/admin/inventory/add">
                  <Button className="button-primary">Add Product</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

