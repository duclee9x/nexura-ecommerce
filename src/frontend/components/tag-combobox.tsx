"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { ProductTag } from "@nexura/grpc_gateway/protos"

interface TagComboboxProps {
  selectedTags: ProductTag[]
  onChange:     (tags: ProductTag[]) => void
  productId:    string
}

export function TagCombobox({ selectedTags, onChange, productId }: TagComboboxProps) {
  const [ inputValue, setInputValue ] = useState("")

  const handleTagRemove = (tagName: string) => {
    onChange(selectedTags.filter(t => t.tag?.name !== tagName))
  }

  const handleCreateTag = () => {
    if (inputValue.trim() !== "" && !selectedTags.some(t => t.tag?.name === inputValue.trim())) {
      const newTag: ProductTag = {
        id:  "",
        tag: {
          id:        "",
          name:      inputValue.trim(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        productId
      }
      onChange([ ...selectedTags, newTag ])
      setInputValue("")
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <Badge key={tag.tag?.name || ""} variant="secondary" className="capitalize flex items-center">
            {tag.tag?.name || ""}
            <button className="ml-1 hover:text-destructive" onClick={() => handleTagRemove(tag.tag?.name || "")}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add new tag..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleCreateTag()
            }
          }}
        />
        <Button variant="outline" size="sm" onClick={handleCreateTag} disabled={!inputValue.trim()}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  )
}
