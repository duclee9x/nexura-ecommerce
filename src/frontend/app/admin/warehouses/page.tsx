"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  MapPin,
  Package,
  AlertTriangle,
  ArrowUpDown,
  Edit,
  Trash2,
  MoreHorizontal,
  Building,
  CheckCircle2,
  XCircle,
  Upload,
  Download,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample warehouse data
const initialWarehouses = [
  {
    id: 1,
    name: "Main Warehouse",
    code: "WH-MAIN",
    location: "New York, NY",
    address: "123 Warehouse St, New York, NY 10001",
    manager: "John Smith",
    contact: "+1 (212) 555-1234",
    totalProducts: 532,
    lowStock: 12,
    outOfStock: 3,
    status: "active",
  },
  {
    id: 2,
    name: "West Coast Facility",
    code: "WH-WEST",
    location: "Los Angeles, CA",
    address: "456 Storage Blvd, Los Angeles, CA 90001",
    manager: "Maria Rodriguez",
    contact: "+1 (310) 555-6789",
    totalProducts: 328,
    lowStock: 8,
    outOfStock: 1,
    status: "active",
  },
  {
    id: 3,
    name: "European Hub",
    code: "WH-EUR",
    location: "London, UK",
    address: "78 Warehouse Lane, London, UK E1 6AA",
    manager: "James Wilson",
    contact: "+44 20 7123 4567",
    totalProducts: 245,
    lowStock: 5,
    outOfStock: 0,
    status: "active",
  },
  {
    id: 4,
    name: "Asian Distribution Center",
    code: "WH-APAC",
    location: "Singapore",
    address: "42 Storage Road, Singapore 123456",
    manager: "Li Wei",
    contact: "+65 6123 4567",
    totalProducts: 187,
    lowStock: 3,
    outOfStock: 1,
    status: "active",
  },
  {
    id: 5,
    name: "Seasonal Storage",
    code: "WH-SEAS",
    location: "Chicago, IL",
    address: "789 Temporary Ave, Chicago, IL 60007",
    manager: "Robert Johnson",
    contact: "+1 (312) 555-9876",
    totalProducts: 98,
    lowStock: 0,
    outOfStock: 0,
    status: "inactive",
  },
]

// Sample inventory data
const initialInventory = [
  {
    id: 1,
    sku: "BP-001",
    name: "Urban Backpack",
    warehouseId: 1,
    warehouseName: "Main Warehouse",
    quantity: 45,
    lowStockThreshold: 10,
    status: "In Stock",
    category: "Backpacks",
    lastUpdated: "2023-07-10T14:30:00",
  },
  {
    id: 2,
    sku: "BP-002",
    name: "Hiking Backpack",
    warehouseId: 1,
    warehouseName: "Main Warehouse",
    quantity: 8,
    lowStockThreshold: 10,
    status: "Low Stock",
    category: "Backpacks",
    lastUpdated: "2023-07-12T09:15:00",
  },
  {
    id: 3,
    sku: "BG-001",
    name: "Messenger Bag",
    warehouseId: 2,
    warehouseName: "West Coast Facility",
    quantity: 23,
    lowStockThreshold: 15,
    status: "In Stock",
    category: "Bags",
    lastUpdated: "2023-07-08T16:45:00",
  },
  {
    id: 4,
    sku: "ACC-001",
    name: "Water Bottle",
    warehouseId: 1,
    warehouseName: "Main Warehouse",
    quantity: 0,
    lowStockThreshold: 5,
    status: "Out of Stock",
    category: "Accessories",
    lastUpdated: "2023-07-05T11:20:00",
  },
  {
    id: 5,
    sku: "BP-003",
    name: "Travel Backpack",
    warehouseId: 3,
    warehouseName: "European Hub",
    quantity: 12,
    lowStockThreshold: 8,
    status: "In Stock",
    category: "Backpacks",
    lastUpdated: "2023-07-14T10:30:00",
  },
  {
    id: 6,
    sku: "ACC-002",
    name: "Travel Adapter",
    warehouseId: 3,
    warehouseName: "European Hub",
    quantity: 35,
    lowStockThreshold: 10,
    status: "In Stock",
    category: "Accessories",
    lastUpdated: "2023-07-11T13:45:00",
  },
  {
    id: 7,
    sku: "BG-002",
    name: "Duffel Bag",
    warehouseId: 2,
    warehouseName: "West Coast Facility",
    quantity: 5,
    lowStockThreshold: 8,
    status: "Low Stock",
    category: "Bags",
    lastUpdated: "2023-07-09T15:20:00",
  },
  {
    id: 8,
    sku: "ACC-003",
    name: "Packing Cubes",
    warehouseId: 4,
    warehouseName: "Asian Distribution Center",
    quantity: 42,
    lowStockThreshold: 15,
    status: "In Stock",
    category: "Accessories",
    lastUpdated: "2023-07-13T09:10:00",
  },
]

export default function WarehousesPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("warehouses")
  const [warehouses, setWarehouses] = useState(initialWarehouses)
  const [inventory, setInventory] = useState(initialInventory)
  const [warehouseSearchQuery, setWarehouseSearchQuery] = useState("")
  const [inventorySearchQuery, setInventorySearchQuery] = useState("")
  const [warehouseStatusFilter, setWarehouseStatusFilter] = useState("all")
  const [inventoryStatusFilter, setInventoryStatusFilter] = useState("all")
  const [inventoryWarehouseFilter, setInventoryWarehouseFilter] = useState("all")
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false)
  const [isEditWarehouseOpen, setIsEditWarehouseOpen] = useState(false)
  const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null)
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<any>(null)
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    code: "",
    location: "",
    address: "",
    manager: "",
    contact: "",
    status: "active",
  })
  const [stockAdjustment, setStockAdjustment] = useState({
    quantity: 0,
    reason: "restock",
    notes: "",
  })

  // Filter warehouses based on search and status
  const filteredWarehouses = warehouses.filter((warehouse) => {
    // Filter by search query
    if (
      warehouseSearchQuery &&
      !warehouse.name.toLowerCase().includes(warehouseSearchQuery.toLowerCase()) &&
      !warehouse.location.toLowerCase().includes(warehouseSearchQuery.toLowerCase()) &&
      !warehouse.code.toLowerCase().includes(warehouseSearchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (warehouseStatusFilter !== "all" && warehouse.status !== warehouseStatusFilter) {
      return false
    }

    return true
  })

  // Filter inventory based on search, status, warehouse, and category
  const filteredInventory = inventory.filter((item) => {
    // Filter by search query
    if (
      inventorySearchQuery &&
      !item.name.toLowerCase().includes(inventorySearchQuery.toLowerCase()) &&
      !item.sku.toLowerCase().includes(inventorySearchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (inventoryStatusFilter !== "all" && item.status !== inventoryStatusFilter) {
      return false
    }

    // Filter by warehouse
    if (inventoryWarehouseFilter !== "all" && item.warehouseId.toString() !== inventoryWarehouseFilter) {
      return false
    }

    // Filter by category
    if (inventoryCategoryFilter !== "all" && item.category !== inventoryCategoryFilter) {
      return false
    }

    return true
  })

  // Get unique categories from inventory
  const categories = Array.from(new Set(inventory.map((item) => item.category)))

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1

    if (sortField === "name") {
      return a.name.localeCompare(b.name) * direction
    } else if (sortField === "sku") {
      return a.sku.localeCompare(b.sku) * direction
    } else if (sortField === "quantity") {
      return (a.quantity - b.quantity) * direction
    } else if (sortField === "warehouseName") {
      return a.warehouseName.localeCompare(b.warehouseName) * direction
    } else if (sortField === "lastUpdated") {
      return (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) * direction
    }

    return 0
  })

  // Handle add warehouse
  const handleAddWarehouse = () => {
    // Validate form
    if (!newWarehouse.name || !newWarehouse.code || !newWarehouse.location) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new warehouse
    const warehouseToAdd = {
      id: Math.max(...warehouses.map((w) => w.id)) + 1,
      ...newWarehouse,
      totalProducts: 0,
      lowStock: 0,
      outOfStock: 0,
    }

    setWarehouses([...warehouses, warehouseToAdd])

    // Reset form
    setNewWarehouse({
      name: "",
      code: "",
      location: "",
      address: "",
      manager: "",
      contact: "",
      status: "active",
    })

    setIsAddWarehouseOpen(false)

    toast({
      title: "Warehouse added",
      description: `${warehouseToAdd.name} has been successfully added.`,
    })
  }

  // Handle edit warehouse
  const handleEditWarehouse = (warehouse: any) => {
    setSelectedWarehouse(warehouse)
    setIsEditWarehouseOpen(true)
  }

  // Handle save edited warehouse
  const handleSaveEditedWarehouse = () => {
    if (!selectedWarehouse) return

    setWarehouses(
      warehouses.map((warehouse) => (warehouse.id === selectedWarehouse.id ? selectedWarehouse : warehouse)),
    )

    setIsEditWarehouseOpen(false)

    toast({
      title: "Warehouse updated",
      description: `${selectedWarehouse.name} has been successfully updated.`,
    })
  }

  // Handle delete warehouse
  const handleDeleteWarehouse = (id: number) => {
    // Check if warehouse has inventory
    const warehouseInventory = inventory.filter((item) => item.warehouseId === id)

    if (warehouseInventory.length > 0) {
      toast({
        title: "Cannot delete warehouse",
        description: "This warehouse contains inventory items. Please transfer or remove all items first.",
        variant: "destructive",
      })
      return
    }

    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id))

    toast({
      title: "Warehouse deleted",
      description: "The warehouse has been successfully deleted.",
    })
  }

  // Handle adjust stock
  const handleAdjustStock = (item: any) => {
    setSelectedInventoryItem(item)
    setStockAdjustment({
      quantity: 0,
      reason: "restock",
      notes: "",
    })
    setIsAdjustStockOpen(true)
  }

  // Handle save stock adjustment
  const handleSaveStockAdjustment = () => {
    if (!selectedInventoryItem) return

    const newQuantity = selectedInventoryItem.quantity + stockAdjustment.quantity

    // Prevent negative stock
    if (newQuantity < 0) {
      toast({
        title: "Invalid adjustment",
        description: "Stock quantity cannot be negative.",
        variant: "destructive",
      })
      return
    }

    // Update inventory item
    const updatedItem = {
      ...selectedInventoryItem,
      quantity: newQuantity,
      status:
        newQuantity === 0
          ? "Out of Stock"
          : newQuantity <= selectedInventoryItem.lowStockThreshold
            ? "Low Stock"
            : "In Stock",
      lastUpdated: new Date().toISOString(),
    }

    setInventory(inventory.map((item) => (item.id === selectedInventoryItem.id ? updatedItem : item)))

    // Update warehouse stats
    updateWarehouseStats(updatedItem.warehouseId)

    setIsAdjustStockOpen(false)

    toast({
      title: "Stock adjusted",
      description: `${updatedItem.name} stock has been updated to ${newQuantity}.`,
    })
  }

  // Update warehouse stats
  const updateWarehouseStats = (warehouseId: number) => {
    const warehouseInventory = inventory.filter((item) => item.warehouseId === warehouseId)

    const totalProducts = warehouseInventory.length
    const lowStock = warehouseInventory.filter((item) => item.status === "Low Stock").length
    const outOfStock = warehouseInventory.filter((item) => item.status === "Out of Stock").length

    setWarehouses(
      warehouses.map((warehouse) =>
        warehouse.id === warehouseId ? { ...warehouse, totalProducts, lowStock, outOfStock } : warehouse,
      ),
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 w-full p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Warehouse Management</h1>
              <p className="text-muted-foreground">Manage your warehouses and inventory locations</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setActiveTab("inventory")}>
                <Package className="h-4 w-4 mr-2" />
                View Inventory
              </Button>
              <Dialog open={isAddWarehouseOpen} onOpenChange={setIsAddWarehouseOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Warehouse
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Warehouse</DialogTitle>
                    <DialogDescription>Enter the details for your new warehouse or storage location.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Warehouse Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. Main Warehouse"
                        className="col-span-3"
                        value={newWarehouse.name}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">
                        Warehouse Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="code"
                        placeholder="e.g. WH-MAIN"
                        className="col-span-3"
                        value={newWarehouse.code}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, code: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="location"
                        placeholder="e.g. New York, NY"
                        className="col-span-3"
                        value={newWarehouse.location}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Full address"
                        className="col-span-3"
                        value={newWarehouse.address}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="manager" className="text-right">
                        Manager
                      </Label>
                      <Input
                        id="manager"
                        placeholder="Warehouse manager name"
                        className="col-span-3"
                        value={newWarehouse.manager}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, manager: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact" className="text-right">
                        Contact
                      </Label>
                      <Input
                        id="contact"
                        placeholder="Phone number or email"
                        className="col-span-3"
                        value={newWarehouse.contact}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, contact: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={newWarehouse.status}
                        onValueChange={(value) => setNewWarehouse({ ...newWarehouse, status: value })}
                      >
                        <SelectTrigger id="status" className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="inactive">
                            <div className="flex items-center">
                              <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                              Inactive
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddWarehouseOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddWarehouse}>
                      Add Warehouse
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Warehouses</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {warehouses.filter((w) => w.status === "active").length}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {warehouses.filter((w) => w.status === "inactive").length} inactive
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <h3 className="text-2xl font-bold mt-1">{inventory.length}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Across all warehouses</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {inventory.filter((item) => item.status === "Low Stock").length}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {inventory.filter((item) => item.status === "Out of Stock").length} out of stock
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="warehouses">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search warehouses..."
                    className="pl-9"
                    value={warehouseSearchQuery}
                    onChange={(e) => setWarehouseSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={warehouseStatusFilter} onValueChange={setWarehouseStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWarehouses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No warehouses found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredWarehouses.map((warehouse) => (
                          <TableRow key={warehouse.id}>
                            <TableCell className="font-medium">{warehouse.name}</TableCell>
                            <TableCell>{warehouse.code}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                {warehouse.location}
                              </div>
                            </TableCell>
                            <TableCell>{warehouse.manager}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                {warehouse.totalProducts}
                                {warehouse.lowStock > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  >
                                    {warehouse.lowStock} low
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  warehouse.status === "active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                              >
                                {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleEditWarehouse(warehouse)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Warehouse
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setInventoryWarehouseFilter(warehouse.id.toString())
                                      setActiveTab("inventory")
                                    }}
                                  >
                                    <Package className="h-4 w-4 mr-2" />
                                    View Inventory
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.preventDefault()
                                      document.getElementById(`delete-warehouse-${warehouse.id}`)?.click()
                                    }}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Warehouse
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <AlertDialog>
                                <AlertDialogTrigger className="hidden" id={`delete-warehouse-${warehouse.id}`} />
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the warehouse "{warehouse.name}". This action cannot
                                      be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteWarehouse(warehouse.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inventory..."
                    className="pl-9"
                    value={inventorySearchQuery}
                    onChange={(e) => setInventorySearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Select value={inventoryStatusFilter} onValueChange={setInventoryStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={inventoryWarehouseFilter} onValueChange={setInventoryWarehouseFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Warehouses</SelectItem>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={inventoryCategoryFilter} onValueChange={setInventoryCategoryFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Inventory</CardTitle>
                    <CardDescription>Manage your product inventory across warehouses</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("sku")}>
                            SKU
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                            Product
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("warehouseName")}>
                            Warehouse
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("quantity")}>
                            Quantity
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastUpdated")}>
                            Last Updated
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedInventory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No inventory items found
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedInventory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.sku}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                                {item.warehouseName}
                              </div>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.status === "In Stock"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    : item.status === "Low Stock"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                }`}
                              >
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => handleAdjustStock(item)}>
                                Adjust Stock
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {sortedInventory.length} of {inventory.length} inventory items
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInventorySearchQuery("")
                      setInventoryStatusFilter("all")
                      setInventoryWarehouseFilter("all")
                      setInventoryCategoryFilter("all")
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Edit Warehouse Dialog */}
      <Dialog open={isEditWarehouseOpen} onOpenChange={setIsEditWarehouseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Warehouse</DialogTitle>
            <DialogDescription>Update the details for {selectedWarehouse?.name}</DialogDescription>
          </DialogHeader>
          {selectedWarehouse && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Warehouse Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedWarehouse.name}
                  onChange={(e) => setSelectedWarehouse({ ...selectedWarehouse, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-code" className="text-right">
                  Warehouse Code
                </Label>
                <Input
                  id="edit-code"
                  value={selectedWarehouse.code}
                  onChange={(e) => setSelectedWarehouse({ ...selectedWarehouse, code: e.target.value.toUpperCase() })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="edit-location"
                  value={selectedWarehouse.location}
                  onChange={(e) => setSelectedWarehouse({ ...selectedWarehouse, location: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Textarea
                  id="edit-address"
                  value={selectedWarehouse.address}
                  onChange={(e) => setSelectedWarehouse({ ...selectedWarehouse, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-manager" className="text-right">
                  Manager
                </Label>
                <Input
                  id="edit-manager"
                  value={selectedWarehouse.manager}
                  onChange={(e) => setSelectedWarehouse({ ...selectedWarehouse, manager: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="edit-contact"
                  value={selectedWarehouse.contact}
                  onChange={(e) => setSelectedWarehouse({ ...selectedWarehouse, contact: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedWarehouse.status}
                  onValueChange={(value) => setSelectedWarehouse({ ...selectedWarehouse, status: value })}
                >
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                        Inactive
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditWarehouseOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveEditedWarehouse}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Stock Dialog */}
      <Dialog open={isAdjustStockOpen} onOpenChange={setIsAdjustStockOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>Update inventory for {selectedInventoryItem?.name}</DialogDescription>
          </DialogHeader>
          {selectedInventoryItem && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Current Stock</p>
                  <p className="text-2xl font-bold">{selectedInventoryItem.quantity}</p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedInventoryItem.status === "In Stock"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : selectedInventoryItem.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {selectedInventoryItem.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adjustment" className="text-right">
                  Adjustment
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="adjustment"
                    type="number"
                    value={stockAdjustment.quantity}
                    onChange={(e) =>
                      setStockAdjustment({ ...stockAdjustment, quantity: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    New total: {selectedInventoryItem.quantity + stockAdjustment.quantity}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">
                  Reason
                </Label>
                <Select
                  value={stockAdjustment.reason}
                  onValueChange={(value) => setStockAdjustment({ ...stockAdjustment, reason: value })}
                >
                  <SelectTrigger id="reason" className="col-span-3">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restock">Restock</SelectItem>
                    <SelectItem value="adjustment">Inventory Adjustment</SelectItem>
                    <SelectItem value="damaged">Damaged/Lost</SelectItem>
                    <SelectItem value="returned">Customer Return</SelectItem>
                    <SelectItem value="transfer">Warehouse Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={stockAdjustment.notes}
                  onChange={(e) => setStockAdjustment({ ...stockAdjustment, notes: e.target.value })}
                  placeholder="Add any additional notes here"
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdjustStockOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveStockAdjustment}>
              Save Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

