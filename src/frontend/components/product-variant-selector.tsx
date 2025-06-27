"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { ColorButton } from "@/components/ui/color-button"
import { ProductVariant } from "@nexura/grpc_gateway/protos"

interface ProductVariantSelectorProps {
  variants: ProductVariant[]
  onVariantSelect: (variant: ProductVariant | undefined) => void
  selectedVariant: ProductVariant | undefined
  disableOutOfStock?: boolean
}

interface AttributeInfo {
  name: string
  values: Set<string>
  required: boolean
}

export function ProductVariantSelector({
  variants,
  onVariantSelect,
  selectedVariant,
  disableOutOfStock = false,
}: ProductVariantSelectorProps) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})

  // Extract unique attributes and their values from variants
  const variantAttributes = variants.reduce<Record<string, AttributeInfo>>((acc, variant) => {
    variant.attributes.forEach((attr) => {
      if (!acc[attr.name]) {
        acc[attr.name] = {
          name: attr.name,
          values: new Set(),
          required: true
        }
      }
      acc[attr.name].values.add(attr.value)
    })
    return acc
  }, {})

  // Convert to array and sort attributes for consistent display
  const variantableAttributes = Object.entries(variantAttributes)
    .map(([name, info]) => ({
      name,
      values: Array.from(info.values),
      required: info.required
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  // Initialize selected values from selected variant
  useEffect(() => {
    if (selectedVariant) {
      const values: Record<string, string> = {}
      selectedVariant.attributes.forEach((attr) => {
        values[attr.name] = attr.value
      })
      setSelectedValues(values)
    } else {
      setSelectedValues({})
    }
  }, [selectedVariant])

  // Handle attribute value selection and deselection
  const handleValueSelect = (attributeName: string, value: string) => {
    // Toggle selection - if the same value is clicked, deselect it
    const newSelectedValues = { ...selectedValues }
    
    if (newSelectedValues[attributeName] === value) {
      // Deselect the attribute
      delete newSelectedValues[attributeName]
    } else {
      // Select the new value
      newSelectedValues[attributeName] = value
    }
    
    setSelectedValues(newSelectedValues)

    // Find matching variant if we have all required attributes selected
    if (Object.keys(newSelectedValues).length === variantableAttributes.length) {
      const matchingVariant = findMatchingVariant(newSelectedValues)
      onVariantSelect(matchingVariant)
    } else {
      onVariantSelect(undefined)
    }
  }

  // Find a variant that matches the selected attribute values
  const findMatchingVariant = (values: Record<string, string>) => {
    const selectedAttributeNames = Object.keys(values)

    // If not all variantable attributes are selected, return null
    if (selectedAttributeNames.length !== variantableAttributes.length) {
      return undefined
    }

    // Find a variant that matches all selected attribute values
    return variants.find((variant) => {
      return selectedAttributeNames.every((attributeName) => {
        const selectedValue = values[attributeName]
        return variant.attributes.some(
          attr => attr.name === attributeName && attr.value === selectedValue
        )
      })
    }) || undefined
  }

  // Check if a specific attribute value is available based on current selection
  const isValueAvailable = (attributeName: string, value: string) => {
    // Find variants that have this attribute value
    const matchingVariants = variants.filter((variant) => {
      // Check if this variant has the current attribute value
      const hasAttributeValue = variant.attributes.some(
        attr => attr.name === attributeName && attr.value === value
      )
      
      // Check if this variant matches all other selected values
      const matchesOtherSelections = Object.entries(selectedValues).every(([attrName, selectedValue]) => {
        if (attrName === attributeName) return true // skip the attribute being checked
        return variant.attributes.some(
          attr => attr.name === attrName && attr.value === selectedValue
        )
      })
      
      return hasAttributeValue && matchesOtherSelections
    })
    
    if (matchingVariants.length === 0) {
      return false
    }
    
    if (disableOutOfStock) {
      // At least one matching variant must be in stock
      return matchingVariants.some(
        variant => variant.stock && variant.stock.quantity > 0
      )
    }
    
    return true
  }

  return (
    <div className="space-y-6">
      {variantableAttributes.map(attribute => (
        <div key={attribute.name} className="space-y-2">
          <Label className="font-medium">
            {attribute.name}
            {attribute.required && <span className="text-destructive ml-1">*</span>}
          </Label>

          <div className="flex flex-wrap gap-2">
            {attribute.values.map((value) => {
              const isSelected = selectedValues[attribute.name] === value
              const isAvailable = isValueAvailable(attribute.name, value)
              const isDisabled = !isAvailable && !isSelected
              
              return (
                <div 
                  key={`${attribute.name}-${value}`}
                  className={isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                >
                  <ColorButton
                    isColor={attribute.name.toLowerCase() === "color"}
                    name={value}
                    color={attribute.name.toLowerCase() === "color" ? value : "#CCCCCC"}
                    isSelected={isSelected}
                    disabled={isDisabled}
                    onClick={() => handleValueSelect(attribute.name, value)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
