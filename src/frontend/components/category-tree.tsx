"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, FolderPlus, Folder, X, Edit, Check, AlertCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export interface Category {
  id:       string
  name:     string
  parentId: string | null
}

interface CategoryTreeProps {
  categories:          Category[] | undefined
  selectedCategories:  string[]
  onCategorySelect:    (categoryIds: string[]) => void
  onCategoryUpdate:    (category: Category) => void
  onCategoryCreate:    (category: Category, parentCategoryId: string) => void
  allowMultipleRoots?: boolean
}

export function CategoryTree({
  categories,
  selectedCategories,
  onCategorySelect,
  onCategoryUpdate,
  onCategoryCreate,
  allowMultipleRoots = false,
}: CategoryTreeProps) {
  const [ expandedCategories, setExpandedCategories ] = useState<string[]>([])
  const [ isAddingCategory, setIsAddingCategory ] = useState(false)
  const [ newCategoryName, setNewCategoryName ] = useState("")
  const [ newCategoryParentId, setNewCategoryParentId ] = useState<string | null>(null)
  const [ editingCategoryId, setEditingCategoryId ] = useState<string | null>(null)
  const [ editingCategoryName, setEditingCategoryName ] = useState("")
  const [ error, setError ] = useState<string | null>(null)
  const [ hoveredCategoryId, setHoveredCategoryId ] = useState<string | null>(null)
 

  useEffect(() => {
    const parentsToExpand = new Set<string>()
    selectedCategories.forEach((id) => {
      let currentId = id
      while (currentId) {
        const category = categories?.find(c => c.id === currentId)
        if (category?.parentId) {
          parentsToExpand.add(category.parentId)
          currentId = category.parentId
        } else {
          currentId = ""
        }
      }
    })
    setExpandedCategories(prev => [ ...prev, ...Array.from(parentsToExpand) ])
  }, [ categories, selectedCategories ])

  const getCategoryPath = (categoryId: string): Category[] => {
    const path: Category[] = []
    let currentId = categoryId

    while (currentId) {
      const category = categories?.find(c => c.id === currentId)
      if (category) {
        path.unshift(category)
        currentId = category.parentId || ""
      } else {
        currentId = ""
      }
    }

    return path
  }

  const getRootCategoryId = (categoryId: string): string | null => {
    let currentId = categoryId
    while (currentId) {
      const category = categories?.find(c => c.id === currentId)
      if (!category) return null
      if (!category.parentId) return category.id
      currentId = category.parentId
    }
    return null
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [ ...prev, categoryId ],
    )
  }

  const handleCategorySelect = (categoryId: string) => {
    if (!allowMultipleRoots) {
      const rootId = getRootCategoryId(categoryId)
      const currentRootIds = selectedCategories
        .map(id => getRootCategoryId(id))
        .filter((id): id is string => id !== null)
        .filter((id, index, self) => self.indexOf(id) === index)

      if (currentRootIds.length > 0 && !currentRootIds.includes(rootId as string)) {
        setError("Only one root category can be selected. Please deselect the current category first.")
        return
      }
    }

    setError(null)

    if (selectedCategories.includes(categoryId)) {
      const childrenIds = categories?.filter(c => c.parentId === categoryId)
        .map(c => c.id)
      onCategorySelect(selectedCategories.filter(id => id !== categoryId && !childrenIds?.includes(id)))
    } else {
      onCategorySelect([ ...selectedCategories, categoryId ])
    }
  }

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title:       "Error",
        description: "Category name is required",
        variant:     "destructive",
      })
      return
    }

    const newCategory: Category = {
      id:       `cat-${Date.now()}`,
      name:     newCategoryName.trim(),
      parentId: newCategoryParentId,
    }

    onCategoryCreate(newCategory, newCategoryParentId || "")
    if (newCategoryParentId && !expandedCategories.includes(newCategoryParentId)) {
      setExpandedCategories(prev => [ ...prev, newCategoryParentId ])
    }

    setIsAddingCategory(false)
    setNewCategoryName("")
    setNewCategoryParentId(null)
  }

  const handleEditCategory = (categoryId: string) => {
    const category = categories?.find(c => c.id === categoryId)
    if (category) {
      setEditingCategoryId(categoryId)
      setEditingCategoryName(category.name)
    }
  }

  const saveEditedCategory = (category: Category) => {
    if (!categories) return
    const updatedCategory = { ...category }
    const parentCategory = categories.find(c => c.id === category.parentId)
    updatedCategory.name = editingCategoryName.trim()
    if (parentCategory) {
      updatedCategory.parentId = parentCategory.id
    } else {
      updatedCategory.parentId = null
    }
    onCategoryUpdate(updatedCategory)
    setEditingCategoryId(null)
    setEditingCategoryName("")
  }

  const renderCategoryBreadcrumb = (categoryId: string) => {
    const path = getCategoryPath(categoryId)
    if (path.length === 0) return null

    return (
      <Breadcrumb key={categoryId} className="text-xs">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Home className="h-3 w-3" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {path.map((category, index) => (
            <BreadcrumbItem key={category.id}>
              <BreadcrumbSeparator />
              <BreadcrumbLink className={index === path.length - 1 ? "font-medium" : ""}>
                {category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  const getCategoryDepth = (categoryId: string): number => {
    let depth = 0
    let currentId = categoryId
    while (currentId) {
      const category = categories?.find(c => c.id === currentId)
      if (category?.parentId) {
        depth++
        currentId = category.parentId
      } else {
        currentId = ""
      }
    }
    return depth
  }

  const renderCategory = (category: Category) => {
    const isExpanded = expandedCategories.includes(category.id)
    const isSelected = selectedCategories.includes(category.id)
    const hasChildren = categories?.some(c => c.parentId === category.id) || false
    const isHovered = hoveredCategoryId === category.id
    const depth = getCategoryDepth(category.id)

    return (
      <div
        key={category.id}
        className="category-item"
        onMouseEnter={() => setHoveredCategoryId(category.id)}
        onMouseLeave={() => setHoveredCategoryId(null)}
      >
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded-md hover:bg-muted transition-colors",
            isSelected && "bg-muted",
          )}
        >
          <div className="flex-1 flex items-center">
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 mr-1"
                onClick={() => toggleCategory(category.id)}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            ) : (
              <div className="w-7 flex justify-center">
                <Folder className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            <div
              className={cn("flex-1 cursor-pointer text-sm", isSelected && "font-medium")}
              onClick={() => handleCategorySelect(category.id)}
              style={{ paddingLeft: depth > 0 ? `${depth * 8}px` : "0" }}
            >
              {editingCategoryId === category.id ? (
                <div className="flex items-center">
                  <Input
                    value={editingCategoryName}
                    onChange={e => setEditingCategoryName(e.target.value)}
                    className="h-7 py-1"
                    autoFocus
                    onClick={e => e.stopPropagation()}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      saveEditedCategory(category)
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingCategoryId(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <span>{category.name}</span>
              )}
            </div>

            {editingCategoryId !== category.id && (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7 transition-opacity", isHovered ? "opacity-100" : "opacity-0")}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditCategory(category.id)
                  }}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-7 w-7 transition-opacity", isHovered ? "opacity-100" : "opacity-0")}
                  onClick={(e) => {
                    e.stopPropagation()
                    setNewCategoryParentId(category.id)
                    setIsAddingCategory(true)
                  }}
                >
                  <FolderPlus className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 pl-2 border-l border-muted">
            {categories?.filter(c => c.parentId === category.id)
              .map(child => renderCategory(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="category-tree space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {allowMultipleRoots ? "Select categories for this product" : "Select a single root category for this product"}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setNewCategoryParentId(null)
            setIsAddingCategory(true)
          }}
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          Add Root Category
        </Button>
      </div>

      <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
        {categories == undefined || categories.length == 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No categories found. Add your first category to get started.
          </div>
        ) : (
          <div className="space-y-1">
            {categories?.filter(category => !category.parentId)
              .map(category => renderCategory(category))}
          </div>
        )}
      </div>
      {isAddingCategory && (
        <div className="border rounded-md p-4 bg-muted/50">
          <h4 className="text-sm font-medium mb-2">
            {newCategoryParentId
              ? `Add subcategory to ${categories?.find(c => c.id === newCategoryParentId)?.name}`
              : "Add root category"}
          </h4>
          <div className="flex items-center gap-2">
            <Input
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleAddCategory}>
              Add
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAddingCategory(false)
                setNewCategoryName("")
                setNewCategoryParentId(null)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {selectedCategories.map(category => renderCategoryBreadcrumb(category)) || <p className="text-destructive text-sm">No category selected</p>}
    </div>
  )
}
