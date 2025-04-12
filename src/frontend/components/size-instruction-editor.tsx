"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash, ImageIcon, Table2, Save, X, FileUp, Edit } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export interface SizeTableColumn {
  id: string
  name: string
  type: "text" | "number" | "measurement"
  unit?: string
}

export interface SizeTableRow {
  id: string
  name: string
  values: { [columnId: string]: string }
}

export interface SizeChart {
  id: string
  name: string
  category: string
  description?: string
  columns: SizeTableColumn[]
  rows: SizeTableRow[]
  images: {
    id: string
    url: string
    name: string
  }[]
}

interface SizeInstructionEditorProps {
  sizeCharts: SizeChart[]
  onChange: (sizeCharts: SizeChart[]) => void
  productCategories: string[]
}

export function SizeInstructionEditor({ sizeCharts, onChange, productCategories }: SizeInstructionEditorProps) {
  const [activeTab, setActiveTab] = useState("table")
  const [editingChartId, setEditingChartId] = useState<string | null>(null)
  const [isAddingChart, setIsAddingChart] = useState(false)
  const [newColumn, setNewColumn] = useState<Omit<SizeTableColumn, "id">>({
    name: "",
    type: "text",
  })
  const [newRow, setNewRow] = useState<{ name: string }>({ name: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get the current chart being edited
  const currentChart = editingChartId
    ? sizeCharts.find((chart) => chart.id === editingChartId) || createEmptyChart()
    : createEmptyChart()

  function createEmptyChart(): SizeChart {
    return {
      id: `size-chart-${Date.now()}`,
      name: "",
      category: "",
      description: "",
      columns: [],
      rows: [],
      images: [],
    }
  }

  const handleAddChart = () => {
    if (!currentChart.name) {
      toast({
        title: "Error",
        description: "Please provide a name for the size chart",
        variant: "destructive",
      })
      return
    }

    if (!currentChart.category) {
      toast({
        title: "Error",
        description: "Please select a category for the size chart",
        variant: "destructive",
      })
      return
    }

    const updatedCharts = editingChartId
      ? sizeCharts.map((chart) => (chart.id === editingChartId ? currentChart : chart))
      : [...sizeCharts, currentChart]

    onChange(updatedCharts)
    setEditingChartId(null)
    setIsAddingChart(false)
    toast({
      title: editingChartId ? "Size Chart Updated" : "Size Chart Added",
      description: `${currentChart.name} has been ${editingChartId ? "updated" : "added"} successfully.`,
    })
  }

  const handleDeleteChart = (chartId: string) => {
    const updatedCharts = sizeCharts.filter((chart) => chart.id !== chartId)
    onChange(updatedCharts)
    toast({
      title: "Size Chart Deleted",
      description: "The size chart has been removed.",
    })
  }

  const handleEditChart = (chartId: string) => {
    setEditingChartId(chartId)
    setIsAddingChart(true)
    setActiveTab("table")
  }

  const handleAddColumn = () => {
    if (!newColumn.name) {
      toast({
        title: "Error",
        description: "Column name is required",
        variant: "destructive",
      })
      return
    }

    const columnId = `col-${Date.now()}`
    const updatedChart = {
      ...currentChart,
      columns: [
        ...currentChart.columns,
        {
          id: columnId,
          name: newColumn.name,
          type: newColumn.type,
          unit: newColumn.type === "measurement" ? newColumn.unit || "cm" : undefined,
        },
      ],
      rows: currentChart.rows.map((row) => ({
        ...row,
        values: {
          ...row.values,
          [columnId]: "",
        },
      })),
    }

    setEditingChartId(updatedChart.id)
    setNewColumn({ name: "", type: "text" })
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleDeleteColumn = (columnId: string) => {
    const updatedChart = {
      ...currentChart,
      columns: currentChart.columns.filter((col) => col.id !== columnId),
      rows: currentChart.rows.map((row) => {
        const { [columnId]: _, ...restValues } = row.values
        return {
          ...row,
          values: restValues,
        }
      }),
    }

    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleAddRow = () => {
    if (!newRow.name) {
      toast({
        title: "Error",
        description: "Row name is required",
        variant: "destructive",
      })
      return
    }

    const rowValues: { [key: string]: string } = {}
    currentChart.columns.forEach((col) => {
      rowValues[col.id] = ""
    })

    const updatedChart = {
      ...currentChart,
      rows: [
        ...currentChart.rows,
        {
          id: `row-${Date.now()}`,
          name: newRow.name,
          values: rowValues,
        },
      ],
    }

    setEditingChartId(updatedChart.id)
    setNewRow({ name: "" })
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleDeleteRow = (rowId: string) => {
    const updatedChart = {
      ...currentChart,
      rows: currentChart.rows.filter((row) => row.id !== rowId),
    }

    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleCellChange = (rowId: string, columnId: string, value: string) => {
    const updatedChart = {
      ...currentChart,
      rows: currentChart.rows.map((row) => {
        if (row.id === rowId) {
          return {
            ...row,
            values: {
              ...row.values,
              [columnId]: value,
            },
          }
        }
        return row
      }),
    }

    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleChartNameChange = (name: string) => {
    const updatedChart = {
      ...currentChart,
      name,
    }
    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleChartCategoryChange = (category: string) => {
    const updatedChart = {
      ...currentChart,
      category,
    }
    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleChartDescriptionChange = (description: string) => {
    const updatedChart = {
      ...currentChart,
      description,
    }
    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const imageUrl = URL.createObjectURL(file)
      newImages.push({
        id: `img-${Date.now()}-${i}`,
        url: imageUrl,
        name: file.name,
      })
    }

    const updatedChart = {
      ...currentChart,
      images: [...currentChart.images, ...newImages],
    }

    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    toast({
      title: "Images Added",
      description: `${newImages.length} image(s) have been added to the size chart.`,
    })
  }

  const handleRemoveImage = (imageId: string) => {
    const updatedChart = {
      ...currentChart,
      images: currentChart.images.filter((img) => img.id !== imageId),
    }

    setEditingChartId(updatedChart.id)
    const updatedCharts = sizeCharts.map((chart) => 
      chart.id === updatedChart.id ? updatedChart : chart
    )
    onChange(updatedCharts)
  }

  const renderSizeChartList = () => {
    if (sizeCharts.length === 0) {
      return (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No size charts defined yet. Add your first size chart to get started.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sizeCharts.map((chart) => (
          <Card key={chart.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{chart.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditChart(chart.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDeleteChart(chart.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Category: {chart.category}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Table2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {chart.columns.length} columns, {chart.rows.length} rows
                </span>
              </div>
              {chart.images.length > 0 && (
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{chart.images.length} size chart image(s)</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderTableEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="chart-name">
            Chart Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="chart-name"
            value={currentChart.name}
            onChange={(e) => handleChartNameChange(e.target.value)}
            placeholder="e.g., Men's Shoe Sizes"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chart-category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select value={currentChart.category} onValueChange={handleChartCategoryChange}>
            <SelectTrigger id="chart-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chart-description">Description</Label>
          <Input
            id="chart-description"
            value={currentChart.description || ""}
            onChange={(e) => handleChartDescriptionChange(e.target.value)}
            placeholder="Optional description"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Table Columns</h4>
          <div className="flex items-center gap-2">
            <Select
              value={newColumn.type}
              onValueChange={(value: "text" | "number" | "measurement") =>
                setNewColumn((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Column type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="measurement">Measurement</SelectItem>
              </SelectContent>
            </Select>

            {newColumn.type === "measurement" && (
              <Select
                value={newColumn.unit || "cm"}
                onValueChange={(value) => setNewColumn((prev) => ({ ...prev, unit: value }))}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="in">in</SelectItem>
                  <SelectItem value="mm">mm</SelectItem>
                </SelectContent>
              </Select>
            )}

            <div className="flex items-center gap-2">
              <Input
                value={newColumn.name}
                onChange={(e) => setNewColumn((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Column name"
                className="w-[180px]"
              />
              <Button onClick={handleAddColumn} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {currentChart.columns.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Size</TableHead>
                  {currentChart.columns.map((column) => (
                    <TableHead key={column.id}>
                      <div className="flex justify-between items-center">
                        <span>
                          {column.name}
                          {column.type === "measurement" && column.unit && (
                            <span className="text-xs text-muted-foreground ml-1">({column.unit})</span>
                          )}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={() => handleDeleteColumn(column.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentChart.rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    {currentChart.columns.map((column) => (
                      <TableCell key={column.id}>
                        <Input
                          value={row.values[column.id] || ""}
                          onChange={(e) => handleCellChange(row.id, column.id, e.target.value)}
                          type={column.type === "number" || column.type === "measurement" ? "number" : "text"}
                          step={column.type === "measurement" ? "0.1" : undefined}
                          className="h-8"
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={currentChart.columns.length + 2}>
                    <div className="flex items-center gap-2 py-1">
                      <Input
                        value={newRow.name}
                        onChange={(e) => setNewRow({ name: e.target.value })}
                        placeholder="New size name (e.g., Small, 42, XL)"
                        className="w-[200px]"
                      />
                      <Button onClick={handleAddRow} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Row
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-6 border rounded-md bg-muted/50">
            <p className="text-muted-foreground">No columns defined yet. Add columns to create your size chart.</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderImageEditor = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Size Chart Images</h4>
        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          <FileUp className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      {currentChart.images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentChart.images.map((image) => (
            <div key={image.id} className="border rounded-md overflow-hidden">
              <div className="relative aspect-video">
                <img src={image.url || "/placeholder.svg"} alt={image.name} className="object-contain w-full h-full" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-80 hover:opacity-100"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-2 text-sm truncate">{image.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md bg-muted/50">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No images uploaded yet. Upload images to show size charts.</p>
        </div>
      )}
    </div>
  )

  const renderChartPreview = () => {
    if (currentChart.columns.length === 0 && currentChart.images.length === 0) {
      return (
        <div className="text-center py-12 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">
            Add table columns and rows or upload images to preview your size chart.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="bg-white p-4 border rounded-md">
          <h3 className="text-xl font-bold mb-2">{currentChart.name || "Size Chart"}</h3>
          {currentChart.description && <p className="text-muted-foreground mb-4">{currentChart.description}</p>}

          {currentChart.columns.length > 0 && currentChart.rows.length > 0 && (
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border px-4 py-2 text-left">Size</th>
                    {currentChart.columns.map((column) => (
                      <th key={column.id} className="border px-4 py-2 text-left">
                        {column.name}
                        {column.type === "measurement" && column.unit && (
                          <span className="text-xs text-muted-foreground ml-1">({column.unit})</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentChart.rows.map((row) => (
                    <tr key={row.id}>
                      <td className="border px-4 py-2 font-medium">{row.name}</td>
                      {currentChart.columns.map((column) => (
                        <td key={column.id} className="border px-4 py-2">
                          {row.values[column.id] || "-"}
                          {column.type === "measurement" && row.values[column.id] && column.unit && (
                            <span className="text-xs text-muted-foreground ml-1">{column.unit}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentChart.images.length > 0 && (
            <div className="space-y-4">
              {currentChart.images.map((image) => (
                <div key={image.id} className="border rounded-md overflow-hidden">
                  <img src={image.url || "/placeholder.svg"} alt={image.name} className="max-w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="size-instruction-editor space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Size Charts</h3>
        <Button
          onClick={() => {
            setEditingChartId(null)
            setIsAddingChart(true)
            setActiveTab("table")
          }}
          disabled={isAddingChart}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Size Chart
        </Button>
      </div>

      {isAddingChart ? (
        <div className="border rounded-md p-4 bg-card">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-lg">{editingChartId ? "Edit Size Chart" : "Create New Size Chart"}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAddingChart(false)
                setEditingChartId(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="table">Table Editor</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-4">
              {renderTableEditor()}
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              {renderImageEditor()}
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              {renderChartPreview()}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingChart(false)
                setEditingChartId(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddChart}>
              <Save className="h-4 w-4 mr-2" />
              {editingChartId ? "Update Size Chart" : "Save Size Chart"}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {renderSizeChartList()}
        </div>
      )}
    </div>
  )
}
