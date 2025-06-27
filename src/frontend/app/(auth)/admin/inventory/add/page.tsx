import { ProductForm } from "@/components/product-form"
import { AdminSidebar } from "@/components/admin-sidebar"
export default function AddProductPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <ProductForm
        mode="add"
      />
    </div>
  )
}
