"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Heart, User, Menu, X, Package, Settings, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { CurrencySelector } from "@/components/currency-selector"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  // Safe cart access with error handling
  useEffect(() => {
    setIsMounted(true)
    // Check if current path is admin path
    setIsAdmin(pathname?.startsWith("/admin") || false)

    // Safely get cart count
    try {
      const cartData = localStorage.getItem("nexura-cart")
      if (cartData) {
        const cartItems = JSON.parse(cartData)
        const count = cartItems.reduce((total: number, item: any) => total + (item.quantity || 0), 0)
        setCartItemCount(count)
      }
    } catch (error) {
      console.error("Error accessing cart data:", error)
    }
  }, [pathname])

  // Use the cart context safely with error handling
  useEffect(() => {
    if (!isMounted) return

    try {
      // This is a safer approach to update cart count when the cart context changes
      const handleStorageChange = () => {
        try {
          const cartData = localStorage.getItem("nexura-cart")
          if (cartData) {
            const cartItems = JSON.parse(cartData)
            const count = cartItems.reduce((total: number, item: any) => total + (item.quantity || 0), 0)
            setCartItemCount(count)
          } else {
            setCartItemCount(0)
          }
        } catch (error) {
          console.error("Error processing cart data:", error)
          setCartItemCount(0)
        }
      }

      // Listen for storage events to update cart count
      window.addEventListener("storage", handleStorageChange)

      // Initial load
      handleStorageChange()

      return () => {
        window.removeEventListener("storage", handleStorageChange)
      }
    } catch (error) {
      console.error("Error setting up cart listeners:", error)
    }
  }, [isMounted])

  const navigation = [
    { name: "Latest Products", href: "/products" },
    { name: "Backpacks", href: "/products", category: "backpack" },
    { name: "Bags", href: "/products", category: "bag" },
    { name: "Accessories", href: "/products", category: "accessory" },
    { name: "Collection", href: "/collection" },
    { name: "Blog", href: "/blog" },
    { name: "Stores", href: "/stores" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Announcement Bar */}
      <div className="bg-black text-white dark:bg-gray-900 text-xs py-2 px-4 text-center">
        Enjoy an exclusive 10% coupon for your first purchase.
      </div>

      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-8 flex-1">
          <Link href="/" className="font-bold text-xl">
            NEXURA
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={{
                  pathname: item.href,
                  query: item.category ? { category: item.category } : undefined,
                }}
                className={`hover:text-foreground/80 ${
                  pathname === item.href ? "text-foreground font-medium" : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <CurrencySelector />
          <ThemeToggle />
          <SearchDialog />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/login">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Create Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/wishlist">Wishlist</Link>
              </DropdownMenuItem>

              {/* Admin Links */}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/admin/inventory">
                    <Package className="h-4 w-4 mr-2" />
                    Inventory Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/products">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Product Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/blog">
                    <FileText className="h-4 w-4 mr-2" />
                    Blog Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {isMounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b py-4">
                  <Link href="/" className="font-bold text-xl">
                    NEXURA
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <nav className="flex flex-col gap-4 py-8">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className={`px-2 py-1 ${
                          pathname === item.href ? "text-foreground font-medium" : "text-foreground/60"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="h-px bg-border my-2"></div>

                  <SheetClose asChild>
                    <Link href="/admin/inventory" className="px-2 py-1 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Inventory Management
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/admin/products" className="px-2 py-1 flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Product Management
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/admin/blog" className="px-2 py-1 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Blog Management
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/wishlist" className="px-2 py-1 flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Link>
                  </SheetClose>
                </nav>

                <div className="mt-auto border-t py-4 space-y-4">
                  <div className="flex justify-center">
                    <CurrencySelector />
                  </div>
                  <SheetClose asChild>
                    <Link href="/login" className="flex px-2 py-1">
                      Sign In / Register
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/profile" className="flex px-2 py-1">
                      My Profile
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/orders" className="flex px-2 py-1">
                      My Orders
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

