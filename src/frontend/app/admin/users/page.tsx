"use client"

import { useState } from "react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Shield,
  Clock,
  UserPlus,
  Pencil,
  Trash2,
  Lock,
  Power,
  PowerOff,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample admin users data
const initialAdminUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@nexura.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Super Admin",
    permissions: ["all"],
    lastActive: "2023-07-15T10:30:00",
    status: "active",
  },
  {
    id: 2,
    name: "John Manager",
    email: "john@nexura.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Inventory Manager",
    permissions: ["inventory.view", "inventory.edit", "products.view"],
    lastActive: "2023-07-14T16:45:00",
    status: "active",
  },
  {
    id: 3,
    name: "Sarah Admin",
    email: "sarah@nexura.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Order Manager",
    permissions: ["orders.view", "orders.edit", "customers.view"],
    lastActive: "2023-07-13T09:15:00",
    status: "active",
  },
  {
    id: 4,
    name: "Michael Content",
    email: "michael@nexura.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Content Manager",
    permissions: ["blog.view", "blog.edit", "products.view"],
    lastActive: "2023-07-10T14:20:00",
    status: "inactive",
  },
  {
    id: 5,
    name: "Lisa Support",
    email: "lisa@nexura.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Customer Support",
    permissions: ["orders.view", "customers.view", "customers.edit"],
    lastActive: "2023-07-15T08:30:00",
    status: "active",
  },
]

// Sample customers that can be promoted to admin
const customers = [
  { id: 101, name: "Emma Wilson", email: "emma@example.com", orders: 12, totalSpent: 1245.5 },
  { id: 102, name: "David Brown", email: "david@example.com", orders: 5, totalSpent: 520.75 },
  { id: 103, name: "Sophia Martinez", email: "sophia@example.com", orders: 8, totalSpent: 876.25 },
]

// Available roles
const roles = [
  { id: "super_admin", name: "Super Admin", description: "Full access to all system features and settings" },
  { id: "inventory_manager", name: "Inventory Manager", description: "Manage products, inventory, and warehouses" },
  { id: "order_manager", name: "Order Manager", description: "Process and manage customer orders" },
  { id: "content_manager", name: "Content Manager", description: "Manage blog posts and product content" },
  { id: "customer_support", name: "Customer Support", description: "Handle customer inquiries and support tickets" },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  })

  const { toast } = useToast()

  // Filter users based on search, status, and role
  const filteredUsers = adminUsers.filter((user) => {
    // Filter by search query
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false
    }

    // Filter by role
    if (roleFilter !== "all" && !user.role.toLowerCase().includes(roleFilter.toLowerCase())) {
      return false
    }

    return true
  })

  // Handle promote customer to admin
  const handlePromoteCustomer = (customer: any) => {
    const newAdminUser = {
      id: Math.max(...adminUsers.map((u) => u.id)) + 1,
      name: customer.name,
      email: customer.email,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Customer Support", // Default role
      permissions: ["orders.view", "customers.view"],
      lastActive: new Date().toISOString(),
      status: "active",
    }

    setAdminUsers([...adminUsers, newAdminUser])

    toast({
      title: "Customer promoted",
      description: `${customer.name} has been successfully promoted to admin role.`,
    })
  }

  // Handle create new admin user
  const handleCreateUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.password) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    // Create new user
    const userToAdd = {
      id: Math.max(...adminUsers.map((u) => u.id)) + 1,
      name: newUser.name,
      email: newUser.email,
      avatar: "/placeholder.svg?height=40&width=40",
      role: roles.find((r) => r.id === newUser.role)?.name || newUser.role,
      permissions: [],
      lastActive: new Date().toISOString(),
      status: "active",
    }

    setAdminUsers([...adminUsers, userToAdd])

    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    })

    setIsAddUserOpen(false)

    toast({
      title: "Admin user created",
      description: `${userToAdd.name} has been successfully added as an admin user.`,
    })
  }

  // Handle edit user
  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditUserOpen(true)
  }

  // Handle save edited user
  const handleSaveEditedUser = () => {
    if (!selectedUser) return

    setAdminUsers(adminUsers.map((user) => (user.id === selectedUser.id ? selectedUser : user)))

    setIsEditUserOpen(false)

    toast({
      title: "User updated",
      description: `${selectedUser.name}'s information has been updated successfully.`,
    })
  }

  // Handle toggle user status (activate/deactivate)
  const handleToggleUserStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"

    setAdminUsers(adminUsers.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))

    toast({
      title: `User ${newStatus === "active" ? "activated" : "deactivated"}`,
      description: `The user has been ${newStatus === "active" ? "activated" : "deactivated"} successfully.`,
    })
  }

  // Handle reset password
  const handleResetPassword = (user: any) => {
    setSelectedUser(user)
    setNewPassword("")
    setConfirmPassword("")
    setIsResetPasswordOpen(true)
  }

  // Handle save new password
  const handleSaveNewPassword = () => {
    if (!selectedUser) return

    if (!newPassword) {
      toast({
        title: "Password required",
        description: "Please enter a new password.",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsResetPasswordOpen(false)

    toast({
      title: "Password reset",
      description: `Password for ${selectedUser.name} has been reset successfully.`,
    })
  }

  // Handle delete user
  const handleDeleteUser = (id: number) => {
    setAdminUsers(adminUsers.filter((user) => user.id !== id))

    toast({
      title: "User deleted",
      description: "The admin user has been successfully deleted.",
    })
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

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Admin User Management</h1>
              <p className="text-muted-foreground">Manage admin users and their permissions</p>
            </div>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Promote Customer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Promote Customer to Admin</DialogTitle>
                    <DialogDescription>Select a customer to promote to an admin role.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Orders</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" onClick={() => handlePromoteCustomer(customer)}>
                                Promote
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Admin User</DialogTitle>
                    <DialogDescription>Create a new admin user with specific permissions.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. John Smith"
                        className="col-span-3"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g. john@example.com"
                        className="col-span-3"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role <span className="text-destructive">*</span>
                      </Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {newUser.role && (
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-start-2 col-span-3">
                          <p className="text-sm text-muted-foreground">
                            {roles.find((r) => r.id === newUser.role)?.description}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="col-span-3"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirm-password" className="text-right">
                        Confirm Password <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="col-span-3"
                        value={newUser.confirmPassword}
                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleCreateUser}>
                      Create Admin User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Admin Users</CardTitle>
                  <CardDescription>Manage your store's admin users and their permissions</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                            {user.role}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formatDate(user.lastActive)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                                <Lock className="h-4 w-4 mr-2" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id, user.status)}>
                                {user.status === "active" ? (
                                  <>
                                    <PowerOff className="h-4 w-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Power className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById(`delete-user-${user.id}`)?.click()
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialog>
                            <AlertDialogTrigger className="hidden" id={`delete-user-${user.id}`} />
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the user "{user.name}". This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
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
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {adminUsers.length} admin users
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>Update information for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  value={roles.find((r) => r.name === selectedUser.role)?.id || ""}
                  onValueChange={(value) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: roles.find((r) => r.id === value)?.name || "",
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedUser.status}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, status: value })}
                >
                  <SelectTrigger className="col-span-3">
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
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveEditedUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Set a new password for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-new-password" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-start-2 col-span-3">
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      const randomPassword = Math.random().toString(36).slice(-10)
                      setNewPassword(randomPassword)
                      setConfirmPassword(randomPassword)
                    }}
                  >
                    Generate random password
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveNewPassword}>
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

