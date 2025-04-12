"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Link, MapPin, Plus, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"

export interface Warehouse {
  id: string
  name: string
  code: string
  address?: string
  city?: string
  country?: string
}

interface WarehouseSelectorProps {
  warehouses: Warehouse[]
  selectedWarehouseId: string | null
  onWarehouseSelect: (warehouseId: string) => void
  onWarehouseReload?: () => void
  showAddNew?: boolean
}

export function WarehouseSelector({
  warehouses,
  selectedWarehouseId,
  onWarehouseSelect,
  onWarehouseReload,
  showAddNew = false,
}: WarehouseSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === selectedWarehouseId)

  const filteredWarehouses = searchQuery
    ? warehouses.filter(
        (warehouse) =>
          warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          warehouse.code.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : warehouses

  const handleReloadWarehouses = () => {
    setIsLoading(true)

    // In a real app, this would be an API call to fetch the latest warehouses
    if (onWarehouseReload) {
      onWarehouseReload()
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Warehouses Reloaded",
        description: "The warehouse list has been updated with the latest data.",
      })
    }, 1000)
  }

  const openWarehouseDashboard = () => {
    // In a real app, this would open the warehouse dashboard in a new tab
    window.open("/admin/warehouses", "_blank")

    toast({
      title: "Opening Warehouse Dashboard",
      description: "The warehouse management dashboard has been opened in a new tab.",
    })
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedWarehouse ? (
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{selectedWarehouse.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">({selectedWarehouse.code})</span>
              </div>
            ) : (
              "Select warehouse"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <div className="flex items-center p-2 border-b">
              <CommandInput placeholder="Search warehouses..." onValueChange={setSearchQuery} className="flex-1" />
              <Button
                variant="ghost"
                size="icon"
                className="ml-1"
                onClick={handleReloadWarehouses}
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </Button>
              <Link href="/admin/warehouses/create">
                <Button variant="ghost" size="icon" className="ml-1">
                  <Plus className="h-4 w-4" />
                  Create Warehouse
                </Button>
              </Link>
            </div>
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  <p>No warehouse found.</p>
                  {showAddNew && (
                    <Button variant="link" className="mt-2" onClick={openWarehouseDashboard}>
                      Manage warehouses in dashboard
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandGroup>
                {filteredWarehouses.map((warehouse) => (
                  <CommandItem
                    key={warehouse.id}
                    value={warehouse.name}
                    onSelect={() => {
                      onWarehouseSelect(warehouse.id)
                      setOpen(false)
                    }}
                    className="flex items-center"
                  >
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{warehouse.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({warehouse.code})</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedWarehouseId === warehouse.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
