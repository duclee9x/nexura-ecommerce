"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Trash,
  Save,
  AlertCircle,
  X,
  Info,
  Wand2,
  Settings,
  Check,
  RefreshCw,
  Layers,
} from "lucide-react"
import NextImage from "next/image"
import { toast } from "@/hooks/use-toast"
import { ColorPicker } from "@/components/color-picker"
import { cn, getProductUrl } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { WarehouseSelector, type Warehouse } from "@/components/warehouse-selector"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getWarehousesGateway } from "@/gateway/gateway"
import { useQuery } from "@tanstack/react-query"
import { ProductVariant, ProductAttribute, VariantAttribute } from "@/protos/nexura"
import type { ProductImage } from "@/components/image-gallery"

interface VariantManagerProps {
  variants: ProductVariant[]
  onVariantUpdate: (variants: ProductVariant[], action: "delete" | "update") => void

  basePrice: number
  baseSku: string
  warehouses?: Warehouse[]
  onWarehouseCreate?: (warehouse: Warehouse) => void
  onWarehouseReload?: () => void
  categoryPath?: string
  attributes?: ProductAttribute[]
  productImages: ProductImage[]
}

export function VariantManager({
  variants,
  onVariantUpdate,
  basePrice,
  baseSku,
  onWarehouseReload,
  categoryPath,
  attributes = [],
  productImages,
}: VariantManagerProps) {

  const [productVariants, setProductVariants] = useState<ProductVariant[]>(variants)
  const [isAddingVariant, setIsAddingVariant] = useState(false)
  const [newVariant, setNewVariant] = useState<ProductVariant>({
    id: "",
    sku: "",
    price: basePrice,
    quantity: 0,
    lowStockThreshold: 5,
    imageIds: [],
    attributes: [],
    warehouseId: "",
  })
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isGeneratingVariants, setIsGeneratingVariants] = useState(false)
  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState<string[]>([])
  const [generatedVariants, setGeneratedVariants] = useState<ProductVariant[]>([])
  const [bulkEditMode, setBulkEditMode] = useState(false)
  const [bulkPrice, setBulkPrice] = useState<number | null>(null)
  const [bulkQuantity, setBulkQuantity] = useState<number | null>(null)
  const [bulkWarehouseId, setBulkWarehouseId] = useState<string | null>(null)
  const [bulkLowStockThreshold, setBulkLowStockThreshold] = useState<number | null>(null)
  const [selectedVariants, setSelectedVariants] = useState<string[]>([])
  const [selectAllVariants, setSelectAllVariants] = useState(false)
  const [activeTab, setActiveTab] = useState("manual")
  const [filterAttribute, setFilterAttribute] = useState<string | null>(null)
  const [filterValue, setFilterValue] = useState<string | null>(null)
  const { data: warehouses } = useQuery({
    queryKey: ["warehouses"],
    queryFn: () => getWarehousesGateway().then((res) => res.warehouses),
  })
  // Get variantable attributes
  const variantableAttributes = useMemo(() => {
    return attributes.filter((attr) => attr.variantable)
  }, [attributes])
  // Get attribute options for a specific attribute
  const getAttributeOptions = (attributeId: string) => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    if (!attribute) return []

    return attribute.values
  }

  // Get attribute name by ID
  const getAttributeName = (attributeId: string) => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    return attribute ? attribute.name : attributeId
  }

  
  // Update variants when props change
  useEffect(() => {
    setProductVariants(variants)
  }, [variants])

  // Reset new variant form
  const resetNewVariantForm = () => {
    setNewVariant({
      id: "",
      sku: `${baseSku}-${productVariants.length + 1}`,
      price: basePrice,
      quantity: 0,
      lowStockThreshold: 5,
      imageIds: [],
      attributes: attributes.map((attr) => ({
        id: attr.id,
        name: attr.name,
        value: "",
        extraValue: "",
      })),
      warehouseId: "",
    })
    setErrors({})
  }


  // Validate variant
  const validateVariant = (variant: ProductVariant): Record<string, string> => {
    const errors: Record<string, string> = {}

    // Basic validation
    if (!variant.sku) errors.sku = "SKU is required"
    if (variant.price <= 0) errors.price = "Price must be greater than 0"
    if (variant.quantity < 0 || isNaN(variant.quantity)) errors.quantity = "Quantity must be a positive number"
    if (variant.lowStockThreshold !== undefined && variant.lowStockThreshold < 0) {
      errors.lowStockThreshold = "Low stock threshold must be a positive number"
    }

    // Validate attributes
    if (variant.attributes) {
      for (const attrId of selectedVariantAttributes) {
        const attributeDefinition = attributes.find(attr => attr.id === attrId)
        if (!attributeDefinition) continue

        const attributeValue = variant.attributes.find(
          attr => attr.name.toLowerCase() === attributeDefinition.name.toLowerCase()
        )

        if (!attributeValue || !attributeValue.value) {
          errors[`attribute_${attrId}`] = `${attributeDefinition.name} is required`
        }

        // Special validation for color
        if (attributeDefinition.name.toLowerCase() === "color") {
          if (!attributeValue?.value && !attributeValue?.extraValue) {
            errors[`attribute_${attrId}`] = "Color is required"
          }
        }
      }
    }

    return errors
  }

  // Handle adding a new variant
  const handleAddVariant = () => {
    const validationErrors = validateVariant(newVariant)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const updatedVariants = [...productVariants, newVariant]
    setProductVariants(updatedVariants)
    onVariantUpdate(updatedVariants, "update")
    setIsAddingVariant(false)
    resetNewVariantForm()

    toast({
      title: "Variant Added",
      description: "The variant has been added successfully.",
    })
  }

  // Handle editing a variant
  const startEditingVariant = (variantId: string) => {
    const variantToEdit = productVariants.find((v) => v.id === variantId)
    if (variantToEdit) {
      // Map old image IDs to new ones based on URL matching
      const updatedImageIds = variantToEdit.imageIds.map(oldId => {
        // Find the old image URL from the variant's image ID
        const matchingImage = productImages.find(img => img.id === oldId)
        if (matchingImage) {
          return matchingImage.id
        }
        return null
      }).filter(Boolean) as string[]

      setNewVariant({ 
        ...variantToEdit,
        imageIds: updatedImageIds
      })
      setEditingVariantId(variantId)
      setIsAddingVariant(true)
    }
  }

  // Save edited variant
  const saveEditedVariant = () => {
    const validationErrors = validateVariant(newVariant)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const updatedVariants = productVariants.map((variant) => 
      variant.id === editingVariantId ? newVariant : variant
    )
    
    setProductVariants(updatedVariants)
    onVariantUpdate(updatedVariants, "update")
    setIsAddingVariant(false)
    setEditingVariantId(null)
    resetNewVariantForm()

    toast({
      title: "Variant Updated",
      description: "The variant has been updated successfully.",
    })
  }

  // Handle deleting a variant
  const handleDeleteVariant = (variantId: string) => {
    const updatedVariants = productVariants.filter((variant) => variant.id !== variantId)
    setProductVariants(updatedVariants)
    onVariantUpdate(updatedVariants, "delete")
    setSelectedVariants(selectedVariants.filter((id) => id !== variantId))

    toast({
      title: "Variant Deleted",
      description: "The variant has been removed.",
    })
  }

  // Handle bulk delete of variants
  const handleBulkDeleteVariants = () => {
    if (selectedVariants.length === 0) {
      toast({
        title: "No variants selected",
        description: "Please select variants to delete.",
        variant: "destructive",
      })
      return
    }

    const updatedVariants = productVariants.filter((variant) => !selectedVariants.includes(variant.id))
    setProductVariants(updatedVariants)
    onVariantUpdate(updatedVariants, "delete")
    setSelectedVariants([])
    setSelectAllVariants(false)

    toast({
      title: "Variants Deleted",
      description: `${selectedVariants.length} variants have been removed.`,
    })
  }

  // Handle input change for new variant
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value
    setNewVariant((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  // Handle select change for variant name
  const handleVariantNameChange = (value: string) => {
    setNewVariant((prev) => ({
      ...prev,
      name: value,
    }))

    // Clear error for name field if it exists
    if (errors.name) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated.name
        return updated
      })
    }
  }
  // Handle attribute value change for a variant
  const handleAttributeValueChange = (attributeId: string, value: string, isColorName: boolean = false) => {
    setNewVariant((prev) => ({
      ...prev,
      attributes: prev.attributes?.map((attr) => {
        const attributeDefinition = attributes.find((a) => a.id === attributeId)
        if (attributeDefinition?.name.toLowerCase() === "color") {
          if (attr.name.toLowerCase() === "color") {
            if (isColorName) {
              // Check if the entered name matches any available color value
              const matchingColor = attributeDefinition.values.find(
                (attrValue) => attrValue.toLowerCase() === value.toLowerCase()
              )
              if (matchingColor) {
                // If it matches, update both name and color value
                const colorValue = attributeDefinition.values.find(
                  (attrValue) => attrValue.toLowerCase() === value.toLowerCase()
                )
                return {
                  ...attr,
                  value: value,
                  extraValue: colorValue || value
                }
              }
              // If no match, just update the name
              return { ...attr, value }
            } else {
              return {
                ...attr,
                value: value.startsWith("#") ? value : attr.value,
                extraValue: value.startsWith("#") ? value : attr.extraValue
              }
            }
          }
        } else if (attr.name.toLowerCase() === attributeDefinition?.name.toLowerCase()) {
          return { ...attr, value }
        }
        return attr
      }) || []
    }))

    // Clear error for this attribute if it exists
    if (errors[`attribute_${attributeId}`]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[`attribute_${attributeId}`]
        return updated
      })
    }
  }

  // Handle color change
  const handleColorChange = (color: string) => {
    setNewVariant((prev) => ({
      ...prev,
      attributes: prev.attributes?.map((attr) => {
        const attribute = attributes.find((a) => a.id === attr.id)
        if (attribute?.name.toLowerCase() === "color") {
          return { ...attr, value: color, extraValue: color }
        }
        return attr
      }) || [],
    }))

    // Clear error for value field if it exists
    if (errors.value) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated.value
        return updated
      })
    }
  }

  // Handle image selection
  const handleImageSelect = (imageId: string) => {
    setNewVariant((prev) => {
      // Ensure imageIds is always an array
      const currentImages = prev.imageIds
      // Find if the image exists in product images
      const imageExists = productImages.find(img => img.id === imageId)
      if (!imageExists) return prev
      
      const isSelected = currentImages.includes(imageId)
      
      if (isSelected) {
        // Remove image if already selected
        return {
          ...prev,
          imageIds: currentImages.filter((id) => id !== imageId),
        }
      } else {
        // Add image if not selected
        return {
          ...prev,
          imageIds: [...currentImages, imageId],
        }
      }
    })
  }

  // Generate SKU from base SKU and variant attributes
  const generateSkuFromAttributes = (variantAttributes: VariantAttribute[]) => {
    if (variantAttributes.length === 0) {
      return baseSku
    }

    const attributeCodes = variantAttributes
      .map((attr) => {
        const attribute = attributes.find((a) => a.id === attr.id)
        if (!attribute) return ""

        if (attribute.name.toLowerCase() === "color") {
          // For color attributes, use the first 3 characters of the value
          return attr.value.substring(1, 4).toUpperCase()
        }

        return attr.value.substring(0, 3).toUpperCase()
      })
      .filter(Boolean)
      .join("-")

    return `${baseSku}-${attributeCodes}`
  }

  // Get warehouse name by ID
  const getWarehouseName = (warehouseId: string | undefined) => {
    if (!warehouseId) return "Not assigned"
    const warehouse = warehouses?.find((w) => w.id === warehouseId)
    return warehouse ? warehouse.name : "Unknown"
  }

  // Toggle variant selection for bulk actions
  const toggleVariantSelection = (variantId: string) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId) ? prev.filter((id) => id !== variantId) : [...prev, variantId],
    )
  }

  // Toggle select all variants
  const toggleSelectAllVariants = () => {
    if (selectAllVariants) {
      setSelectedVariants([])
    } else {
      setSelectedVariants(productVariants.map((v) => v.id))
    }
    setSelectAllVariants(!selectAllVariants)
  }

  // Apply bulk edits to selected variants
  const applyBulkEdits = () => {
    if (selectedVariants.length === 0) {
      toast({
        title: "No variants selected",
        description: "Please select variants to edit.",
        variant: "destructive",
      })
      return
    }

    const updatedVariants = productVariants.map((variant) => {
      if (selectedVariants.includes(variant.id)) {
        const updates: Partial<ProductVariant> = {}
        if (bulkPrice !== null) updates.price = bulkPrice
        if (bulkQuantity !== null) updates.quantity = bulkQuantity
        if (bulkLowStockThreshold !== null) updates.lowStockThreshold = bulkLowStockThreshold
        if (bulkWarehouseId !== null) updates.warehouseId = bulkWarehouseId

        return { ...variant, ...updates }
      }
      return variant
    })

    setProductVariants(updatedVariants)
    onVariantUpdate(updatedVariants, "update")

    // Reset bulk edit values
    setBulkPrice(null)
    setBulkQuantity(null)
    setBulkLowStockThreshold(null)
    setBulkWarehouseId(null)
    setBulkEditMode(false)

    toast({
      title: "Bulk Edit Applied",
      description: `Updated ${selectedVariants.length} variants.`,
    })
  }

  // Generate variants based on selected attributes
  const generateVariants = () => {
    if (selectedVariantAttributes.length === 0) {
      toast({
        title: "No attributes selected",
        description: "Please select at least one attribute to generate variants.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingVariants(true)

    const attributeCombinations = generateAttributeCombinations(selectedVariantAttributes)
    const newVariants: ProductVariant[] = attributeCombinations.map((combination, index) => {
      const sku = generateSkuFromAttributes(combination)
      
      // Generate variant name from attributes
      const variantName = combination
        .map((attr) => {
          const attribute = attributes.find((a) => a.id === attr.id)
          if (!attribute) return ""
          
          if (attribute.name.toLowerCase() === "color" && attr.value.startsWith("#")) {
            return attr.value
          }
          return attr.value
        })
        .filter(Boolean)
        .join(" - ")
      const existingVariant = productVariants.find((variant) => {
        if (!variant.attributes) return false
        return combination.every(
          (attr) => variant.attributes && variant.attributes.find((a) => a.id === attr.id)?.value === attr.value
        )
      })
      if (existingVariant) {
        return existingVariant
      }

      return {
        id: `var-gen-${Date.now()}-${index}`,
        name: variantName,
        sku,
        price: basePrice,
        quantity: 0,
        lowStockThreshold: 5,
        imageIds: [],
        attributes: combination,
        warehouseId: "",
      }
    })
    setGeneratedVariants(newVariants)
    setIsGeneratingVariants(false)
  }

  // Generate all possible combinations of attribute values
  const generateAttributeCombinations = (attributeIds: string[]): VariantAttribute[][] => {
    const combinations: VariantAttribute[][] = [[]]

    attributeIds.forEach((attributeId) => {
      const attribute = attributes.find((a) => a.id === attributeId)
      if (!attribute) return

      const values = getAttributeOptions(attributeId)
      if (values.length === 0) return

      const newCombinations: VariantAttribute[][] = []

      combinations.forEach((combination) => {
        values.forEach((value) => {
          newCombinations.push([
            ...combination,
            {
              id: attributeId,
              name: attribute.name,
              value: value,
              extraValue: "",
            },
          ])
        })
      })

      combinations.length = 0
      combinations.push(...newCombinations)
    })

    return combinations
  }

  // Add generated variants to the product
  const addGeneratedVariants = () => {
    if (generatedVariants.length === 0) return

    // Filter out variants that already exist (have the same ID)
    const newVariants = generatedVariants.filter((genVariant) => !productVariants.some((v) => v.id === genVariant.id))

    if (newVariants.length === 0) {
      toast({
        title: "No new variants",
        description: "All generated variants already exist.",
      })
      return
    }

    const updatedVariants = [...productVariants, ...newVariants]
    setProductVariants(updatedVariants)
    onVariantUpdate(updatedVariants, "update")
    setGeneratedVariants([])
    setActiveTab("manual")

    toast({
      title: "Variants Added",
      description: `${newVariants.length} new variants have been added.`,
    })
  }

  // Toggle attribute selection for variant generation
  const toggleAttributeSelection = (attributeId: string) => {
    setSelectedVariantAttributes((prev) =>
      prev.includes(attributeId) ? prev.filter((id) => id !== attributeId) : [...prev, attributeId],
    )
  }

  // Format attribute value for display
  const formatAttributeValue = (attributeId: string, value: string) => {
    const attribute = attributes.find((a) => a.id === attributeId)
    if (!attribute) return value

    if (attribute.name.toLowerCase() === "color" && value.startsWith("#")) {
      // For color attributes, just return the hex value
      return value
    }

    return value
  }

  // Get filtered variants based on selected attribute and value
  const getFilteredVariants = () => {
    if (!filterAttribute || !filterValue) return productVariants

    return productVariants.filter((variant) => {
      if (!variant.attributes) return false
      return variant.attributes.find((attr) => attr.id === filterAttribute)?.value === filterValue
    })
  }

  const renderVariantAttribute = (variant: ProductVariant, attrId: string) => {
    // Check if attributes exist and find the matching attribute
    if (!variant.attributes || !Array.isArray(variant.attributes)) {
      return "-"
    }

    // Get the attribute definition first
    const attributeDefinition = attributes.find((attr) => attr.id === attrId)
    if (!attributeDefinition) return "-"

    // Find the attribute by name instead of ID
    const attribute = variant.attributes.find((attr) => attr.name.toLowerCase() === attributeDefinition.name.toLowerCase())
    if (!attribute) return "-"

    if (attributeDefinition.name.toLowerCase() === "color") {
      return (
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: attribute.extraValue || attribute.value }}
          />
          <span>{attribute.value}</span>
        </div>
      )
    }

    return attribute.value || "-"
  }

  // Effect to update selectAllVariants state when selectedVariants changes
  useEffect(() => {
    setSelectAllVariants(selectedVariants.length === productVariants.length && productVariants.length > 0)
  }, [selectedVariants, productVariants])

  // Initialize selectedVariantAttributes with existing variantable attributes
  useEffect(() => {
    if (variantableAttributes.length > 0 && selectedVariantAttributes.length === 0) {
      setSelectedVariantAttributes(variantableAttributes.map((attr) => attr.id))
    }
  }, [variantableAttributes])

  // Handle warehouse selection
  const handleWarehouseSelect = (warehouseId: string) => {
    setNewVariant((prev) => ({
      ...prev,
      warehouseId: warehouseId,
    }))
  }

  const filteredVariants = getFilteredVariants()
  return (
    <div className="variant-manager space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Variants</h3>
        <div className="flex gap-2 pt-6">
          <Button
            variant="outline"
            onClick={() => setActiveTab(activeTab === "manual" ? "generator" : "manual")}
            className="gap-2"
          >
            {activeTab === "manual" ? (
              <>
                <Wand2 className="h-4 w-4" />
                <span className="hidden sm:inline">Variant Generator</span>
                <span className="sm:hidden">Generator</span>
              </>
            ) : (
              <>
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Manual Entry</span>
                <span className="sm:hidden">Manual</span>
              </>
            )}
          </Button>
          <Button
            onClick={() => {
              resetNewVariantForm()
              setEditingVariantId(null)
              setIsAddingVariant(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Variant
          </Button>
        </div>
      </div>

      {/* Variant Generator*/}
      {activeTab === "generator" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Variant Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Attributes for Variant Generation</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {variantableAttributes.length > 0 ? (
                  variantableAttributes.map((attribute) => (
                    <div key={attribute.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`attr-${attribute.id}`}
                        checked={selectedVariantAttributes.includes(attribute.id)}
                        onCheckedChange={() => toggleAttributeSelection(attribute.id)}
                      />
                      <Label htmlFor={`attr-${attribute.id}`} className="text-sm">
                        {attribute.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-muted-foreground text-sm">
                    No variantable attributes found. Mark attributes as "Use for variants" in the Attributes Manager.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={generateVariants}
                disabled={selectedVariantAttributes.length === 0 || isGeneratingVariants}
              >
                {isGeneratingVariants ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Variants
                  </>
                )}
              </Button>
            </div>

            {generatedVariants.length > 0 && (
              <div className="space-y-4 mt-4">
                <Separator />
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Generated Variants ({generatedVariants.length})</h4>
                  <Button onClick={addGeneratedVariants}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add All Variants
                  </Button>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {selectedVariantAttributes.map((attrId) => (
                          <TableHead key={attrId}>{getAttributeName(attrId)}</TableHead>
                        ))}
                        <TableHead>SKU</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Exists</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                     
                      {generatedVariants.map((variant) => {
                        const exists = productVariants.some((v) => {
                          if (!v.attributes || !variant.attributes) return false
                          return variant.attributes.every(
                            (attr) => v.attributes && v.attributes.find((a) => a.id === attr.id)?.value === attr.value
                          )
                        })

                        return (
                          <TableRow key={variant.id}>
                            {selectedVariantAttributes.map((attrId) => (
                              <TableCell key={attrId}>
                                {renderVariantAttribute(variant, attrId)}
                              </TableCell>
                            ))}
                            <TableCell>{variant.sku}</TableCell>
                            <TableCell>${variant.price.toFixed(2)}</TableCell>
                            <TableCell>
                              {exists ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <Check className="h-3 w-3 mr-1" />
                                  Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  New
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Manual Entry*/}
      {productVariants.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No variants added yet. Add your first variant to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Filter and Bulk Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex gap-2">
              {variantableAttributes.length > 0 && (
                <div className="flex gap-2">
                  <Select value={filterAttribute || ""} onValueChange={(value) => setFilterAttribute(value || null)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Variants</SelectItem>
                      {variantableAttributes.map((attr) => (
                        <SelectItem key={attr.id} value={attr.id}>
                          {attr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {filterAttribute && (
                    <Select value={filterValue || ""} onValueChange={(value) => setFilterValue(value || null)}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any value</SelectItem>
                        {getAttributeOptions(filterAttribute).map((option) => (
                          <SelectItem key={option} value={option}>
                            {formatAttributeValue(filterAttribute, option)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {(filterAttribute || filterValue) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setFilterAttribute(null)
                        setFilterValue(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setBulkEditMode(!bulkEditMode)}>
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Bulk Edit</span>
              </Button>
              <Button disabled={selectedVariants.length === 0} variant="destructive" size="sm" className="gap-1" onClick={handleBulkDeleteVariants}>
                  <Trash className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete Selected</span>
                  <span className="sm:hidden">Delete</span>
                </Button>
            </div>
          </div>

          {/* Bulk Edit Panel */}
          {bulkEditMode && (
            <Card className="p-4 bg-muted/30">
              <div className="space-y-4">
                <h4 className="font-medium">Bulk Edit {selectedVariants.length} Selected Variants</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bulk-price">Price</Label>
                    <Input
                      id="bulk-price"
                      type="number"
                      value={bulkPrice === null ? "" : bulkPrice}
                      onChange={(e) => setBulkPrice(e.target.value ? Number(e.target.value) : null)}
                      placeholder="Leave empty to keep current"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bulk-quantity">Quantity</Label>
                    <Input
                      id="bulk-quantity"
                      type="number"
                      value={bulkQuantity === null ? "" : bulkQuantity}
                      onChange={(e) => setBulkQuantity(e.target.value ? Number(e.target.value) : null)}
                      placeholder="Leave empty to keep current"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bulk-threshold">Low Stock Threshold</Label>
                    <Input
                      id="bulk-threshold"
                      type="number"
                      value={bulkLowStockThreshold === null ? "" : bulkLowStockThreshold}
                      onChange={(e) => setBulkLowStockThreshold(e.target.value ? Number(e.target.value) : null)}
                      placeholder="Leave empty to keep current"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bulk-warehouse">Warehouse</Label>
                    <Select value={bulkWarehouseId || ""} onValueChange={(value) => setBulkWarehouseId(value || null)}>
                      <SelectTrigger id="bulk-warehouse">
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="keep">Keep current</SelectItem>
                        {warehouses?.map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id}>
                            {warehouse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setBulkEditMode(false)}>
                    Cancel
                  </Button>
                  <Button onClick={applyBulkEdits} disabled={selectedVariants.length === 0}>
                    Apply to {selectedVariants.length} Variants
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Variant List*/}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Variant List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectAllVariants}
                        onCheckedChange={toggleSelectAllVariants}
                        aria-label="Select all variants"
                      />
                    </TableHead>
                    {selectedVariantAttributes.map((attrId) => (
                      <TableHead key={attrId}>{getAttributeName(attrId)}</TableHead>
                    ))}
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVariants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7 + selectedVariantAttributes.length} className="text-center h-24">
                        No variants found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVariants.map((variant) => (
                      <TableRow key={variant.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedVariants.includes(variant.id)}
                            onCheckedChange={() => toggleVariantSelection(variant.id)}
                            aria-label={`Select variant ${variant.sku}`}
                          />
                        </TableCell>
                        {selectedVariantAttributes.map((attrId) => (
                          <TableCell key={attrId}>
                            {renderVariantAttribute(variant, attrId)}
                          </TableCell>
                        ))}
                        <TableCell>{variant.sku}</TableCell>
                        <TableCell>${variant.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {variant.quantity}
                          {variant.lowStockThreshold && variant.quantity <= variant.lowStockThreshold && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="ml-2 text-amber-500">
                                    <AlertCircle className="h-4 w-4 inline" />
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Low stock alert! Quantity is below threshold of {variant.lowStockThreshold}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                        <TableCell>
                          {variant.warehouseId ? (
                            getWarehouseName(variant.warehouseId)
                          ) : (
                            <span className="text-muted-foreground text-sm">Not assigned</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => startEditingVariant(variant.id)}>
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteVariant(variant.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add/Edit Variant Dialog */}
      <Dialog open={isAddingVariant} onOpenChange={setIsAddingVariant}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{editingVariantId ? "Edit Variant" : "Add New Variant"}</DialogTitle>
            <DialogDescription>
              {editingVariantId
                ? "Update the details for this product variant."
                : "Create a new variant for this product."}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="attributes" className="mt-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="variant-sku">
                      SKU <span className="text-destructive">*</span>
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const sku = generateSkuFromAttributes(newVariant.attributes || {})
                        setNewVariant((prev) => ({ ...prev, sku }))
                      }}
                      className="h-6 text-xs"
                      type="button"
                    >
                      Generate
                    </Button>
                  </div>
                  <Input
                    id="variant-sku"
                    value={newVariant.sku}
                    onChange={(e) => handleInputChange(e, "sku")}
                    placeholder="Stock Keeping Unit"
                    className={cn(errors.sku && "border-destructive")}
                  />
                  {errors.sku && <p className="text-xs text-destructive mt-1">{errors.sku}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variant-price">
                    Price <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="variant-price"
                      type="number"
                      value={newVariant.price}
                      onChange={(e) => handleInputChange(e, "price")}
                      className={cn("pl-8", errors.price && "border-destructive")}
                      step="0.01"
                      min="0"
                    />
                  </div>
                  {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variant-quantity">
                    Quantity <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="variant-quantity"
                    type="number"
                    value={newVariant.quantity}
                    onChange={(e) => handleInputChange(e, "quantity")}
                    className={cn(errors.quantity && "border-destructive")}
                    min="0"
                    step="1"
                  />
                  {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="variant-threshold">Low Stock Threshold</Label>
                  <Input
                    id="variant-threshold"
                    type="number"
                    value={newVariant.lowStockThreshold || ""}
                    onChange={(e) => handleInputChange(e, "lowStockThreshold")}
                    className={cn(errors.lowStockThreshold && "border-destructive")}
                    min="0"
                    step="1"
                    placeholder="Optional"
                  />
                  {errors.lowStockThreshold && (
                    <p className="text-xs text-destructive mt-1">{errors.lowStockThreshold}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="variant-warehouse">Warehouse Location</Label>
                <WarehouseSelector
                  warehouses={warehouses || []}
                  selectedWarehouseId={newVariant.warehouseId || null}
                  onWarehouseSelect={handleWarehouseSelect}
                  onWarehouseReload={onWarehouseReload}
                  showAddNew={false}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="attributes" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h4 className="font-medium">Variant Attributes</h4>
                {variantableAttributes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {variantableAttributes.map((attribute) => (
                      <div key={attribute.id} className="space-y-2">
                        <Label htmlFor={`attr-${attribute.id}`}>
                          {attribute.name}
                          {attribute.required && <span className="text-destructive ml-1">*</span>}
                        </Label>

                        {attribute.name.toLowerCase() === "color" ? (
                          <div className={cn(errors[`attribute_${attribute.id}`] && "border border-destructive rounded-md p-1")}>
                            <ColorPicker
                              value={newVariant.attributes?.find((attr) => attr.name.toLowerCase() === "color")?.extraValue || "#000000"}
                              onChange={(color) => handleAttributeValueChange(attribute.id, color)}
                              showFavorites={true}
                              colorName={newVariant.attributes?.find((attr) => attr.name.toLowerCase() === "color")?.value || ""}
                              onColorNameChange={(name) => handleAttributeValueChange(attribute.id, name, true)}
                            />
                          </div>
                        ) : (
                          <Input
                            id={`attr-${attribute.id}`}
                            value={newVariant.attributes?.find((attr) => attr.name.toLowerCase() === attribute.name.toLowerCase())?.value || ""}
                            onChange={(e) => handleAttributeValueChange(attribute.id, e.target.value)}
                            placeholder={`Enter ${attribute.name}`}
                            className={cn(errors[`attribute_${attribute.id}`] && "border-destructive")}
                            type="text"
                          />
                        )}

                        {errors[`attribute_${attribute.id}`] && (
                          <p className="text-xs text-destructive mt-1">{errors[`attribute_${attribute.id}`]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 border rounded-md bg-muted/50">
                    <p className="text-muted-foreground">
                      No variantable attributes found. Mark attributes as "Use for variants" in the Attributes Manager.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            

            <TabsContent value="images" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Select Product Images</Label>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image) => {
                    // Ensure imageIds is always an array
                    const currentImageIds = Array.isArray(newVariant.imageIds) ? newVariant.imageIds : []
                    const isSelected = currentImageIds.includes(image.id)
                    console.log(isSelected, "isSelected")
                    console.log(JSON.stringify(newVariant, null, 2), "newVariant")
                    console.log(JSON.stringify(productImages, null, 2), "productImages")
                    return (
                      <div
                        key={image.id}
                        className={cn(
                          "relative aspect-square border rounded-md overflow-hidden cursor-pointer",
                          isSelected && "ring-2 ring-primary"
                        )}
                        onClick={() => handleImageSelect(image.id)}
                      >
                        <NextImage
                          src={getProductUrl(image.url)}
                          objectFit="contain"
                          blurDataURL={image.blurhash}
                          fill
                          alt="Product image"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-1 right-1">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleImageSelect(image.id)}
                            className="bg-white/80"
                          />
                        </div>
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/10" />
                        )}
                      </div>
                    )
                  })}
                </div>
                {!Array.isArray(newVariant.imageIds) || newVariant.imageIds.length === 0 && (
                  <p className="text-xs text-muted-foreground">No images selected. Select images from the product gallery.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            {categoryPath && (
              <div className="w-full flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Category: {categoryPath}</span>
              </div>
            )}
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingVariant(false)
                  resetNewVariantForm()
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingVariantId ? saveEditedVariant : handleAddVariant}
                disabled={Object.keys(errors).length > 0}
              >
                <Save className="h-4 w-4 mr-2" />
                {editingVariantId ? "Update Variant" : "Add Variant"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
