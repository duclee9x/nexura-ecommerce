"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Wand2, RefreshCw, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ProductAttribute, ProductVariant } from "@/types/product"

interface VariantGeneratorProps {
  attributes: ProductAttribute[]
  existingVariants: ProductVariant[]
  onAddVariants: (variants: ProductVariant[]) => void
  basePrice: number
  baseSku: string
}

export function VariantGenerator({
  attributes,
  existingVariants,
  onAddVariants,
  basePrice,
  baseSku,
}: VariantGeneratorProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [generatedVariants, setGeneratedVariants] = useState<ProductVariant[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  // Get variantable attributes
  const variantableAttributes = attributes.filter((attr) => attr.variantable)

  // Initialize selected attributes with all variantable attributes
  useEffect(() => {
    if (variantableAttributes.length > 0 && selectedAttributes.length === 0) {
      setSelectedAttributes(variantableAttributes.map((attr) => attr.id))
    }
  }, [variantableAttributes])

  // Toggle attribute selection
  const toggleAttributeSelection = (attributeId: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(attributeId) ? prev.filter((id) => id !== attributeId) : [...prev, attributeId],
    )
  }

  // Generate variants based on selected attributes
  const generateVariants = () => {
    if (selectedAttributes.length === 0) {
      toast({
        title: "No attributes selected",
        description: "Please select at least one attribute to generate variants.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Get selected attributes with their values
    const selectedAttributesWithValues = attributes.filter(
      (attr) => selectedAttributes.includes(attr.id) && attr.values.length > 0,
    )

    if (selectedAttributesWithValues.length === 0) {
      toast({
        title: "No attribute values",
        description: "Selected attributes have no values. Please add values to generate variants.",
        variant: "destructive",
      })
      setIsGenerating(false)
      return
    }

    // Generate all possible combinations
    const combinations = generateCombinations(selectedAttributesWithValues)

    // Create variants for each combination
    const newVariants = combinations.map((combination, index) => {
      // Create a descriptive name and SKU
      const variantName = createVariantName(combination)
      const variantSku = createVariantSku(combination, baseSku)

      // Check if this combination already exists
      const existingVariant = findExistingVariant(combination, existingVariants)

      // If it exists, use its data, otherwise create new
      if (existingVariant) {
        return existingVariant
      }

      // Create a new variant
      return {
        id: `var-gen-${Date.now()}-${index}`,
        productId: "temp-product-id", // Will be replaced when added to product
        sku: variantSku,
        price: basePrice,
        inventory: 0,
        lowStockThreshold: 5,
        attributeValues: combination,
        images: [],
        isDefault: false,
        status: "active" as const
      }
    })

    setGeneratedVariants(newVariants)
    setIsGenerating(false)
  }

  // Generate all possible combinations of attribute values
  const generateCombinations = (attributesWithValues: ProductAttribute[]) => {
    let combinations: { attributeId: string; valueId: string }[][] = [[]]

    attributesWithValues.forEach((attribute) => {
      const newCombinations: { attributeId: string; valueId: string }[][] = []

      combinations.forEach((combination) => {
        attribute.values.forEach((value) => {
          newCombinations.push([...combination, { attributeId: attribute.id, valueId: value.id }])
        })
      })

      combinations = newCombinations
    })

    return combinations
  }

  // Create a descriptive name for a variant based on its attribute values
  const createVariantName = (combination: { attributeId: string; valueId: string }[]) => {
    return combination
      .map(({ attributeId, valueId }) => {
        const attribute = attributes.find((a) => a.id === attributeId)
        const value = attribute?.values.find((v) => v.id === valueId)
        return value?.name || ""
      })
      .filter(Boolean)
      .join(" / ")
  }

  // Create a SKU for a variant based on its attribute values
  const createVariantSku = (combination: { attributeId: string; valueId: string }[], baseSku: string) => {
    const suffix = combination
      .map(({ attributeId, valueId }) => {
        const attribute = attributes.find((a) => a.id === attributeId)
        const value = attribute?.values.find((v) => v.id === valueId)
        if (!value) return ""

        // For color attributes, use the first 3 chars of the name
        if (attribute?.type === "color") {
          return value.name.substring(0, 3).toUpperCase()
        }

        // For other attributes, take first 3 chars
        return value.name.substring(0, 3).toUpperCase()
      })
      .filter(Boolean)
      .join("-")

    return `${baseSku}-${suffix}`
  }

  // Find if a combination already exists in existing variants
  const findExistingVariant = (combination: { attributeId: string; valueId: string }[], variants: ProductVariant[]) => {
    return variants.find((variant) => {
      // If lengths don't match, it's not the same combination
      if (variant.attributeValues.length !== combination.length) return false

      // Check if all attribute values match
      return combination.every(({ attributeId, valueId }) =>
        variant.attributeValues.some((av) => av.attributeId === attributeId && av.valueId === valueId),
      )
    })
  }

  // Add generated variants to the product
  const addGeneratedVariants = () => {
    if (generatedVariants.length === 0) return

    // Filter out variants that already exist
    const newVariants = generatedVariants.filter(
      (genVariant) => !findExistingVariant(genVariant.attributeValues, existingVariants),
    )

    if (newVariants.length === 0) {
      toast({
        title: "No new variants",
        description: "All generated variants already exist.",
      })
      return
    }

    onAddVariants(newVariants)
    setGeneratedVariants([])

    toast({
      title: "Variants Added",
      description: `${newVariants.length} new variants have been added.`,
    })
  }

  // Get attribute name by ID
  const getAttributeName = (attributeId: string) => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    return attribute ? attribute.name : attributeId
  }

  // Get attribute value by ID
  const getAttributeValue = (attributeId: string, valueId: string) => {
    const attribute = attributes.find((attr) => attr.id === attributeId)
    const value = attribute?.values.find((v) => v.id === valueId)
    return value
  }

  return (
    <div className="variant-generator space-y-4">
      <Card>
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
                      checked={selectedAttributes.includes(attribute.id)}
                      onCheckedChange={() => toggleAttributeSelection(attribute.id)}
                    />
                    <Label htmlFor={`attr-${attribute.id}`} className="text-sm">
                      {attribute.name}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {attribute.values.length} values
                      </Badge>
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
            <Button onClick={generateVariants} disabled={selectedAttributes.length === 0 || isGenerating}>
              {isGenerating ? (
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
                      {selectedAttributes.map((attrId) => (
                        <TableHead key={attrId}>{getAttributeName(attrId)}</TableHead>
                      ))}
                      <TableHead>SKU</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedVariants.map((variant) => {
                      const exists = findExistingVariant(variant.attributeValues, existingVariants)

                      return (
                        <TableRow key={variant.id}>
                          {selectedAttributes.map((attrId) => {
                            const valueObj = variant.attributeValues.find((av) => av.attributeId === attrId)
                            const value = valueObj ? getAttributeValue(attrId, valueObj.valueId) : null

                            return (
                              <TableCell key={attrId}>
                                {value ? (
                                  attributes.find((a) => a.id === attrId)?.type === "color" && value.color ? (
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-5 h-5 rounded-full border"
                                        style={{ backgroundColor: value.color }}
                                      />
                                      <span>{value.name}</span>
                                    </div>
                                  ) : (
                                    value.name
                                  )
                                ) : (
                                  "-"
                                )}
                              </TableCell>
                            )
                          })}
                          <TableCell>{variant.sku}</TableCell>
                          <TableCell>${variant.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {exists ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check className="h-3 w-3 mr-1" />
                                Exists
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
    </div>
  )
}
