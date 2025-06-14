"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedAttributeManager } from "@/components/enhanced-attribute-manager"
import { mockAttributes } from "@/lib/mock-data"
import type { ProductAttribute } from "@/types/product"
import { toast } from "@/hooks/use-toast"
import { ChevronLeft, Link, Save } from "lucide-react"

export default function AttributesPage() {
  const [ attributes, setAttributes ] = useState<ProductAttribute[]>(mockAttributes)
  const [ isLoading, setIsLoading ] = useState(false)

  const handleAttributesChange = (updatedAttributes: ProductAttribute[]) => {
    setAttributes(updatedAttributes)
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title:       "Attributes Saved",
        description: "Your product attributes have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href="/admin/products">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <h1 className="text-3xl font-bold dark:text-white">Product Attributes</h1>
            </div>

            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Attributes"}
            </Button>
          </div>

          <div className="grid gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Manage Product Attributes</CardTitle>
                  <CardDescription>
                    Create and manage attributes that define your products. These attributes can be used to create
                    variants and filter products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedAttributeManager attributes={attributes} onChange={handleAttributesChange} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
