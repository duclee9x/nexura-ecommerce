"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      })

      // Reset form after submission
      setFormState({
        name: "",
        email: "",
        subject: "general",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">Contact Us</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Have questions, feedback, or need assistance? We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white dark:bg-gray-950 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 border dark:border-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 dark:text-white">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  278 Treadgold Dr
                  <br />
                  Sarasota, FL 34238
                  <br />
                  United States
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 border dark:border-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 dark:text-white">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customer Service:
                  <br />
                  +1 (555) 555-0123
                  <br />
                  <br />
                  Sales Inquiries:
                  <br />
                  +1 (555) 555-0124
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 border dark:border-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 dark:text-white">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  General Inquiries:
                  <br />
                  info@nexura.com
                  <br />
                  <br />
                  Customer Support:
                  <br />
                  support@nexura.com
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 border dark:border-gray-800 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2 dark:text-white">Business Hours</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday:
                  <br />
                  9:00 AM - 6:00 PM EST
                  <br />
                  <br />
                  Saturday:
                  <br />
                  10:00 AM - 4:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for reaching out. We've received your message and will get back to you shortly.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <RadioGroup
                        value={formState.subject}
                        onValueChange={handleRadioChange}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">General Inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support" id="support" />
                          <Label htmlFor="support">Product Support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="order" id="order" />
                          <Label htmlFor="order">Order Status</Label>
                          />
                          <Label htmlFor="order">Order Status</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="feedback" id="feedback" />
                          <Label htmlFor="feedback">Feedback</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="bg-white dark:bg-gray-950 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Find Us</h2>
            <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
              {/* In a real implementation, this would be a Google Maps or similar embed */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold mb-2 dark:text-white">What are your shipping times?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Standard shipping typically takes 3-5 business days within the continental US. Express shipping is
                    available for 1-2 business day delivery. International shipping times vary by location.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold mb-2 dark:text-white">What is your return policy?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We offer a 30-day return policy for unused items in their original packaging. Please visit our{" "}
                    <Link href="/returns" className="text-primary hover:underline">
                      Returns & Refunds
                    </Link>{" "}
                    page for more details.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="font-bold mb-2 dark:text-white">Do you offer international shipping?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                    location. Customs fees and import taxes may apply.
                  </p>
                </div>
                <div className="text-center mt-8">
                  <Link href="/faq">
                    <Button variant="outline">View All FAQs</Button>
                  </Link>
                </div>
              </div>
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

