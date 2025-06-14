"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Item {
  id:    string
  value: string
  label: string
}

interface ComboboxProps {
  type:          string
  items:         Item[]
  value?:        string
  placeholder?:  string
  onChange?:     (value: string) => void
  onCreateItem?: (name: string) => Promise<Item>
  onDeleteItem?: (id: string) => Promise<void>
  className?:    string
}

export function Combobox({
  type,
  items,
  value,
  placeholder,
  onChange,
  onCreateItem,
  onDeleteItem,
  className,
}: ComboboxProps) {
  const [ open, setOpen ] = React.useState(false)
  const [ search, setSearch ] = React.useState("")
  const [ isCreating, setIsCreating ] = React.useState(false)
  const [ newItemName, setNewItemName ] = React.useState("")

  const filteredItems = React.useMemo(() => {
    if (!search) return items
    const searchLower = search.toLowerCase()
    return items.filter(item => 
      item.label.toLowerCase().includes(searchLower) || 
      item.value.toLowerCase().includes(searchLower)
    )
  }, [ items, search ])

  const handleCreate = async () => {
    if (!newItemName.trim() || !onCreateItem) return

    try {
      setIsCreating(true)
      const newItem = await onCreateItem(newItemName.trim())
      onChange?.(newItem.value)
      setOpen(false)
      setNewItemName("")
      toast({
        title:       "Success",
        description: `New ${type} created successfully.`,
      })
    } catch (error) {
      toast({
        title:       "Error",
        description: error instanceof Error ? error.message : `Failed to create new ${type}.`,
        variant:     "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!onDeleteItem) return

    try {
      await onDeleteItem(id)
      if (value === id) {
        onChange?.("")
      }
      toast({
        title:       "Success",
        description: `${type} deleted successfully.`,
      })
    } catch (error) {
      toast({
        title:       "Error",
        description: error instanceof Error ? error.message : `Failed to delete ${type}.`,
        variant:     "destructive",
      })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value ? items.find(item => item.value === value)?.label : placeholder || `Select ${type}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder={`Search ${type}...`}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {onCreateItem && (
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      placeholder={`Enter new ${type} name...`}
                      value={newItemName}
                      onChange={e => setNewItemName(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={handleCreate}
                      disabled={isCreating || !newItemName.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              {!newItemName && <p className="p-2 text-sm text-muted-foreground">No results found.</p>}
            </CommandEmpty>
            {filteredItems.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  {filteredItems.map(item => (
                    <CommandItem
                      key={item.id}
                      value={item.value}
                      onSelect={() => {
                        onChange?.(item.value === value ? "" : item.value)
                        setOpen(false)
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {onDeleteItem && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                                onClick={e => e.stopPropagation()}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete {type}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this {type}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
