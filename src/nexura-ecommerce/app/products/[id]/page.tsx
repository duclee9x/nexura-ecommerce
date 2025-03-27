"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, Share2, ShoppingBag, Check, Search } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import { ProductReview } from "@/components/product-review"
import { FullscreenImageViewer } from "@/components/fullscreen-image-viewer"
import type { Review } from "@/types/schema"
// Sample product data - in a real app, this would come from an API or database
const product = {
  id: 1,
  name: "Urban Backpack",
  price: 120,
  description:
    "The Urban Backpack is designed for the modern professional who needs a reliable, stylish bag for daily use. With multiple compartments, water-resistant material, and comfortable straps, it's perfect for commuting, travel, or everyday adventures.",
  colors: [
    { name: "Black", value: "black" },
    { name: "Gray", value: "gray" },
    { name: "Navy Blue", value: "blue" },
  ],
  images: [
    "/backpack-1.webp?height=600&width=600",
    "/backpack-2.jpg?height=600&width=600",
    "/backpack-3.jpg?height=600&width=600",
    "/backpack-4.jpg?height=600&width=600",
  ],
  rating: 4.8,
  reviewCount: 128,
  sku: "BP-URB-001",
  features: [
    "Water-resistant exterior keeps your belongings dry in light rain",
    "Padded laptop compartment fits devices up to 15.6 inches",
    "Multiple internal pockets for organized storage",
    "Breathable back panel for all-day comfort",
    "Adjustable shoulder straps with ergonomic design",
    "Hidden security pocket for valuables",
    "Durable YKK zippers throughout",
  ],
  specifications: {
    dimensions: '18" x 12" x 6"',
    weight: "2.4 lbs (1.1 kg)",
    volume: "25L",
    material: "600D Polyester with PU coating",
    laptopCompartment: 'Fits up to 15.6" laptop',
    waterResistance: "IPX4 (Splash resistant)",
    warranty: "2 years",
    countryOfOrigin: "Vietnam",
  },
}

// Sample reviews
const sampleReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    customerId: "101",
    customerName: "Sarah T.",
    rating: 5,
    title: "Perfect for daily commute",
    content:
      "I've been using this backpack for my daily commute for the past 2 months and it's been fantastic. The laptop compartment keeps my computer secure, and I love all the pockets for organization. The water resistance came in handy during an unexpected downpour!",
    images: ["/backpack-1.webp?height=200&width=200&text=Review+Image+1"],
    status: "approved",
    helpful: 12,
    notHelpful: 1,
    verifiedPurchase: true,
    createdAt: "2023-02-15T14:30:00",
    updatedAt: "2023-02-15T14:30:00",
  },
  {
    id: "2",
    productId: "1",
    customerId: "102",
    customerName: "Michael R.",
    rating: 4,
    title: "Great quality, slightly small",
    content:
      "The quality of this backpack is excellent. The materials feel premium and the stitching is solid. My only complaint is that it's slightly smaller than I expected. I wish the main compartment had a bit more room.",
    images: [],
    status: "approved",
    helpful: 8,
    notHelpful: 2,
    verifiedPurchase: true,
    createdAt: "2023-03-05T09:45:00",
    updatedAt: "2023-03-05T09:45:00",
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product.images[0])
  const [isAdding, setIsAdding] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [fullscreenInitialIndex, setFullscreenInitialIndex] = useState(0)

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleImageSelect = (image: string, index: number) => {
    setMainImage(image)
    setFullscreenInitialIndex(index)
  }

  const handleAddToCart = () => {
    setIsAdding(true)

    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      color: selectedColor,
    })

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    // Reset button state after a short delay
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const openFullscreen = (index: number) => {
    setFullscreenInitialIndex(index)
    setIsFullscreenOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <span className="text-muted-foreground">/</span>
        <span>{product.name}</span>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => router.push("/products")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div
            className="border dark:border-gray-800 aspect-square relative cursor-zoom-in"
            onClick={() => openFullscreen(product.images.findIndex((img) => img === mainImage))}
          >
            <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black"
              onClick={(e) => {
                e.stopPropagation()
                openFullscreen(product.images.findIndex((img) => img === mainImage))
              }}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border dark:border-gray-800 aspect-square relative cursor-pointer ${
                  mainImage === image ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleImageSelect(image, index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full bg-${
                    color.value === "black" ? "black" : color.value === "gray" ? "gray-400" : "blue-800"
                  } ${selectedColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                  onClick={() => handleColorSelect(color.value)}
                  aria-label={`Select ${color.name} color`}
                ></button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {product.colors.find((c) => c.value === selectedColor)?.name}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                +
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-black hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-3 border-t dark:border-gray-800 pt-6">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="details" className="rounded-none">
              Details
            </TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-none">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none">
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Product Details</h3>
              <p>
                The Urban Backpack is our flagship product, designed with the modern professional in mind. It combines
                sleek aesthetics with practical functionality to create the perfect everyday carry solution.
              </p>
              <h4 className="font-bold mt-4">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Dimensions</span>
                    <span>{product.specifications.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Weight</span>
                    <span>{product.specifications.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Volume</span>
                    <span>{product.specifications.volume}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Material</span>
                    <span>{product.specifications.material}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Laptop Compartment</span>
                    <span>{product.specifications.laptopCompartment}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Water Resistance</span>
                    <span>{product.specifications.waterResistance}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Warranty</span>
                    <span>{product.specifications.warranty}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-800">
                    <span className="font-medium">Country of Origin</span>
                    <span>{product.specifications.countryOfOrigin}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <ProductReview productId={product.id} reviews={sampleReviews as Review[]} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border dark:border-gray-800 group">
              <Link href={`/products/${item + 1}`}>
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={`/backpack-1.webp?height=300&width=300&text=Related${item}`}
                    alt={`Related Product ${item}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">Travel Backpack {item}</h3>
                  <p className="text-gray-900 dark:text-gray-100 font-semibold mt-1">${90 + item * 10}.00</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 fill-current ${i < 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      <FullscreenImageViewer
        images={product.images}
        initialIndex={fullscreenInitialIndex}
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
      />
    </div>
  )
}

