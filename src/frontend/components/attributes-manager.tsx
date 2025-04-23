"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { AttributeForm } from "./attribute-form"
import { SortableAttribute } from "./sortable-attribute"
import { ProductAttribute } from "@nexura/grpc_gateway/protos"

interface AttributesManagerProps {
  attributes: ProductAttribute[]
  onChange: (attributes: ProductAttribute[]) => void
  showAdvancedOptions?: boolean
}

export function AttributesManager({ attributes, onChange, showAdvancedOptions = true }: AttributesManagerProps) {
  const [isAddingAttribute, setIsAddingAttribute] = useState(false)
  const [newAttribute, setNewAttribute] = useState<ProductAttribute>({
    id: "",
    name: "",
    required: false,
    visible: true,
    values: [],
    variantable: false,
    filterable: false,
    searchable: false,
    displayOrder: 0,
    productId: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shouldAddAttribute, setShouldAddAttribute] = useState(false)

  useEffect(() => {
    if (shouldAddAttribute) {
      handleAddAttribute()
      setShouldAddAttribute(false)
    }
  }, [shouldAddAttribute, newAttribute])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleAddAttribute = () => {
    const validationErrors: Record<string, string> = {}
    if (!newAttribute.name.trim()) {
      validationErrors.name = "Attribute name is required"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const attributeId = `attr-${Date.now()}`
    const attributeToAdd = {
      ...newAttribute,
      id: attributeId,
      displayOrder: attributes.length,
    }

    const updatedAttributes = [...attributes, attributeToAdd]
    onChange(updatedAttributes)

    setNewAttribute({
      id: "",
      name: "",
      required: false,
      visible: true,
      values: [],
      variantable: false,
      filterable: false,
      searchable: false,
      displayOrder: 0,
      productId: "",
    })
    setIsAddingAttribute(false)
    setErrors({})

    toast({
      title: "Attribute Added",
      description: `${attributeToAdd.name} has been added to product attributes.`,
    })
  }

  const handleDeleteAttribute = (attributeId: string) => {
    const updatedAttributes = attributes.filter((attr) => attr.id !== attributeId)
    onChange(updatedAttributes)

    toast({
      title: "Attribute Deleted",
      description: "The attribute has been removed.",
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = attributes.findIndex((attr) => attr.id === active.id)
      const newIndex = attributes.findIndex((attr) => attr.id === over.id)

      const reorderedAttributes = arrayMove(attributes, oldIndex, newIndex).map((attr, index) => ({
        ...attr,
        displayOrder: index,
      }))

      onChange(reorderedAttributes)

      toast({
        title: "Attributes Reordered",
        description: "The display order of attributes has been updated.",
      })
    }
  }

  return (
    <div className="attributes-manager space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Attributes</h3>
        <Button onClick={() => setIsAddingAttribute(true)} disabled={isAddingAttribute}>
          <Plus className="h-4 w-4 mr-2" />
          Add Attribute
        </Button>
      </div>

      {isAddingAttribute && (
        <AttributeForm
          mode="add"
          title="Add New Attribute"
          onSave={(updatedAttribute) => {
            setNewAttribute(updatedAttribute)
            setShouldAddAttribute(true)
          }}
          onCancel={() => setIsAddingAttribute(false)}
          attribute={newAttribute}
        />
      )}

      {attributes.length === 0 && !isAddingAttribute ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No attributes defined yet. Add your first attribute to get started.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={attributes.map((attr) => attr.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {attributes
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .map((attribute) => (
                  <SortableAttribute
                    key={attribute.id}
                    attribute={attribute}
                    attributes={attributes}
                    onChange={onChange}
                    showAdvancedOptions={showAdvancedOptions}
                    onDelete={handleDeleteAttribute}
                  />
                ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
