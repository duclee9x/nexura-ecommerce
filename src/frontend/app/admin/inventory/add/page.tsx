"use client"

import { ProductForm } from "@/components/product-form"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Product } from "@/protos/nexura"
import { createProductGateway, getAllBrandGateway, getAllCategoryGateway } from "@/gateway/gateway"
import { useQuery } from "@tanstack/react-query"


export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)



  const {data: categories} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryGateway().then((res) => res.categories)
  })
  const {data: brands} = useQuery({
    queryKey: ["brands"],
    queryFn: () => getAllBrandGateway().then((res) => res.brands)
  })
  
  const handleSave = async (product: Product) => {
    setIsLoading(true)
    try {
      
      await createProductGateway(product)
      toast({
        title: "Product Created",
        description: "Your product has been created successfully.",
      })
      router.push("/admin/inventory")
    } catch (error) {
      console.log(error, "error")
      toast({
        title: "Error",
        description: "Failed to create the product. Please try again.",
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
        categories={categories}
        brands={brands}
        onSave={handleSave}
        onCancel={handleCancel}
        mode="add"
      />
    </div>
  )
}
