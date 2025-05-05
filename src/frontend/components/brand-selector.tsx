"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"
import { Brand } from "@nexura/grpc_gateway/protos"


interface BrandSelectorProps {
  selectedBrandId: string | null
  onBrandSelect: (brandId: string) => void
  onBrandCreate: (brand: Brand) => void
  brands: Brand[] | undefined
}

export function BrandSelector({ selectedBrandId, onBrandSelect, onBrandCreate, brands }: BrandSelectorProps) {
  const [open, setOpen] = useState(false)
  const [isAddingBrand, setIsAddingBrand] = useState(false)
  const [newBrandName, setNewBrandName] = useState("")
  const [newBrandLogo, setNewBrandLogo] = useState<File | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const queryClient = useQueryClient()
  const selectedBrand = brands?.find((brand) => brand.id === selectedBrandId)

  const filteredBrands = searchQuery
    ? brands?.filter((brand) => brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : brands

  const handleCreateBrand = () => {
    if (!newBrandName.trim()) {
      toast({
        title: "Error",
        description: "Brand name is required",
        variant: "destructive",
      })
      return
    }

    const newBrand: Brand = {
      id: `brand-${Date.now()}`,
      name: newBrandName.trim(),
      logo: newBrandLogo ? URL.createObjectURL(newBrandLogo) : "",
    }

    if (onBrandCreate) {
      onBrandCreate(newBrand)
    }
    queryClient.invalidateQueries({ queryKey: ["brands"] })
    setIsAddingBrand(false)
    setNewBrandName("")
    setNewBrandLogo(null)

    // Select the newly created brand
    onBrandSelect(newBrand.id)
    setOpen(false)

    toast({
      title: "Brand Created",
      description: `${newBrand.name} has been added to your brands.`,
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewBrandLogo(file)
    }
  }
  if (brands === undefined) {
    return <Skeleton className="w-full h-10" />
  }
  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedBrand ? (
              <div className="flex items-center">
                {selectedBrand.logo && (
                  <img
                    src={selectedBrand.logo || "/placeholder.svg"}
                    alt={selectedBrand.name}
                    className="w-5 h-5 mr-2 object-contain"
                  />
                )}
                {selectedBrand.name}
              </div>
            ) : (
              "Select brand"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search brands..." onValueChange={setSearchQuery} />
            <CommandList>
              <CommandEmpty>
                No brand found.
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => {
                    setIsAddingBrand(true)
                    setOpen(false)
                  }}
                >
                  Create a new brand
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {filteredBrands?.map((brand) => (
                  <CommandItem
                    key={brand.id}
                    value={brand.name}
                    onSelect={() => {
                      onBrandSelect(brand.id)
                      setOpen(false)
                    }}
                    className="flex items-center"
                  >
                    {brand.logo && (
                      <img
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        className="w-5 h-5 mr-2 object-contain"
                      />
                    )}
                    {brand.name}
                    <Check
                      className={cn("ml-auto h-4 w-4", selectedBrandId === brand.id ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="p-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  setIsAddingBrand(true)
                  setOpen(false)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Brand
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Add Brand Dialog */}
      <Dialog open={isAddingBrand} onOpenChange={setIsAddingBrand}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Brand</DialogTitle>
            <DialogDescription>Create a new brand to associate with your products.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">
                Brand Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="brand-name"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Enter brand name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-logo">Brand Logo</Label>
              <Input id="brand-logo" type="file" accept="image/*" onChange={handleLogoUpload} />
              {newBrandLogo && (
                <div className="mt-2 border rounded-md p-2 flex items-center">
                  <img
                    src={URL.createObjectURL(newBrandLogo) || "/placeholder.svg"}
                    alt="Brand logo preview"
                    className="w-10 h-10 object-contain mr-2"
                  />
                  <span className="text-sm">{newBrandLogo.name}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingBrand(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBrand}>Create Brand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
