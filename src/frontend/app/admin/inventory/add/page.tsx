"use client"

import { ProductForm } from "@/components/product-form"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Product } from "@nexura/grpc_gateway/protos"
import { getAllBrandGateway, getAllCategoryGateway } from "@nexura/grpc_gateway/gateway"
import { useQuery } from "@tanstack/react-query"
import { useProductActions } from "@/hooks/use-product"
export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { createProduct } = useProductActions()
  const { mutate: createProductMutation } = createProduct
  const {data: categories, isLoading: isLoadingCategories} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryGateway().then((res) => res.categories)
  })
  
  const {data: brands, isLoading: isLoadingBrands} = useQuery({
    queryKey: ["brands"],
    queryFn: () => getAllBrandGateway().then((res) => res.brands)
  })
  
  const handleSave = async (product: Product) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Ensure we have all required fields
      if (!product.name?.trim()) {
        throw new Error("Product name is required")
      }
      if (!product.description?.trim()) {
        throw new Error("Product description is required")
      }
      if (!product.images?.length) {
        throw new Error("Please add at least one product image")
      }

      try {
        createProductMutation({product})
      } catch (error) {
        throw new Error("Failed to create product")
      }

      // Show success message and navigate
      toast({
        title: "Product Created",
        description: "Your product has been created successfully.",
      })

      // Refresh and navigate
      router.refresh()
      router.push("/admin/inventory")
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <ProductForm
        categoriesData={{categories, isLoadingCategories}}
        brandsData={{brands, isLoadingBrands}}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="add"
      />
    </div>
  )
}
