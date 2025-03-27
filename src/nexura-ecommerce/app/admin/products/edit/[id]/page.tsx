"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, ArrowLeft, Trash2, Plus, X, Upload, Move, Eye, LinkIcon, AlertTriangle } from "lucide-react"
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

// Sample related products
const relatedProducts = [
  { id: 2, name: "Hyper Backpack", sku: "BP-HYP-002", price: 140 },
  { id: 3, name: "Smart Carry Backpack", sku: "BP-SCB-003", price: 95 },
  { id: 6, name: "Weekender Duffel", sku: "BG-WKD-006", price: 150 },
  { id: 7, name: "Messenger Bag", sku: "BG-MSG-007", price: 85 },
  { id: 8, name: "Laptop Sleeve", sku: "ACC-LTS-008", price: 45 },
  { id: 9, name: "Travel Organizer", sku: "ACC-TRO-009", price: 35 },
]

export default function ProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const productId = Number.parseInt(params.id)

  // Product state
  const [product, setProduct] = useState({
    id: productId,
    name: "Urban Backpack",
    sku: "BP-URB-001",
    description:
      "A versatile backpack perfect for urban environments. Features multiple compartments, water-resistant material, and comfortable straps.",
    category: "backpack",
    type: "everyday",
    price: 120,
    salePrice: 0,
    stock: 45,
    colors: ["black", "gray", "blue"],
    images: [
      "/placeholder.svg?height=600&width=600&text=Urban+Backpack+1",
      "/placeholder.svg?height=600&width=600&text=Urban+Backpack+2",
      "/placeholder.svg?height=600&width=600&text=Urban+Backpack+3",
    ],
    featured: true,
    new: false,
    sale: false,
    status: "active",
    weight: 1.2,
    dimensions: {
      length: 30,
      width: 15,
      height: 45,
    },
    materials: "Polyester, Nylon",
    features: ["Water resistant", "Laptop compartment", "Multiple pockets", "Padded straps"],
    seo: {
      title: "Urban Backpack | NEXURA",
      description: "Discover our versatile Urban Backpack, perfect for everyday use in the city.",
      keywords: "backpack, urban, everyday, city, laptop bag",
    },
    relatedProductIds: [2, 3, 7],
  })

  // Form state
  const [activeTab, setActiveTab] = useState("basic")
  const [isUnsaved, setIsUnsaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [newFeature, setNewFeature] = useState("")
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProduct((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }))
    }

    setIsUnsaved(true)
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setProduct((prev) => ({ ...prev, [name]: value }))
    setIsUnsaved(true)
  }

  // Handle checkbox/switch changes
  const handleToggleChange = (name: string, checked: boolean) => {
    setProduct((prev) => ({ ...prev, [name]: checked }))
    setIsUnsaved(true)
  }

  // Handle color selection
  const handleColorChange = (color: string) => {
    setProduct((prev) => {
      const colors = [...prev.colors]
      if (colors.includes(color)) {
        return { ...prev, colors: colors.filter((c) => c !== color) }
      } else {
        return { ...prev, colors: [...colors, color] }
      }
    })

    setIsUnsaved(true)
  }

  // Handle feature add
  const handleAddFeature = () => {
    if (!newFeature.trim()) return

    setProduct((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }))

    setNewFeature("")
    setIsUnsaved(true)
  }

  // Handle feature remove
  const handleRemoveFeature = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))

    setIsUnsaved(true)
  }

  // Handle related product toggle
  const handleRelatedProductToggle = (id: number) => {
    setProduct((prev) => {
      const relatedProductIds = [...prev.relatedProductIds]
      if (relatedProductIds.includes(id)) {
        return { ...prev, relatedProductIds: relatedProductIds.filter((pid) => pid !== id) }
      } else {
        return { ...prev, relatedProductIds: [...relatedProductIds, id] }
      }
    })

    setIsUnsaved(true)
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload these files to a server
    // Here we'll just create object URLs for demonstration
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))

    setIsUnsaved(true)

    // Reset the input
    e.target.value = ""
  }

  // Handle image remove
  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))

    setIsUnsaved(true)
  }

  // Handle image drag start
  const handleDragStart = (index: number) => {
    setDraggedImageIndex(index)
  }

  // Handle image drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedImageIndex === null || draggedImageIndex === index) return
  }

  // Handle image drop
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedImageIndex === null || draggedImageIndex === dropIndex) return

    setProduct((prev) => {
      const newImages = [...prev.images]
      const draggedImage = newImages[draggedImageIndex]

      // Remove the dragged image
      newImages.splice(draggedImageIndex, 1)

      // Insert it at the drop position
      newImages.splice(dropIndex, 0, draggedImage)

      return { ...prev, images: newImages }
    })

    setDraggedImageIndex(null)
    setIsUnsaved(true)
  }

  // Handle save
  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsUnsaved(false)

      toast({
        title: "Product Saved",
        description: "Product has been updated successfully.",
      })
    }, 1000)
  }

  // Handle delete
  const handleDelete = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully.",
      })

      router.push("/admin/products")
    }, 500)
  }

  // Confirm navigation if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isUnsaved) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isUnsaved])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.push("/admin/products")} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold dark:text-white">Edit Product</h1>
                <p className="text-muted-foreground">
                  {product.name} ({product.sku})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => router.push(`/products/${product.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this product. This action cannot be undone.
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

              <Button onClick={handleSave} disabled={!isUnsaved || isSaving} className="min-w-[100px]">
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Saving
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>

          {isUnsaved && (
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-md mb-6 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>You have unsaved changes. Make sure to save before leaving this page.</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="seo">SEO & Related</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the basic details of your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" name="name" value={product.name} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input id="sku" name="sku" value={product.sku} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={product.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={product.category} onValueChange={(value) => handleSelectChange("category", value)}>
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
                      <Select value={product.type} onValueChange={(value) => handleSelectChange("type", value)}>
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

                  <div className="space-y-2">
                    <Label>Colors</Label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {colorOptions.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={product.colors.includes(color)}
                            onCheckedChange={(checked) => {
                              if (checked !== "indeterminate") {
                                handleColorChange(color)
                              }
                            }}
                          />
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full mr-2 ${
                                color === "black"
                                  ? "bg-black"
                                  : color === "gray"
                                    ? "bg-gray-400"
                                    : color === "blue"
                                      ? "bg-blue-600"
                                      : color === "green"
                                        ? "bg-green-600"
                                        : color === "red"
                                          ? "bg-red-600"
                                          : "bg-amber-800"
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="materials">Materials</Label>
                      <Input id="materials" name="materials" value={product.materials} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        step="0.1"
                        value={product.weight}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={product.status} onValueChange={(value) => handleSelectChange("status", value)}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dimensions.length">Length (cm)</Label>
                      <Input
                        id="dimensions.length"
                        name="dimensions.length"
                        type="number"
                        value={product.dimensions.length}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions.width">Width (cm)</Label>
                      <Input
                        id="dimensions.width"
                        name="dimensions.width"
                        type="number"
                        value={product.dimensions.width}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dimensions.height">Height (cm)</Label>
                      <Input
                        id="dimensions.height"
                        name="dimensions.height"
                        type="number"
                        value={product.dimensions.height}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={product.featured}
                        onCheckedChange={(checked) => handleToggleChange("featured", checked)}
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="new"
                        checked={product.new}
                        onCheckedChange={(checked) => handleToggleChange("new", checked)}
                      />
                      <Label htmlFor="new">New Arrival</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="sale"
                        checked={product.sale}
                        onCheckedChange={(checked) => handleToggleChange("sale", checked)}
                      />
                      <Label htmlFor="sale">On Sale</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Manage product images (drag to reorder)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative border rounded-md overflow-hidden group"
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="icon" className="h-8 w-8 cursor-move">
                              <Move className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Main Image
                          </div>
                        )}
                      </div>
                    ))}

                    <label className="border border-dashed rounded-md flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors aspect-square">
                      <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Upload Image</p>
                      <p className="text-xs text-muted-foreground mt-1">Drag & drop or click to browse</p>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Recommended image size: 1200 x 1200 pixels (square)</p>
                    <p>Maximum file size: 5MB</p>
                    <p>Supported formats: JPG, PNG, WebP</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory & Pricing</CardTitle>
                  <CardDescription>Manage product inventory and pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Regular Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salePrice">Sale Price ($)</Label>
                      <Input
                        id="salePrice"
                        name="salePrice"
                        type="number"
                        step="0.01"
                        value={product.salePrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                      />
                      <p className="text-xs text-muted-foreground">Leave at 0 for no sale price</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" name="stock" type="number" value={product.stock} onChange={handleInputChange} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Inventory Management</h3>

                    <div className="flex items-center space-x-2">
                      <Switch id="track-inventory" defaultChecked />
                      <Label htmlFor="track-inventory">Track inventory for this product</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="allow-backorders" />
                      <Label htmlFor="allow-backorders">Allow backorders</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="low-stock-notification" defaultChecked />
                      <Label htmlFor="low-stock-notification">Enable low stock notifications</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                      <Input id="low-stock-threshold" type="number" defaultValue="5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                  <CardDescription>Add and manage product features and specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Features List</Label>
                    <div className="space-y-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={feature} readOnly className="flex-1" />
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFeature(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a new feature..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddFeature()
                          }
                        }}
                      />
                      <Button onClick={handleAddFeature}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Additional Specifications</h3>
                    <p className="text-sm text-muted-foreground">Add any additional specifications for this product</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="warranty">Warranty</Label>
                        <Input id="warranty" placeholder="e.g., 1 year limited warranty" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" placeholder="e.g., 25 liters" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="care">Care Instructions</Label>
                        <Input id="care" placeholder="e.g., Hand wash only" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="origin">Country of Origin</Label>
                        <Input id="origin" placeholder="e.g., Vietnam" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO & Related Tab */}
            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your product for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="seo.title">SEO Title</Label>
                    <Input id="seo.title" name="seo.title" value={product.seo.title} onChange={handleInputChange} />
                    <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo.description">Meta Description</Label>
                    <Textarea
                      id="seo.description"
                      name="seo.description"
                      rows={3}
                      value={product.seo.description}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo.keywords">Keywords</Label>
                    <Input
                      id="seo.keywords"
                      name="seo.keywords"
                      value={product.seo.keywords}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">Separate keywords with commas</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex">
                      <div className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground text-sm flex items-center">
                        /products/
                      </div>
                      <Input id="slug" className="rounded-l-none" defaultValue="urban-backpack" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Products</CardTitle>
                  <CardDescription>Select products to show as related items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedProducts.map((relatedProduct) => (
                      <div
                        key={relatedProduct.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`related-${relatedProduct.id}`}
                            checked={product.relatedProductIds.includes(relatedProduct.id)}
                            onCheckedChange={(checked) => {
                              if (checked !== "indeterminate") {
                                handleRelatedProductToggle(relatedProduct.id)
                              }
                            }}
                          />
                          <Label htmlFor={`related-${relatedProduct.id}`} className="font-normal cursor-pointer">
                            {relatedProduct.name}
                            <span className="text-sm text-muted-foreground block">
                              {relatedProduct.sku} • ${relatedProduct.price}
                            </span>
                          </Label>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/products/${relatedProduct.id}`, "_blank")}
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
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

