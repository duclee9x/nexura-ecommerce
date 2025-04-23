"use client"

import { ProductForm } from "@/components/product-form"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Product } from "@nexura/grpc_gateway/protos"
import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { getAllBrandGateway, updateProductGateway, getAllCategoryGateway, listProductsGateway } from "@nexura/grpc_gateway/gateway"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useProductActions } from "@/hooks/use-product"
export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: productId } = use(params)
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const { updateProduct } = useProductActions()
  const { mutate: updateProductMutation, isPending } = updateProduct
  const {data: categories, isLoading: isLoadingCategories} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryGateway().then((res) => res.categories)
  })
  const {data: brands, isLoading: isLoadingBrands} = useQuery({
    queryKey: ["brands"],
    queryFn: () => getAllBrandGateway().then((res) => res.brands)
  })

  
  const handleUpdateProduct = (product: Product) => {
    if (isLoading) return

    setIsLoading(true)  
    try {
      updateProductMutation({product})
    } catch (error) {
      throw new Error("Failed to update product")
    }
    setIsLoading(false)

  }


  
  const handleCancel = () => {
    router.back()
  }
  
  if (isPending) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <ProductForm
        productId={productId}
        categoriesData={{categories, isLoadingCategories}}
        brandsData={{brands, isLoadingBrands}}
        onSave={handleUpdateProduct}
        onCancel={handleCancel}
        mode="edit"
      />
    </div>
  )
}
