import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import heroImage from "@/public/landing-page-hero.jpg"
import backpackImage from "@/public/backpack.jpg"
import backpack_1 from "@/public/backpack-1.webp"
import backpack_2 from "@/public/backpack-2.jpg"
import backpack_3 from "@/public/backpack-3.jpg"
import backpack_4 from "@/public/backpack-4.jpg"
import TravelBackpack from "@/public/travel-backpack.webp"
import { Icon } from "@iconify/react";
import { getSession } from "./api/auth/route"
import { useSession } from "@/contexts/session-context"
interface Product {
  id: string;
  name: string;
  image: StaticImageData;
  url: string;
  colors: string[];
}

const products: Product[] = [
  {
    id: "1",
    name: "Accessory 1",
    image: backpack_1,
    url: "/products/hyper-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "2",
    name: "Accessory 2",
    image: backpack_2,
    url: "/products/urban-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "3",
    name: "Accessory 3",
    image: backpack_3,
    url: "/products/smart-carry-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "4",
    name: "Accessory 4",
    image: backpack_4,
    url: "/products/aero-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "5",
    name: "Accessory 5",
    image: backpack_1,
    url: "/products/hyper-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "6",
    name: "Accessory 6",
    image: backpack_2,
    url: "/products/urban-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "7",
    name: "Accessory 7",
    image: backpack_3,
    url: "/products/smart-carry-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  },
  {
    id: "8",
    name: "Accessory 8",
    image: backpack_4,
    url: "/products/aero-backpack",
    colors: ["bg-black", "bg-gray-400", "bg-blue-800"]
  }
]
export default async function Home() {
  const session = await getSession()
  return (
    <div className="container mx-auto px-4">
      <main className="flex-1">
        <FeatureSection />
        <BackpackCollectionSection products={products} />
        <AccessoriesCollectionSection products={products} />
      </main>
    </div>
  )

  function CTAButton({ text, href }: { text: string, href: string }) {
    return (
      <Link href={href}>
        <Button className="rounded-xl dark:text-white outline-gray outline outline-1  text-black bg-white hover:bg-black hover:text-white  dark:bg-gray-800 dark:hover:bg-gray-700 px-6">
          {text}
        </Button>
      </Link>
    )
  }

  function InfoSection({ icon, title, description, center, bgColor }: { icon: string, title: string, description: string, center?: boolean, bgColor?: string }) {
    if (center) {
      return (
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-3">
            <Icon className="text-3xl" icon={icon} />
          </div>
          <h3 className="font-bold uppercase mb-1 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      )
    } else {
      return (
        <div className={`border rounded-xl h-full dark:border-gray-100 px-6 flex flex-col items-start gap-4 ${bgColor ? bgColor : "bg-gray-100"}`}>
          <div className="pt-8 pb-2">
            <Icon className="text-3xl dark:text-gray-800" icon={icon} />
          </div>
          <div>
            <h3 className="font-bold dark:text-gray-800 uppercase mb-1 text-xl">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-800">
              {description}
            </p>
          </div>
        </div>
      )
    }
  }

  function HeroSection() {
    return (
      <section className="relative py-8 bg-white dark:bg-gray-950">
        <div className="container lg:h-[50vh] mx-auto px-4 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col md:w-1/2 justify-center gap-3">
            <div className="p-6 border bg-gray-100 h-2/3 rounded-3xl flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl dark:text-gray-800 font-bold uppercase tracking-tight leading-tight mb-4 ">
                GET READY FOR YEAR-END
                <br />
                BUSINESS TRAVEL
              </h1>
              <p className="text-gray-700 text-justify dark:text-gray-800 mb-6 ">
                Prepare for year-end business travel with ease. Maximize your productivity,
                streamline plans, and enjoy stress-free journeys.
              </p>
              <div>
                <CTAButton text="Shop Now" href="/products" />
              </div>
            </div>
            <section className="bg-white dark:bg-gray-950 h-1/3">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 h-full">
                <InfoSection icon="hugeicons:delivery-truck-01" title="FREE SHIPPING" description="Enjoy free shipping on all orders over $50 for continental locations." />
                <InfoSection icon="hugeicons:shield-user" title="SECURE CHECKOUT" description="Shop with confidence knowing your personal information is always secure." />
              </div>
            </section>
          </div>
          <div className="flex justify-center  md:mt-0">
            <Image
              loader={({ src }) => src}
              src={heroImage}
              alt="Business traveler with backpack"
              sizes="100%" priority
              className="rounded-3xl"
            />
          </div>
        </div>

      </section>
    )
  }

  function FeatureSection() {
    return (
      <section className="bg-base py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-sm text-gray-500 uppercase dark:text-gray-400">BEST PRODUCT</span>
            <h2 className="text-3xl font-bold uppercase mt-1 dark:text-white">GO-TO TRAVEL PACK</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              Designed for adventurers, this pack offers ample space, durability, and comfort for all your journey
              ahead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <Image
                src={backpackImage}
                alt="Navy blue travel backpack"
                className="object-contain rounded-2xl size-auto"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoSection center icon="hugeicons:layout-01" title="SPACIOUS DESIGN" description="Multiple compartments for ample organized space." />
              <InfoSection center icon="hugeicons:hoodie" title="COMFORT FIT" description="Padded straps for maximum comfort and support." />
              <InfoSection center icon="hugeicons:sun-cloud-angled-rain-02" title="WEATHER RESISTANT" description="Durable, water-resistant materials for all weather conditions." />
              <InfoSection center icon="hugeicons:microsoft-admin" title="TECH-FRIENDLY" description="Dedicated compartments protect your devices on the go.." />
            </div>
          </div>
        </div>
      </section>
    )
  }

  function ProductCard({ src, alt, href, colors }: { src: StaticImageData, alt: string, href: string, colors: string[] }) {
    return (
      <div className="border w-full rounded-2xl dark:border-gray-800">
        <Link href={href}>
          <div className="aspect-square relative">
            <Image src={src} alt={alt} priority className="object-cover rounded-2xl" />
          </div>

          <div className="p-4">
            <h3 className="font-medium uppercase dark:text-white">URBAN BACKPACK</h3>
            <p className="text-gray-900 dark:text-gray-100 font-semibold">$120</p>
            <div className="flex mt-2">
              {colors.map((color) => (
                <span key={color} className={`w-4 h-4 rounded-full ${color} mr-1`}></span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    )
  }

  function BackpackCollectionSection({ products }: { products: Product[] }) {
    return (
      <section className="bg-base py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase dark:text-gray-400">BACKPACK COLLECTION</span>
              <h2 className="text-3xl font-bold uppercase mt-1 dark:text-white">BROWSE BACKPACK COLLECTION</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Discover our premium collection of backpacks designed for durability, modern style, and exceptional
                quality for your adventures.
              </p>
            </div>
            <div className="mt-4 items-end self-end">
              <CTAButton text="Show More" href="/products/backpack" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 flex flex-col justify-center md:col-span-2">
              <Image src={TravelBackpack} alt="Travel Backpack" priority className="size-auto rounded-2xl" />
              <div className="absolute p-6 w-1/2 bg-gray-300 text-white z-10">
                <h3 className="text-2xl font-bold uppercase mb-4 text-gray-800">GET READY FOR YEAR</h3>
                <p className="text-gray-800 mb-6 text-left">
                  Make business travel easier with our premium 2-in-1 work bags that combine backpack-like business
                  travel essentials with our innovative 2-in-1 multi-functional backpacks.
                </p>
                <CTAButton text="Explore" href="/products?category=backpack" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-2 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} src={product.image} alt={product.name} href={product.url} colors={product.colors} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  function AccessoriesCollectionSection({ products }: { products: Product[] }) {
    return (
      <section className="bg-base py-12">

        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase dark:text-gray-400">ACCESSORIES</span>
              <h2 className="text-3xl font-bold uppercase mt-1 dark:text-white">BACKPACK GEAR ESSENTIALS</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Discover backpack gear essentials designed for functionality and style,
                ensuring you're prepared for any adventure ahead..
              </p>
            </div>
            <div className="mt-4 items-end self-end">
              <CTAButton text="Show More" href="/products?category=accessory" />
            </div>
          </div>
          <ProductCatalog products={products} />
        </div>
      </section>
    )
  }
  function ProductCatalog({ products }: { products: Product[] }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} src={product.image} alt={product.name} href={product.url} colors={product.colors} />
        ))}
      </div>
    )
  }
}

