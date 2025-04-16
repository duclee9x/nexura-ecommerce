"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, StarOff, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

// Default color palette
const defaultColors = [
  // Reds
  "#FF0000",
  "#FF5252",
  "#FF4081",
  "#F44336",
  "#E91E63",
  // Purples
  "#9C27B0",
  "#673AB7",
  "#7E57C2",
  "#BA68C8",
  "#CE93D8",
  // Blues
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#4FC3F7",
  // Greens
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#76FF03",
  // Yellows/Oranges
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#FFAB91",
  // Browns
  "#795548",
  "#A1887F",
  "#BCAAA4",
  "#D7CCC8",
  "#EFEBE9",
  // Grays
  "#9E9E9E",
  "#757575",
  "#616161",
  "#424242",
  "#212121",
  // Black/White
  "#000000",
  "#FFFFFF",
]

export interface NamedColor {
  value: string
  name: string
  isFavorite?: boolean
}

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  colorName?: string
  onColorNameChange?: (name: string) => void
  showFavorites?: boolean
  onColorUpdate?: (color: string, colorName: string) => void
}

export function ColorPicker({ value, onChange, colorName = "", onColorNameChange, showFavorites = true, onColorUpdate }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(value || "#000000")
  const [customColor, setCustomColor] = useState(value || "#000000")
  const [favoriteColors, setFavoriteColors] = useState<NamedColor[]>([])
  const [displayColors, setDisplayColors] = useState<string[]>([])
  const [isAddingCustomColor, setIsAddingCustomColor] = useState(false)
  const [customColorName, setCustomColorName] = useState("")
  // Load favorite colors from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteColors")
    if (savedFavorites) {
      try {
        setFavoriteColors(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Error loading favorite colors:", e)
        setFavoriteColors([])
      }
    }
  }, [])

  // Generate a random selection of colors on mount
  useEffect(() => {
    const getRandomColors = (count: number) => {
      const shuffled = [...defaultColors].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

    setDisplayColors(getRandomColors(20))
  }, [])

  // Update color name when prop changes


  // Save favorite colors to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favoriteColors", JSON.stringify(favoriteColors))
  }, [favoriteColors])

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setCustomColor(color)
    onChange(color)
    
    // If onColorUpdate is provided, update all variants with the same color name
    if (onColorUpdate && colorName) {
      onColorUpdate(color, colorName)
    }
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value)
  }

  const handleCustomColorApply = () => {
    setSelectedColor(customColor)
    onChange(customColor)
    
    // If onColorUpdate is provided, update all variants with the same color name
    if (onColorUpdate && colorName) {
      onColorUpdate(customColor, colorName)
    }
  }

  const handleColorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onColorNameChange) {
      onColorNameChange(e.target.value)
    }
  }

  const toggleFavorite = (color: string) => {
    const existingIndex = favoriteColors.findIndex((c) => c.value === color)

    if (existingIndex >= 0) {
      // Remove from favorites
      const newFavorites = [...favoriteColors]
      newFavorites.splice(existingIndex, 1)
      setFavoriteColors(newFavorites)
      toast({
        title: "Removed from favorites",
        description: "Color has been removed from your favorites.",
      })
    } else {
      // Add to favorites if under limit
      if (favoriteColors.length >= 10) {
        toast({
          title: "Favorites limit reached",
          description: "You can only have 10 favorite colors. Remove some to add more.",
          variant: "destructive",
        })
        return
      }

      // Find if the color has a name in the existing named colors

      setFavoriteColors([...favoriteColors, { value: color, name: colorName }])
      toast({
        title: "Added to favorites",
        description: `${colorName} has been added to your favorites.`,
      })
    }
  }

  const isColorFavorite = (color: string) => {
    return favoriteColors.some((c) => c.value === color)
  }

  const handleAddCustomColor = () => {
    if (!customColorName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your custom color.",
        variant: "destructive",
      })
      return
    }

    // Add to favorites if under limit
    if (favoriteColors.length >= 10) {
      toast({
        title: "Favorites limit reached",
        description: "You can only have 10 favorite colors. Remove some to add more.",
        variant: "destructive",
      })
      return
    }

    setFavoriteColors([...favoriteColors, { value: customColor, name: customColorName }])
    setIsAddingCustomColor(false)
    setCustomColorName("")

    toast({
      title: "Custom color added",
      description: `${customColorName} has been added to your favorites.`,
    })
  }

  return (
    <div className="color-picker space-y-4">
      <div className="flex flex-col my-0  w-[100%] items-center gap-4">
        <div className="flex items-center justify-between w-full gap-6 md:flex-row">
          <Label className="w-1/5" htmlFor="color-name">Color Name</Label>
          <Input
            className="w-full"
            id="color-name"
            value={colorName}
            onChange={handleColorNameChange}
            placeholder="e.g., Navy Blue, Forest Green"
          />
        </div>

        <div className="space-y-2 flex justify-between w-[100%] items-center gap-6">
          <Label htmlFor="color-hex">Hex Value</Label>
          <div className="flex items-center gap-3 grow">
            <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: customColor }} />
            <Input
              id="color-hex"
              type="text"
              value={customColor}
              onChange={handleCustomColorChange}
              className="my-0 grow w-full"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleCustomColorApply} className="h-10">
              Apply
            </Button>
        </div>
      </div>

      {showFavorites && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Favorite Colors</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingCustomColor(true)}
              disabled={isAddingCustomColor}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Custom
            </Button>
          </div>

          {isAddingCustomColor && (
            <div className="flex items-end gap-2 p-2 border rounded-md bg-muted/30">
              <div className="flex-1 space-y-1">
                <Label htmlFor="custom-color-name" className="text-xs">
                  Color Name
                </Label>
                <Input
                  id="custom-color-name"
                  value={customColorName}
                  onChange={(e) => setCustomColorName(e.target.value)}
                  placeholder="Enter color name"
                  className="h-8"
                />
              </div>
              <Button size="sm" onClick={handleAddCustomColor}>
                Add
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsAddingCustomColor(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="grid grid-cols-5 gap-2">
            {favoriteColors.length > 0 ? (
              favoriteColors.map((color, index) => (
                <div key={index} className="relative group">
                  <button
                    type="button"
                    className={cn(
                      "w-full aspect-square rounded-md border transition-all",
                      selectedColor === color.value ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50",
                    )}
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorSelect(color.value)}
                    title={color.name}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-5 w-5 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(color.value)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <div className="text-xs truncate mt-1 text-center">{color.name}</div>
                </div>
              ))
            ) : (
              <div className="col-span-5 text-center py-2 text-sm text-muted-foreground">
                No favorite colors yet. Star colors below to add them here.
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Color Palette</Label>
        <div className="grid grid-cols-10 gap-2">
          {displayColors.map((color, index) => (
            <div key={index} className="relative group">
              <button
                type="button"
                className={cn(
                  "w-full aspect-square rounded-md border transition-all",
                  selectedColor === color ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50",
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
              {showFavorites && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 h-5 w-5 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(color)
                  }}
                >
                  {isColorFavorite(color) ? (
                    <Star className="h-3 w-3 text-yellow-400" />
                  ) : (
                    <StarOff className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color-picker">Color Picker</Label>
        <Input
          id="color-picker"
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
          className="h-10 p-1"
        />
      </div>
    </div>
  )
}
