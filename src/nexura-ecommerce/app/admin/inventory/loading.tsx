import { SiteHeader } from "@/components/site-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <Skeleton className="h-10 w-[300px] mb-2" />
            <Skeleton className="h-4 w-[400px]" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </main>
      </div>
    </div>
  )
}

