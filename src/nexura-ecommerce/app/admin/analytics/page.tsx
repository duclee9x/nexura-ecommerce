"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000, orders: 150, customers: 120 },
  { name: "Feb", sales: 3000, orders: 130, customers: 110 },
  { name: "Mar", sales: 5000, orders: 180, customers: 130 },
  { name: "Apr", sales: 4500, orders: 160, customers: 125 },
  { name: "May", sales: 6000, orders: 210, customers: 150 },
  { name: "Jun", sales: 5500, orders: 190, customers: 140 },
  { name: "Jul", sales: 7000, orders: 230, customers: 160 },
]

const categoryData = [
  { name: "Backpacks", value: 45 },
  { name: "Bags", value: 25 },
  { name: "Accessories", value: 30 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const topProducts = [
  { id: 1, name: "Urban Backpack", sales: 128, revenue: 15360 },
  { id: 2, name: "Water Bottle", sales: 203, revenue: 3654 },
  { id: 3, name: "Aero Backpack", sales: 112, revenue: 14224 },
  { id: 4, name: "Messenger Bag", sales: 93, revenue: 7905 },
  { id: 5, name: "Laptop Sleeve", sales: 87, revenue: 3915 },
]

const dailySales = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1400 },
  { name: "Wed", sales: 1800 },
  { name: "Thu", sales: 1600 },
  { name: "Fri", sales: 2000 },
  { name: "Sat", sales: 2400 },
  { name: "Sun", sales: 1800 },
]

const customerAcquisition = [
  { name: "Jan", direct: 30, organic: 40, referral: 20, social: 10 },
  { name: "Feb", direct: 25, organic: 35, referral: 30, social: 20 },
  { name: "Mar", direct: 35, organic: 45, referral: 25, social: 15 },
  { name: "Apr", direct: 40, organic: 50, referral: 20, social: 25 },
  { name: "May", direct: 45, organic: 55, referral: 30, social: 30 },
  { name: "Jun", direct: 50, organic: 60, referral: 35, social: 25 },
  { name: "Jul", direct: 60, organic: 65, referral: 40, social: 35 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Analytics</h1>
              <p className="text-muted-foreground">Track your store's performance and growth</p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">$45,231.89</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +20.1% from last period
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
                      +12.5% from last period
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
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <h3 className="text-2xl font-bold mt-1">3.2%</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +0.8% from last period
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Customers</p>
                    <h3 className="text-2xl font-bold mt-1">124</h3>
                    <p className="text-xs text-destructive flex items-center mt-1">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      -5.2% from last period
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sales" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            {/* Sales Tab */}
            <TabsContent value="sales" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Monthly sales performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
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
                          <Tooltip
                            formatter={(value) => [`$${value}`, "Sales"]}
                            labelFormatter={(label) => `Month: ${label}`}
                          />
                          <Bar dataKey="sales" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daily Sales</CardTitle>
                    <CardDescription>Last 7 days performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={dailySales}
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
                          <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing products by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Units Sold</TableHead>
                          <TableHead className="text-right">Revenue</TableHead>
                          <TableHead className="text-right">Avg. Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className="text-right">{product.sales}</TableCell>
                            <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              ${(product.revenue / product.sales).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Category</CardTitle>
                    <CardDescription>Distribution of sales by product category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                    <CardDescription>Sales vs. Orders comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
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
                          <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="orders" fill="#3b82f6" name="Orders" />
                          <Bar yAxisId="right" dataKey="sales" fill="#10b981" name="Sales ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Product Inventory Status</CardTitle>
                  <CardDescription>Current inventory levels by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Total Products</TableHead>
                          <TableHead className="text-right">In Stock</TableHead>
                          <TableHead className="text-right">Low Stock</TableHead>
                          <TableHead className="text-right">Out of Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Backpacks</TableCell>
                          <TableCell className="text-right">45</TableCell>
                          <TableCell className="text-right">38</TableCell>
                          <TableCell className="text-right">5</TableCell>
                          <TableCell className="text-right">2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Bags</TableCell>
                          <TableCell className="text-right">32</TableCell>
                          <TableCell className="text-right">25</TableCell>
                          <TableCell className="text-right">4</TableCell>
                          <TableCell className="text-right">3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Accessories</TableCell>
                          <TableCell className="text-right">78</TableCell>
                          <TableCell className="text-right">65</TableCell>
                          <TableCell className="text-right">8</TableCell>
                          <TableCell className="text-right">5</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                    <CardDescription>New customers by source</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={customerAcquisition}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="direct" stackId="1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="organic" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                          <Area type="monotone" dataKey="referral" stackId="1" stroke="#ffc658" fill="#ffc658" />
                          <Area type="monotone" dataKey="social" stackId="1" stroke="#ff8042" fill="#ff8042" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Growth</CardTitle>
                    <CardDescription>Monthly customer acquisition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
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
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="customers"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Metrics</CardTitle>
                  <CardDescription>Key customer performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <h3 className="text-3xl font-bold">$127</h3>
                          <p className="text-sm text-muted-foreground mt-1">Average Order Value</p>
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +12% from last period
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <h3 className="text-3xl font-bold">2.4</h3>
                          <p className="text-sm text-muted-foreground mt-1">Orders per Customer</p>
                          <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +5% from last period
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <h3 className="text-3xl font-bold">68%</h3>
                          <p className="text-sm text-muted-foreground mt-1">Retention Rate</p>
                          <p className="text-xs text-destructive flex items-center mt-2">
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                            -3% from last period
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Inventory Value</CardTitle>
                    <CardDescription>Total inventory value over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
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
                          <Tooltip formatter={(value) => [`$${value * 100}`, "Inventory Value"]} />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Inventory Value"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stock Status</CardTitle>
                    <CardDescription>Current inventory status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "In Stock", value: 75 },
                              { name: "Low Stock", value: 15 },
                              { name: "Out of Stock", value: 10 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Products</CardTitle>
                  <CardDescription>Products that need to be restocked soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead className="text-right">Current Stock</TableHead>
                          <TableHead className="text-right">Threshold</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Smart Carry Backpack</TableCell>
                          <TableCell>BP-SCB-003</TableCell>
                          <TableCell className="text-right">5</TableCell>
                          <TableCell className="text-right">10</TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Low Stock
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Weekender Duffel</TableCell>
                          <TableCell>BG-WKD-006</TableCell>
                          <TableCell className="text-right">3</TableCell>
                          <TableCell className="text-right">10</TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Low Stock
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Travel Organizer</TableCell>
                          <TableCell>ACC-TRO-009</TableCell>
                          <TableCell className="text-right">0</TableCell>
                          <TableCell className="text-right">15</TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                              Out of Stock
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

