export const dynamic = 'force-dynamic';
import Link from "next/link"
import { BannerCarousel } from "@/components/banner-carousel"
import { ProductCard } from "@/components/product-card"
import { listProductsGateway, getAllCategoryGateway } from "@nexura/grpc_gateway/gateway"

export default async function HomePage() {
  const [ products, categories ] = await Promise.all([
    listProductsGateway(),
    getAllCategoryGateway()
  ])

  const bannerSlides = (products?.products || []).slice(0, 4).map((product) => ({
    title: product.name,
    href: `/products/${product.id}`,
    tag: product.categories.map(category=> categories.categories.find(c => c.id === category)?.name).join(", "),
    backgroundImage: product.images?.find(img => img.isMain)?.url || product.images[0].url,
  }))

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <main>
        {/* Banner Carousel - Client Component */}
        <BannerCarousel slides={bannerSlides} />

        {/* Shop by Categories Section */}
        <section className="px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-light text-gray-800 tracking-wider mb-4">SHOP BY CATEGORIES</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Start shopping based on the categories you are interested in
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {categories.categories.map((category, index) => (
                <Link
                  key={index}
                  href="#"
                  className="group relative aspect-square overflow-hidden bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent ">
                    <span className="text-white text-sm font-medium">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="px-8 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-light text-gray-800 tracking-wider mb-4">FEATURED PRODUCTS</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Discover our handpicked selection of premium furniture pieces
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.products.map((product) => (
                <ProductCard key={product.id} product={product} categories={categories.categories} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
