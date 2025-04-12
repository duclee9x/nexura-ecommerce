"use client"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Warehouse,
  UserCog,
  Ticket,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
]

const categoryData = [
  { name: "Backpacks", value: 45 },
  { name: "Bags", value: 25 },
  { name: "Accessories", value: 30 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", date: "2023-03-15", total: 245.99, status: "completed" },
  { id: "ORD-002", customer: "Jane Smith", date: "2023-03-14", total: 125.5, status: "processing" },
  { id: "ORD-003", customer: "Robert Johnson", date: "2023-03-14", total: 350.0, status: "completed" },
  { id: "ORD-004", customer: "Emily Davis", date: "2023-03-13", total: 89.99, status: "completed" },
  { id: "ORD-005", customer: "Michael Brown", date: "2023-03-12", total: 175.25, status: "processing" },
]

const topProducts = [
  { id: 1, name: "Urban Backpack", sales: 128, revenue: 15360 },
  { id: 2, name: "Water Bottle", sales: 203, revenue: 3654 },
  { id: 3, name: "Aero Backpack", sales: 112, revenue: 14224 },
  { id: 4, name: "Messenger Bag", sales: 93, revenue: 7905 },
]

// Sample data for warehouse management
const warehouseData = [
  { id: 1, name: "Main Warehouse", location: "New York", products: 532, lowStock: 12 },
  { id: 2, name: "West Coast Facility", location: "Los Angeles", products: 328, lowStock: 8 },
  { id: 3, name: "European Hub", location: "London", products: 245, lowStock: 5 },
]

// Sample data for admin users
const adminUsers = [
  { id: 1, name: "Admin User", email: "admin@nexura.com", role: "Super Admin", lastActive: "Today" },
  { id: 2, name: "John Manager", email: "john@nexura.com", role: "Inventory Manager", lastActive: "Yesterday" },
  { id: 3, name: "Sarah Admin", email: "sarah@nexura.com", role: "Order Manager", lastActive: "2 days ago" },
]

// Sample data for coupon campaigns
const couponCampaigns = [
  { id: 1, code: "SUMMER23", discount: "20%", status: "active", used: 145, expires: "Aug 31, 2023" },
  { id: 2, code: "WELCOME10", discount: "10%", status: "active", used: 278, expires: "Never" },
  { id: 3, code: "FLASH50", discount: "50%", status: "scheduled", used: 0, expires: "Sep 15, 2023" },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex flex-col p-6 overflow-auto w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your store.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">$45,231.89</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1 " />
                      +20.1% from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <h3 className="text-2xl font-bold mt-1">356</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <h3 className="text-2xl font-bold mt-1">2,543</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +8.2% from last month
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Products in Stock</p>
                    <h3 className="text-2xl font-bold mt-1">128</h3>
                    <p className="text-xs text-destructive flex items-center mt-1">
                      <ArrowDownRight className="h-3 w-3 mr-1" />5 low stock items
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warehouse Management Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Warehouse Management</h2>
              <Button asChild>
                <Link href="/admin/warehouses">
                  <Warehouse className="h-4 w-4 mr-2" />
                  View All Warehouses
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {warehouseData.map((warehouse) => (
                <Card key={warehouse.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <CardDescription>{warehouse.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Products</p>
                        <p className="text-2xl font-bold">{warehouse.products}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Low Stock</p>
                        <p className="text-2xl font-bold text-amber-500">{warehouse.lowStock}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/admin/warehouses/${warehouse.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Manage Inventory
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Admin User Management Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Admin Users</h2>
              <Button asChild>
                <Link href="/admin/users">
                  <UserCog className="h-4 w-4 mr-2" />
                  Manage All Users
                </Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Admin Activity</CardTitle>
                <CardDescription>Overview of admin users and their recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{user.role}</p>
                        <p className="text-sm text-muted-foreground">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/users/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Admin User
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Coupon Campaign Management Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Coupon Campaigns</h2>
              <Button asChild>
                <Link href="/admin/coupons">
                  <Ticket className="h-4 w-4 mr-2" />
                  Manage All Coupons
                </Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Overview of current discount coupons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {couponCampaigns.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="grid grid-cols-3 items-center justify-between w-auto border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="text-left">
                        <p className="font-medium">{coupon.code}</p>
                        <p className="text-sm text-muted-foreground">Discount: {coupon.discount}</p>
                      </div>
                      <div className="text-center">
                        <span
                          className={`inline-flex  items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            coupon.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{coupon.used} uses</p>
                        <p className="text-sm text-muted-foreground">Expires: {coupon.expires}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/coupons/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Coupon
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">{order.id}</p>
                          <span className="text-sm text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>Best selling products this month</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-md bg-muted">
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                            {product.id}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.revenue.toLocaleString()}</p>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

