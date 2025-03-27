import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">About NEXURA</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                We create premium backpacks and travel gear designed for modern adventurers, business travelers, and
                everyday explorers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white dark:bg-gray-950 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  NEXURA was founded in 2015 by a group of passionate travelers and designers who were frustrated with
                  the lack of functional, durable, and stylish travel gear on the market.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  What started as a small project in a garage has grown into a global brand trusted by travelers and
                  commuters around the world. Our mission is to create products that seamlessly blend functionality,
                  durability, and style to enhance your journey, whether you're commuting to work or exploring a new
                  country.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Today, NEXURA is recognized for its innovative designs, premium materials, and commitment to quality.
                  We continue to push the boundaries of what travel gear can be, always with our customers' needs at the
                  forefront of our design process.
                </p>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Our+Story"
                  alt="NEXURA founders"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Quality</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in creating products that last. From the materials we source to our manufacturing
                  processes, quality is at the heart of everything we do.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"></path>
                    <line x1="16" x2="2" y1="8" y2="22"></line>
                    <line x1="17.5" x2="9" y1="15" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We're constantly exploring new materials, designs, and features to create products that solve real
                  problems and enhance your travel experience.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M3 6v18h18V6"></path>
                    <path d="M3 6V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"></path>
                    <path d="M3 6h18"></path>
                    <path d="M10 16l2-2 2 2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Sustainability</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We're committed to reducing our environmental impact through responsible material sourcing, ethical
                  manufacturing, and durable products that don't need frequent replacement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white dark:bg-gray-950 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Morgan",
                  title: "Founder & CEO",
                  image: "/placeholder.svg?height=300&width=300&text=Alex",
                },
                {
                  name: "Jamie Chen",
                  title: "Head of Design",
                  image: "/placeholder.svg?height=300&width=300&text=Jamie",
                },
                {
                  name: "Taylor Kim",
                  title: "Product Development",
                  image: "/placeholder.svg?height=300&width=300&text=Taylor",
                },
                {
                  name: "Jordan Smith",
                  title: "Marketing Director",
                  image: "/placeholder.svg?height=300&width=300&text=Jordan",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the NEXURA Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Follow us on social media for travel tips, product updates, and inspiration for your next adventure.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Instagram
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Twitter
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Facebook
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="font-bold text-xl mb-4 block">
                NEXURA
              </Link>
              <p className="text-gray-400 text-sm mb-4">
                We create premium backpacks and travel gear for explorers, designed for comfort and convenience on any
                adventure or journey.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="#" aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" aria-label="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-sm">Quick Menu</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/products" className="hover:text-white">
                    Latest Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=backpack" className="hover:text-white">
                    Backpacks
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=bag" className="hover:text-white">
                    Bags
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=accessory" className="hover:text-white">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="hover:text-white">
                    Collection
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-sm">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-white">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-white">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 uppercase text-sm">Company Info</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>278 Treadgold Dr, Sarasota, FL 34238</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (555) 555-0123</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>info@nexura.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">©2024 Nexura Inc. All Rights Reserved.</p>
            <div className="flex gap-4 text-gray-500 text-sm mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

