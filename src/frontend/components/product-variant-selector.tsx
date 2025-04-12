"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ColorButton } from "@/components/ui/color-button"
import type { ProductVariant, AttributeValue } from "@/types/product"

interface ProductVariantSelectorProps {
    variants: ProductVariant[]
    onVariantSelect: (variant: ProductVariant | null) => void
    selectedVariant: ProductVariant | null
}

interface AttributeInfo {
    id: string
    name: string
    values: {
        id: string
        name: string
        color?: string
    }[]
    required: boolean
}

export function ProductVariantSelector({
    variants,
    onVariantSelect,
    selectedVariant,
}: ProductVariantSelectorProps) {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})

    // Extract unique attributes and their values from variants
    const variantAttributes = variants.reduce<Record<string, AttributeInfo>>((acc, variant) => {
        variant.attributeValues.forEach(({ attributeId, valueId }) => {
            if (!acc[attributeId]) {
                acc[attributeId] = {
                    id: attributeId,
                    name: attributeId.split("-")[1].charAt(0).toUpperCase() + attributeId.split("-")[1].slice(1),
                    values: [],
                    required: true
                }
            }
            
            // Add value if not already present
            if (!acc[attributeId].values.some(v => v.id === valueId)) {
                acc[attributeId].values.push({
                    id: valueId,
                    name: valueId.split("-")[1].charAt(0).toUpperCase() + valueId.split("-")[1].slice(1),
                })
            }
        })
        return acc
    }, {})
    const variantableAttributes = Object.values(variantAttributes)

    // Initialize selected values from selected variant
    useEffect(() => {
        if (selectedVariant) {
            const values: Record<string, string> = {}
            selectedVariant.attributeValues.forEach(({ attributeId, valueId }) => {
                values[attributeId] = valueId
            })
            setSelectedValues(values)
        } else {
            setSelectedValues({})
        }
    }, [selectedVariant])

    // Handle attribute value selection
    const handleValueSelect = (attributeId: string, valueId: string) => {
        const newSelectedValues = {
            ...selectedValues,
            [attributeId]: valueId,
        }
        setSelectedValues(newSelectedValues)

        // Find matching variant
        const matchingVariant = findMatchingVariant(newSelectedValues)
        onVariantSelect(matchingVariant)
    }

    // Find a variant that matches the selected attribute values
    const findMatchingVariant = (values: Record<string, string>) => {
        const selectedAttributeIds = Object.keys(values)

        // If not all variantable attributes are selected, return null
        if (selectedAttributeIds.length !== variantableAttributes.length) {
            return null
        }

        // Find a variant that matches all selected attribute values
        return variants.find((variant) => {
            return selectedAttributeIds.every((attributeId) => {
                const valueId = values[attributeId]
                return variant.attributeValues.some((av) => av.attributeId === attributeId && av.valueId === valueId)
            })
        }) || null
    }

    // Get available values for an attribute based on current selections
    const getAvailableValues = (attributeId: string) => {
        // If no selections yet, return all values for this attribute
        if (Object.keys(selectedValues).length === 0) {
            return variantAttributes[attributeId]?.values || []
        }

        // Get all variants that match current selections (excluding the current attribute)
        const matchingVariants = variants.filter((variant) => {
            return Object.entries(selectedValues).every(([attrId, valueId]) => {
                // Skip the current attribute
                if (attrId === attributeId) return true

                // Check if this variant matches the selected value for other attributes
                return variant.attributeValues.some((av) => av.attributeId === attrId && av.valueId === valueId)
            })
        })

        // Get unique values for this attribute from matching variants
        const uniqueValueIds = new Set<string>()
        matchingVariants.forEach((variant) => {
            variant.attributeValues.forEach((av) => {
                if (av.attributeId === attributeId) {
                    uniqueValueIds.add(av.valueId)
                }
            })
        })

        // Get the actual value objects
        return variantAttributes[attributeId]?.values.filter((value) => uniqueValueIds.has(value.id)) || []
    }

    const isValueAvailable = (attributeId: string, valueId: string) => {
        const availableValues = getAvailableValues(attributeId)
        return availableValues.some((value) => value.id === valueId)
    }

    return (
        <div className="space-y-6">
            {variantableAttributes.map((attribute) => (
                <div key={attribute.id} className="space-y-2">
                    <Label className="font-medium">
                        {attribute.name}
                        {attribute.required && <span className="text-destructive ml-1">*</span>}
                    </Label>

                    <div className="flex flex-wrap gap-2">
                        {attribute.values.map((value) => {
                            const isSelected = selectedValues[attribute.id] === value.id
                            const isAvailable = isValueAvailable(attribute.id, value.id)
                            const isDisabled = !isAvailable && !isSelected
                            return (
                                <ColorButton
                                    isColor={value.id.startsWith('color-') ? true : false}
                                    key={value.id}
                                    name={value.name}
                                    color={value.color || "#CCCCCC"}
                                    isSelected={isSelected}
                                    disabled={isDisabled}
                                    onClick={() => handleValueSelect(attribute.id, value.id)}
                                />
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
