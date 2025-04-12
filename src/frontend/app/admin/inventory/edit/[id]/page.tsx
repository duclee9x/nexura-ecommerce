"use client"

import { ProductForm } from "@/components/product-form"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Product } from "@/protos/nexura"
import { use } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { getAllBrandGateway, updateProductGateway } from "@/gateway/gateway"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCategoryGateway, listProductsGateway } from "@/gateway/gateway"
import { Loader2 } from "lucide-react"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: productId } = use(params)
  const queryClient = useQueryClient()
  const {data: categories} = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoryGateway().then((res) => res.categories)
  })
  const {data: brands} = useQuery({
    queryKey: ["brands"],
    queryFn: () => getAllBrandGateway().then((res) => res.brands)
  })

  
  const handleUpdateProduct = (product: Product) => {
    
    updateProduct(product)
    toast({
      title: "Product Updated",
      description: "Product has been updated successfully.",
    })
  }


  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: (product: Product) => updateProductGateway(product),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [ "inventory" ] })
      await queryClient.prefetchQuery({ queryKey: ["inventory"], queryFn: ()=>listProductsGateway("").then((res) => res.products) });
      router.push("/admin/inventory")
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update the product. Please try again.",
        variant: "destructive",
      })
    }
  })
  
  const handleCancel = () => {
    router.back()
  }
  if (isPending) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <ProductForm
        productId={productId}
        categories={categories}
        brands={brands}
        onSave={updateProduct}
        onCancel={handleCancel}
        mode="edit"
      />
    </div>
  )
}
