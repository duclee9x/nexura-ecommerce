"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Warehouse,
  Tag,
  FileText,
  Image,
  Mail,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      title: "Inventory",
      href: "/admin/inventory",
      icon: Package,
      active: isActive("/admin/inventory"),
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
      active: isActive("/admin/products"),
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      active: isActive("/admin/orders"),
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
      active: isActive("/admin/customers"),
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      active: isActive("/admin/analytics"),
    },
    {
      title: "Warehouses",
      href: "/admin/warehouses",
      icon: Warehouse,
      active: isActive("/admin/warehouses"),
    },
    {
      title: "Coupons",
      href: "/admin/coupons",
      icon: Tag,
      active: isActive("/admin/coupons"),
    },
    {
      title: "Blog",
      href: "/admin/blog",
      icon: FileText,
      active: isActive("/admin/blog"),
    },
    {
      title: "Media",
      href: "/admin/media",
      icon: Image,
      active: isActive("/admin/media"),
    },
    {
      title: "Newsletter",
      href: "/admin/newsletter",
      icon: Mail,
      active: isActive("/admin/newsletter"),
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: isActive("/admin/settings"),
    },
  ]

  return (
    <div className={cn("pb-12 min-h-screen max-w-xs border-r dark:border-gray-800", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">Admin Dashboard</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  item.active ? "bg-secondary" : "hover:bg-transparent hover:underline",
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
