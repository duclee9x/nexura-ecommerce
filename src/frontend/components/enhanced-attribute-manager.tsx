"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash, X, ChevronDown, ChevronUp, GripVertical, Edit } from "lucide-react"
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
import { AttributeValueManager } from "@/components/attribute-value-manager"
import type { ProductAttribute, AttributeValue } from "@/types/product"

interface EnhancedAttributeManagerProps {
  attributes: ProductAttribute[]
  onChange: (attributes: ProductAttribute[]) => void
}

export function EnhancedAttributeManager({ attributes, onChange }: EnhancedAttributeManagerProps) {
  const [expandedAttribute, setExpandedAttribute] = useState<string | null>(null)
  const [newAttribute, setNewAttribute] = useState<ProductAttribute>({
    id: "",
    name: "",
    slug: "",
    type: "text",
    required: false,
    visible: true,
    filterable: true,
    searchable: true,
    variantable: false,
    displayOrder: attributes.length,
    values: [],
  })
  const [isAddingAttribute, setIsAddingAttribute] = useState(false)
  const [editingAttributeId, setEditingAttributeId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<"general" | "values">("general")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const toggleAttribute = (attributeId: string) => {
    setExpandedAttribute((prev) => (prev === attributeId ? null : attributeId))
  }

  const handleAddAttribute = () => {
    const validationErrors: Record<string, string> = {}

    if (!newAttribute.name.trim()) {
      validationErrors.name = "Attribute name is required"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const attributeId = editingAttributeId || `attr-${Date.now()}`
    const attributeToAdd = {
      ...newAttribute,
      id: attributeId,
      slug: newAttribute.slug || newAttribute.name.toLowerCase().replace(/\s+/g, "-"),
    }

    let updatedAttributes
    if (editingAttributeId) {
      updatedAttributes = attributes.map((attr) => (attr.id === editingAttributeId ? attributeToAdd : attr))
    } else {
      updatedAttributes = [...attributes, attributeToAdd]
    }

    onChange(updatedAttributes)

    setNewAttribute({
      id: "",
      name: "",
      slug: "",
      type: "text",
      required: false,
      visible: true,
      filterable: true,
      searchable: true,
      variantable: false,
      displayOrder: attributes.length,
      values: [],
    })
    setIsAddingAttribute(false)
    setEditingAttributeId(null)
    setErrors({})
    setActiveTab("general")

    toast({
      title: editingAttributeId ? "Attribute Updated" : "Attribute Added",
      description: `${attributeToAdd.name} has been ${editingAttributeId ? "updated" : "added"}.`,
    })
  }

  const handleEditAttribute = (attribute: ProductAttribute) => {
    setNewAttribute(attribute)
    setEditingAttributeId(attribute.id)
    setIsAddingAttribute(true)
    setActiveTab("general")
  }

  const handleDeleteAttribute = (attributeId: string) => {
    const updatedAttributes = attributes.filter((attr) => attr.id !== attributeId)
    onChange(updatedAttributes)

    toast({
      title: "Attribute Deleted",
      description: "The attribute has been removed.",
    })
  }

  const handleAttributeChange = (attributeId: string, field: keyof ProductAttribute, value: any) => {
    const updatedAttributes = attributes.map((attr) => {
      if (attr.id === attributeId) {
        return { ...attr, [field]: value }
      }
      return attr
    })

    onChange(updatedAttributes)
  }

  const handleAttributeValuesChange = (attributeId: string, values: AttributeValue[]) => {
    const updatedAttributes = attributes.map((attr) => {
      if (attr.id === attributeId) {
        return { ...attr, values }
      }
      return attr
    })

    onChange(updatedAttributes)
  }

  const handleNewAttributeValuesChange = (values: AttributeValue[]) => {
    setNewAttribute((prev) => ({
      ...prev,
      values,
    }))
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAttribute((prev) => ({
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
    const slug = newAttribute.name.toLowerCase().replace(/\s+/g, "-")
    setNewAttribute((prev) => ({ ...prev, slug }))
  }

  const SortableAttribute = ({ attribute }: { attribute: ProductAttribute }) => {
    const {
      attributes: dndAttributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: attribute.id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...dndAttributes}
        className="border rounded-md overflow-hidden mb-2"
      >
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
          onClick={() => toggleAttribute(attribute.id)}
        >
          <div className="flex items-center gap-2">
            <div className="cursor-grab" {...listeners}>
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">{attribute.name}</span>
            <Badge variant="outline" className="capitalize">
              {attribute.type}
            </Badge>
            {attribute.required && (
              <Badge variant="secondary" className="text-xs">
                Required
              </Badge>
            )}
            {attribute.variantable && (
              <Badge variant="default" className="text-xs bg-primary/20 hover:bg-primary/30 text-primary">
                Variant
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {attribute.values.length} values
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                handleEditAttribute(attribute)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteAttribute(attribute.id)
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {expandedAttribute === attribute.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {expandedAttribute === attribute.id && (
          <div>
            <Separator />
            <div className="p-3 space-y-4 bg-muted/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`attr-${attribute.id}-name`}>Attribute Name</Label>
                  <Input
                    id={`attr-${attribute.id}-name`}
                    value={attribute.name}
                    onChange={(e) => handleAttributeChange(attribute.id, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`attr-${attribute.id}-slug`}>Slug</Label>
                  <Input
                    id={`attr-${attribute.id}-slug`}
                    value={attribute.slug}
                    onChange={(e) => handleAttributeChange(attribute.id, "slug", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`attr-${attribute.id}-type`}>Attribute Type</Label>
                  <Select
                    value={attribute.type}
                    onValueChange={(value: "text" | "number" | "boolean" | "select" | "color") =>
                      handleAttributeChange(attribute.id, "type", value)
                    }
                  >
                    <SelectTrigger id={`attr-${attribute.id}-type`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Yes/No</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`attr-${attribute.id}-description`}>Description</Label>
                  <Input
                    id={`attr-${attribute.id}-description`}
                    value={attribute.description || ""}
                    onChange={(e) => handleAttributeChange(attribute.id, "description", e.target.value)}
                    placeholder="Optional description"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`attr-${attribute.id}-required`}
                    checked={attribute.required}
                    onCheckedChange={(checked) => handleAttributeChange(attribute.id, "required", checked)}
                  />
                  <Label htmlFor={`attr-${attribute.id}-required`}>Required</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`attr-${attribute.id}-visible`}
                    checked={attribute.visible}
                    onCheckedChange={(checked) => handleAttributeChange(attribute.id, "visible", checked)}
                  />
                  <Label htmlFor={`attr-${attribute.id}-visible`}>Visible on product page</Label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`attr-${attribute.id}-variantable`}
                    checked={attribute.variantable}
                    onCheckedChange={(checked) => handleAttributeChange(attribute.id, "variantable", checked)}
                  />
                  <Label htmlFor={`attr-${attribute.id}-variantable`}>Use for variants</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`attr-${attribute.id}-filterable`}
                    checked={attribute.filterable}
                    onCheckedChange={(checked) => handleAttributeChange(attribute.id, "filterable", checked)}
                  />
                  <Label htmlFor={`attr-${attribute.id}-filterable`}>Use in filters</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`attr-${attribute.id}-searchable`}
                    checked={attribute.searchable}
                    onCheckedChange={(checked) => handleAttributeChange(attribute.id, "searchable", checked)}
                  />
                  <Label htmlFor={`attr-${attribute.id}-searchable`}>Include in search</Label>
                </div>
              </div>

              <Separator />

              <AttributeValueManager
                values={attribute.values}
                onChange={(values) => handleAttributeValuesChange(attribute.id, values)}
                attributeType={attribute.type}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderAttributeForm = () => (
    <div className="border rounded-md p-4 bg-muted/50 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{editingAttributeId ? "Edit Attribute" : "Add New Attribute"}</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsAddingAttribute(false)
            setEditingAttributeId(null)
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="border-b">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "general" ? "default" : "ghost"}
            onClick={() => setActiveTab("general")}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            data-state={activeTab === "general" ? "active" : "inactive"}
          >
            General
          </Button>
          <Button
            variant={activeTab === "values" ? "default" : "ghost"}
            onClick={() => setActiveTab("values")}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            data-state={activeTab === "values" ? "active" : "inactive"}
          >
            Values
          </Button>
        </div>
      </div>

      {activeTab === "general" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="attr-name">
                Attribute Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="attr-name"
                name="name"
                value={newAttribute.name}
                onChange={handleInputChange}
                placeholder="e.g., Color, Size, Material"
                className={cn(errors.name && "border-destructive")}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="attr-slug">Slug</Label>
                <Button variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                  Generate
                </Button>
              </div>
              <Input
                id="attr-slug"
                name="slug"
                value={newAttribute.slug}
                onChange={handleInputChange}
                placeholder="e.g., color, size, material"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="attr-type">
                Attribute Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={newAttribute.type}
                onValueChange={(value: "text" | "number" | "boolean" | "select" | "color") =>
                  setNewAttribute((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger id="attr-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Yes/No</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                  <SelectItem value="color">Color</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attr-description">Description</Label>
              <Input
                id="attr-description"
                name="description"
                value={newAttribute.description || ""}
                onChange={handleInputChange}
                placeholder="Optional description"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="attr-required"
                checked={newAttribute.required}
                onCheckedChange={(checked) => setNewAttribute((prev) => ({ ...prev, required: checked }))}
              />
              <Label htmlFor="attr-required">Required</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="attr-visible"
                checked={newAttribute.visible}
                onCheckedChange={(checked) => setNewAttribute((prev) => ({ ...prev, visible: checked }))}
              />
              <Label htmlFor="attr-visible">Visible on product page</Label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="attr-variantable"
                checked={newAttribute.variantable}
                onCheckedChange={(checked) => setNewAttribute((prev) => ({ ...prev, variantable: checked }))}
              />
              <Label htmlFor="attr-variantable">Use for variants</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="attr-filterable"
                checked={newAttribute.filterable}
                onCheckedChange={(checked) => setNewAttribute((prev) => ({ ...prev, filterable: checked }))}
              />
              <Label htmlFor="attr-filterable">Use in filters</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="attr-searchable"
                checked={newAttribute.searchable}
                onCheckedChange={(checked) => setNewAttribute((prev) => ({ ...prev, searchable: checked }))}
              />
              <Label htmlFor="attr-searchable">Include in search</Label>
            </div>
          </div>
        </div>
      ) : (
        <AttributeValueManager
          values={newAttribute.values}
          onChange={handleNewAttributeValuesChange}
          attributeType={newAttribute.type}
        />
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setIsAddingAttribute(false)
            setEditingAttributeId(null)
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAddAttribute}>{editingAttributeId ? "Update Attribute" : "Add Attribute"}</Button>
      </div>
    </div>
  )

  return (
    <div className="enhanced-attribute-manager space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Attributes</h3>
        <Button onClick={() => setIsAddingAttribute(true)} disabled={isAddingAttribute}>
          <Plus className="h-4 w-4 mr-2" />
          Add Attribute
        </Button>
      </div>

      {isAddingAttribute && renderAttributeForm()}

      {attributes.length === 0 && !isAddingAttribute ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No attributes defined yet. Add your first attribute to get started.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={attributes.map((attr) => attr.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {attributes
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((attribute) => (
                  <SortableAttribute key={attribute.id} attribute={attribute} />
                ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
