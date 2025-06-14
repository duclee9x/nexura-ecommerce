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
  const [ isOpen, setIsOpen ] = useState(false)

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  const navItems = [
    {
      title:             "Dashboard",
      href:              "/admin",
      icon:              LayoutDashboard,
      hasImplementation: false,
      active:            pathname === "/admin",
    },
    {
      title:             "Inventory",
      href:              "/admin/inventory",
      icon:              Package,
      hasImplementation: true,
      active:            isActive("/admin/inventory"),
    },
    {
      title:             "Orders",
      href:              "/admin/orders",
      icon:              ShoppingCart,
      hasImplementation: true,
      active:            isActive("/admin/orders"),
    },
    {
      title:             "Customers",
      href:              "/admin/customers",
      icon:              Users,
      hasImplementation: true,
      active:            isActive("/admin/customers"),
    },
    {
      title:             "Analytics",
      href:              "/admin/analytics",
      icon:              BarChart3,
      hasImplementation: false,
      active:            isActive("/admin/analytics"),
    },
    {
      title:             "Warehouses",
      href:              "/admin/warehouses",
      icon:              Warehouse,
      hasImplementation: false,
      active:            isActive("/admin/warehouses"),
    },
    {
      title:             "Coupons",
      href:              "/admin/coupons",
      icon:              Tag,
      hasImplementation: false,
      active:            isActive("/admin/coupons"),
    },
    {
      title:             "Blog",
      href:              "/admin/blog",
      icon:              FileText,
      hasImplementation: false,
      active:            isActive("/admin/blog"),
    },
    {
      title:             "Media",
      href:              "/admin/media",
      icon:              Image,
      hasImplementation: false,
      active:            isActive("/admin/media"),
    },
    {
      title:             "Newsletter",
      href:              "/admin/newsletter",
      icon:              Mail,
      hasImplementation: false,
      active:            isActive("/admin/newsletter"),
    },
    {
      title:             "Settings",
      href:              "/admin/settings",
      icon:              Settings,
      hasImplementation: false,
      active:            isActive("/admin/settings"),
    },
  ]

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight text-text-base">Admin Dashboard</h2>
        <div className="space-y-1">
          {navItems.map(item => (
            <Button
              key={item.href}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                item.active ? "bg-bg-selected text-text-selected" : "hover:bg-bg-subtle hover:text-text-base",
                item.hasImplementation ? "text-text-base" : "text-text-muted"
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
