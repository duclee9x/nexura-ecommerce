"use client"

import { useState } from "react"
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
  Menu,
  X,
} from "lucide-react"
import { memo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminSidebarProps {
  className?: string
}

export const AdminSidebar = memo(({ className }: AdminSidebarProps) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight text-text-base">Admin Dashboard</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                item.active ? "bg-bg-selected text-text-selected" : "hover:bg-bg-subtle hover:text-text-base",
              )}
              asChild
              onClick={() => setIsOpen(false)}
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
  )

  return (
    <>
      <div className={cn("pb-12 hidden xl:block min-h-screen max-w-xs border-r border-border-base", className)}>
        <SidebarContent />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden fixed left-4 bottom-16 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
})
