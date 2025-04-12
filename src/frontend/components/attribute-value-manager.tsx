"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash, X, GripVertical, Edit } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ColorPicker } from "@/components/color-picker"
import type { AttributeValue } from "@/types/product"

interface AttributeValueManagerProps {
  values: AttributeValue[]
  onChange: (values: AttributeValue[]) => void
  attributeType: string
}

export function AttributeValueManager({ values, onChange, attributeType }: AttributeValueManagerProps) {
  const [newValue, setNewValue] = useState<AttributeValue>({
    id: "",
    name: "",
    slug: "",
    color: attributeType === "color" ? "#000000" : undefined,
    displayOrder: values.length,
  })
  const [isAddingValue, setIsAddingValue] = useState(false)
  const [editingValueId, setEditingValueId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleAddValue = () => {
    const validationErrors: Record<string, string> = {}

    if (!newValue.name.trim()) {
      validationErrors.name = "Value name is required"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const valueId = editingValueId || `value-${Date.now()}`
    const valueToAdd = {
      ...newValue,
      id: valueId,
      slug: newValue.slug || newValue.name.toLowerCase().replace(/\s+/g, "-"),
    }

    let updatedValues
    if (editingValueId) {
      updatedValues = values.map((value) => (value.id === editingValueId ? valueToAdd : value))
    } else {
      updatedValues = [...values, valueToAdd]
    }

    onChange(updatedValues)

    setNewValue({
      id: "",
      name: "",
      slug: "",
      color: attributeType === "color" ? "#000000" : undefined,
      displayOrder: values.length,
    })
    setIsAddingValue(false)
    setEditingValueId(null)
    setErrors({})

    toast({
      title: editingValueId ? "Value Updated" : "Value Added",
      description: `${valueToAdd.name} has been ${editingValueId ? "updated" : "added"}.`,
    })
  }

  const handleEditValue = (value: AttributeValue) => {
    setNewValue(value)
    setEditingValueId(value.id)
    setIsAddingValue(true)
  }

  const handleDeleteValue = (valueId: string) => {
    const updatedValues = values.filter((value) => value.id !== valueId)
    onChange(updatedValues)

    toast({
      title: "Value Deleted",
      description: "The value has been removed.",
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = values.findIndex((value) => value.id === active.id)
      const newIndex = values.findIndex((value) => value.id === over.id)

      const reorderedValues = arrayMove(values, oldIndex, newIndex).map((value, index) => ({
        ...value,
        displayOrder: index,
      }))

      onChange(reorderedValues)

      toast({
        title: "Values Reordered",
        description: "The display order of values has been updated.",
      })
    }
  }

  const handleColorChange = (color: string) => {
    setNewValue((prev) => ({
      ...prev,
      color,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewValue((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const generateSlug = () => {
    const slug = newValue.name.toLowerCase().replace(/\s+/g, "-")
    setNewValue((prev) => ({ ...prev, slug }))
  }

  const SortableValue = ({ value }: { value: AttributeValue }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: value.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="flex items-center justify-between p-3 border rounded-md mb-2 bg-background"
      >
        <div className="flex items-center gap-3">
          <div className="cursor-grab" {...listeners}>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>

          {attributeType === "color" && value.color && (
            <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: value.color }} />
          )}

          <span className="font-medium">{value.name}</span>
          <Badge variant="outline" className="text-xs">
            {value.slug}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditValue(value)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteValue(value.id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderValueForm = () => (
    <div className="border rounded-md p-4 bg-muted/50 space-y-4 mb-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{editingValueId ? "Edit Value" : "Add New Value"}</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsAddingValue(false)
            setEditingValueId(null)
            setNewValue({
              id: "",
              name: "",
              slug: "",
              color: attributeType === "color" ? "#000000" : undefined,
              displayOrder: values.length,
            })
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="value-name">
            Value Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="value-name"
            name="name"
            value={newValue.name}
            onChange={handleInputChange}
            placeholder="e.g., Red, Small, Cotton"
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="value-slug">Slug</Label>
            <Button variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
              Generate
            </Button>
          </div>
          <Input
            id="value-slug"
            name="slug"
            value={newValue.slug}
            onChange={handleInputChange}
            placeholder="e.g., red, small, cotton"
          />
        </div>
      </div>

      {attributeType === "color" && (
        <div className="space-y-2">
          <Label>Color</Label>
          <ColorPicker value={newValue.color || "#000000"} onChange={handleColorChange} showFavorites={true} />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setIsAddingValue(false)
            setEditingValueId(null)
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAddValue}>{editingValueId ? "Update Value" : "Add Value"}</Button>
      </div>
    </div>
  )

  return (
    <div className="attribute-value-manager space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Attribute Values</h3>
        <Button onClick={() => setIsAddingValue(true)} disabled={isAddingValue}>
          <Plus className="h-4 w-4 mr-2" />
          Add Value
        </Button>
      </div>

      {isAddingValue && renderValueForm()}

      {values.length === 0 && !isAddingValue ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No values defined yet. Add your first value to get started.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={values.map((value) => value.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {values
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((value) => (
                  <SortableValue key={value.id} value={value} />
                ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
