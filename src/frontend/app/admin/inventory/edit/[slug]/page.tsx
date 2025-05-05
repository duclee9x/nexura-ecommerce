
import { ProductForm } from "@/components/product-form"
import { AdminSidebar } from "@/components/admin-sidebar"
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <ProductForm
        mode="edit"
        productSlug={slug}
      />
    </div>
  )
}
