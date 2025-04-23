import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical, ChevronDown, Settings, Trash } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ProductAttribute } from "@nexura/grpc_gateway/protos"
import { AttributeForm } from "./attribute-form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SortableAttributeProps {
  attribute: ProductAttribute
  attributes: ProductAttribute[]
  onChange: (attributes: ProductAttribute[]) => void
  showAdvancedOptions?: boolean
  onDelete: (id: string) => void
}

export function SortableAttribute({ 
  attribute, 
  attributes: allAttributes, 
  onChange,
  showAdvancedOptions = true,
  onDelete
}: SortableAttributeProps) {
  const { attributes: dndAttributes, listeners, setNodeRef, transform, transition } = useSortable({ id: attribute.id })
  const [isEditing, setIsEditing] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = (updatedAttribute: ProductAttribute) => {
    const updatedAttributes = allAttributes.map((attr) => {
      if (attr.id === attribute.id) {
        return updatedAttribute
      }
      return attr
    })
    onChange(updatedAttributes)
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...dndAttributes}
      className="border rounded-md overflow-hidden mb-2"
    >
      {isEditing ? (
        <AttributeForm
          mode="edit"
          attribute={attribute}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          title="Edit Attribute"
        />
      ) : (
        <div onClick={() => setIsEditing(!isEditing)} className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="cursor-grab" {...listeners}>
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-medium">{attribute.name}</span>

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
          </div>

          <div className="flex items-center gap-2">
            {showAdvancedOptions && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-4">
                          <h4 className="font-medium">Attribute Settings</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`attr-${attribute.id}-variantable`}
                                checked={attribute.variantable}
                                onCheckedChange={(checked) => {
                                  const updatedAttributes = allAttributes.map((attr) => {
                                    if (attr.id === attribute.id) {
                                      return { ...attr, variantable: !!checked }
                                    }
                                    return attr
                                  })
                                  onChange(updatedAttributes)
                                }}
                              />
                              <Label htmlFor={`attr-${attribute.id}-variantable`}>Use for product variants</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`attr-${attribute.id}-filterable`}
                                checked={attribute.filterable}
                                onCheckedChange={(checked) => {
                                  const updatedAttributes = allAttributes.map((attr) => {
                                    if (attr.id === attribute.id) {
                                      return { ...attr, filterable: !!checked }
                                    }
                                    return attr
                                  })
                                  onChange(updatedAttributes)
                                }}
                              />
                              <Label htmlFor={`attr-${attribute.id}-filterable`}>Use in product filters</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`attr-${attribute.id}-searchable`}
                                checked={attribute.searchable}
                                onCheckedChange={(checked) => {
                                  const updatedAttributes = allAttributes.map((attr) => {
                                    if (attr.id === attribute.id) {
                                      return { ...attr, searchable: !!checked }
                                    }
                                    return attr
                                  })
                                  onChange(updatedAttributes)
                                }}
                              />
                              <Label htmlFor={`attr-${attribute.id}-searchable`}>Include in search</Label>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attribute Settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(attribute.id)
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 