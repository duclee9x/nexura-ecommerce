"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, ShoppingBag, Package, Star, User, AlertCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Notification } from "@/types/schema"

// Sample notifications
const initialNotifications: Notification[] = [
  {
    id:          "1",
    type:        "order",
    title:       "New Order Received",
    content:     "Order #ORD-2023-1234 has been placed for $156.99",
    link:        "/admin/orders/ORD-2023-1234",
    read:        false,
    dateCreated: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    userId:      "1",
    priority:    "low",
    createdAt:   new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt:   new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id:          "2",
    type:        "stock",
    title:       "Low Stock Alert",
    content:     "Pro Traveler Backpack (BP-PRO-001) is running low with only 3 items left",
    link:        "/admin/inventory/edit/101",
    read:        false,
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    userId:      "1",
    priority:    "low",
    createdAt:   new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt:   new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id:          "3",
    type:        "review",
    title:       "New Product Review",
    content:     "A new 5-star review has been submitted for Weekend Duffle Bag",
    link:        "/admin/products/reviews",
    read:        false,
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    userId:      "1",
    priority:    "low",
    createdAt:   new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt:   new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id:          "4",
    type:        "customer",
    title:       "New Customer Registration",
    content:     "Emily Davis has created a new account",
    link:        "/admin/customers/4",
    read:        true,
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    userId:      "1",
    priority:    "low",
    createdAt:   new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt:   new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id:          "5",
    type:        "system",
    title:       "System Update",
    content:     "The system will undergo maintenance on Sunday at 2:00 AM",
    read:        true,
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    userId:      "1",
    priority:    "low",
    createdAt:   new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt:   new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id:          "6",
    type:        "order",
    title:       "Order Shipped",
    content:     "Order #ORD-2023-1198 has been shipped",
    link:        "/admin/orders/ORD-2023-1198",
    read:        true,
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    userId:      "1",
    priority:    "low",
    createdAt:   new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt:   new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
]

export function NotificationCenter() {
  const [ notifications, setNotifications ] = useState(initialNotifications)
  const [ activeTab, setActiveTab ] = useState("all")
  const [ isOpen, setIsOpen ] = useState(false)

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "stock":
        return <Package className="h-5 w-5 text-orange-500" />
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "customer":
        return <User className="h-5 w-5 text-green-500" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Simulate receiving a new notification
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of receiving a new notification every 30 seconds
      if (Math.random() < 0.1) {
        const types = [
          "order", "stock", "review", "customer", "system"
        ]
        const type = types[Math.floor(Math.random() * types.length)]

        let title = ""
        let content = ""
        let link = ""

        switch (type) {
          case "order":
            const orderId = `ORD-2023-${Math.floor(1000 + Math.random() * 9000)}`
            const amount = (Math.random() * 200 + 50).toFixed(2)
            title = "New Order Received"
            content = `Order #${orderId} has been placed for $${amount}`
            link = `/admin/orders/${orderId}`
            break
          case "stock":
            const productSku = `BP-${Math.floor(100 + Math.random() * 900)}`
            const stock = Math.floor(Math.random() * 5) + 1
            title = "Low Stock Alert"
            content = `Product ${productSku} is running low with only ${stock} items left`
            link = `/admin/inventory`
            break
          case "review":
            const rating = Math.floor(Math.random() * 5) + 1
            title = "New Product Review"
            content = `A new ${rating}-star review has been submitted`
            link = `/admin/products/reviews`
            break
          case "customer":
            const names = [
              "Alex Johnson", "Maria Garcia", "Sam Taylor", "Lisa Wong"
            ]
            const name = names[Math.floor(Math.random() * names.length)]
            title = "New Customer Registration"
            content = `${name} has created a new account`
            link = `/admin/customers`
            break
          case "system":
            title = "System Notification"
            content = "Your store performance report is ready to view"
            link = `/admin/analytics`
            break
        }

        const newNotification: Notification = {
          id:          Date.now().toString(),
          type:        type as "order" | "inventory" | "customer" | "system" | "chat" | "blog" | "review",
          title,
          content,
          link,
          read:        false,
          dateCreated: new Date().toISOString(),
          userId:      "1",
          priority:    "low",
          createdAt:   new Date().toISOString(),
          updatedAt:   new Date().toISOString(),
        }

        setNotifications(prev => [ newNotification, ...prev ])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="all" className="text-xs">
              All
              {unreadCount > 0 && <Badge className="ml-1 bg-primary text-[10px] h-4 min-w-4 px-1">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Unread
            </TabsTrigger>
            <TabsTrigger value="order" className="text-xs">
              Orders
            </TabsTrigger>
            <TabsTrigger value="stock" className="text-xs">
              Stock
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="system" className="text-xs">
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[300px]">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                  <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? "bg-muted/20" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex">
                        <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1"></span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(notification.dateCreated)}
                            </span>
                            {notification.link && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                  if (notification.link) {
                                    window.location.href = notification.link
                                  }
                                  setIsOpen(false)
                                }}
                              >
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-2 border-t text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs w-full"
            onClick={() => (window.location.href = "/admin/notifications")}
          >
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

