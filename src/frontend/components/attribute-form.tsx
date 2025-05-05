import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ProductAttribute } from "@nexura/grpc_gateway/protos"

interface AttributeFormProps {
  mode: "edit" | "add"
  attribute: ProductAttribute
  onSave: (attribute: ProductAttribute) => void
  onCancel: () => void
  showAdvancedOptions?: boolean
  errors?: Record<string, string>
  title?: string
}

export function AttributeForm({ 
  attribute,
  onSave, 
  onCancel, 
  showAdvancedOptions = true, 
  title = "Attribute Details"
}: AttributeFormProps) {
  const [inputValue, setInputValue] = useState("")
  const [formData, setFormData] = useState<ProductAttribute>(attribute)
  const [errorsState, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setFormData(attribute)
  }, [attribute])

  const handleAddValue = () => {
    if (!inputValue.trim()) return
    const updatedFormData = {
      ...formData,
      values: [...formData.values, inputValue.trim()]
    }
    setFormData(updatedFormData)
    setInputValue("")
  }

  const handleRemoveValue = (value: string) => {
    const updatedValues = formData.values.filter((val) => val !== value)
    const updatedFormData = { ...formData, values: updatedValues }
    setFormData(updatedFormData)
  }

  const handleSave = () => {
    // Validate form data
    if (!formData.name.trim()) {
      setErrors({ name: "Attribute name is required" })
      return
    }

    // Call onSave with the current form data
    onSave({
      ...formData,
      id: formData.id || `attr-${Date.now()}`,
      displayOrder: formData.displayOrder || 0
    })
  }

  return (
    <div
      className="border rounded-md p-4 bg-muted/50 space-y-4"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-medium">{title}</h4>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="attr-name">
            Attribute Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="attr-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Color, Size, Material"
            className={cn(errorsState.name && "border-destructive")}
          />
          {errorsState.name && <p className="text-xs text-destructive">{errorsState.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="attr-values">Attribute Values</Label>
          <div className="flex gap-2">
            <Input
              id="attr-values"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddValue()
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddValue}
              disabled={!inputValue.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.values.map((value, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {value}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleRemoveValue(value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="attr-required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
            />
            <Label htmlFor="attr-required">Required</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="attr-visible"
              checked={formData.visible}
              onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
            />
            <Label htmlFor="attr-visible">Visible on product page</Label>
          </div>
        </div>

        {showAdvancedOptions && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Advanced Options</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="attr-variantable"
                    checked={formData.variantable}
                    onCheckedChange={(checked) => setFormData({ ...formData, variantable: checked })}
                  />
                  <Label htmlFor="attr-variantable" className="text-sm">
                    Use for variants
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="attr-filterable"
                    checked={formData.filterable}
                    onCheckedChange={(checked) => setFormData({ ...formData, filterable: checked })}
                  />
                  <Label htmlFor="attr-filterable" className="text-sm">
                    Use in filters
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="attr-searchable"
                    checked={formData.searchable}
                    onCheckedChange={(checked) => setFormData({ ...formData, searchable: checked })}
                  />
                  <Label htmlFor="attr-searchable" className="text-sm">
                    Include in search
                  </Label>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Plus className="h-4 w-4 mr-2" />
            Save Attribute
          </Button>
        </div>
      </div>
    </div>
  )
} 