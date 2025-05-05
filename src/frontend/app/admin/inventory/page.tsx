"use client"

import type React from "react"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Trash2, Search, Loader2, AlertCircle } from "lucide-react"
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
import ProductHooks from "@/hooks/product-hooks"

// Loading Skeleton Components
function TableSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
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

export default function InventoryManagementPage() {
  // All hooks must be called at the top level
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { formatPrice } = useCurrency()
  
  const { useListProducts, useGetCategories, useUpdateProductStatus, useDeleteProduct } = ProductHooks()
  const { mutateAsync: changeProductStatus } = useUpdateProductStatus
  const { mutateAsync: deleteProduct } = useDeleteProduct
  
  const { 
    data: inventory, 
    isLoading: isInventoryLoading, 
    isError: isInventoryError,
    error: inventoryError,
    refetch: refetchInventory
  } = useListProducts()

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories
  } = useGetCategories()

  // Handle form input changes
  // const handleSelectChange = (name: string, value: string) => {
  //   setNewProduct((prev) => ({ ...prev, [name]: value }))
  // }

  // // Handle checkbox changes
  // const handleCheckboxChange = (name: string, checked: boolean) => {
  //   setNewProduct((prev) => ({ ...prev, [name]: checked }))
  // }

  // // Handle color selection
  // const handleColorChange = (color: string) => {
  //   setNewProduct((prev) => {
  //     const colors = [...prev.colors]
  //     if (colors.includes(color)) {
  //       return { ...prev, colors: colors.filter((c) => c !== color) }
  //     } else {
  //       return { ...prev, colors: [...colors, color] }
  //     }
  //   })
  // }

  // Handle download sample CSV
  // const handleDownloadSample = () => {
  //   toast({
  //     title: "Sample CSV",
  //     description: "Sample CSV template has been downloaded.",
  //   })
  // }


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
  const handlePublishProduct = (slug: string) => {
    setIsPublishing(true)
    const publishedProduct = inventory?.find((product) => product.slug === slug)
    if (publishedProduct === undefined) {
      toast({
        title: "Product Not Found",
        description: "Product not found in inventory.",
      })
      return
    }
    changeProductStatus({productId: publishedProduct.id, status: "published"})

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

  // Render loading state
  if (isInventoryLoading || isCategoriesLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Inventory Management</h1>
              <p className="text-muted-foreground">Add, edit, and manage your product inventory</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>View and manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <FilterSkeleton />
                <TableSkeleton />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 w-[120px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </CardFooter>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  // Render error state
  if (isInventoryError || isCategoriesError) {
    const error = inventoryError || categoriesError
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Inventory Management</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>View and manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorState 
                  message={"Internal server error. Please try again later."} 
                  onRetry={() => {
                    if (isInventoryError) refetchInventory()
                    if (isCategoriesError) refetchCategories()
                  }}
                />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  // Render main content
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Inventory Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage your product inventory</p>
          </div>

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
                              <Link href={`/admin/inventory/edit/${product.slug}`}>
                                <Button variant="outline" size="sm">Edit</Button>
                              </Link>

                              {product.status === "draft" && (
                                isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePublishProduct(product.slug)}
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
        </main>
      </div>
    </div>
  )
}

