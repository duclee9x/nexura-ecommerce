"use client"

import { Label } from "@/components/ui/label"

import type React from "react"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Building, CreditCard, Globe } from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"

export default function SettingsPage() {
  const [ activeTab, setActiveTab ] = useState("general")
  const [ isSaving, setIsSaving ] = useState(false)
  const { formatPrice } = useCurrency()
  // General settings state
  const [ generalSettings, setGeneralSettings ] = useState({
    storeName:     "NEXURA",
    storeEmail:    "admin@nexura.com",
    storePhone:    "+84 33 475 4517",
    storeAddress:  "123 Commerce St, New York, NY 10001, USA",
    storeCurrency: "USD",
    storeTimeZone: "Asia/Jakarta"
  })
  
  // Payment settings state
  const [ paymentSettings, setPaymentSettings ] = useState({
    enableStripe:         true,
    enablePayPal:         true,
    enableCashOnDelivery: false,
    enableBankTransfer:   false,
    testMode:             true
  })
  
  // Shipping settings state
  const [ shippingSettings, setShippingSettings ] = useState({
    enableFreeShipping:    true,
    freeShippingThreshold: "100",
    enableFlatRate:        true,
    flatRateAmount:        "10",
    enableLocalPickup:     false
  })
  
  // Email settings state
  const [ emailSettings, setEmailSettings ] = useState({
    emailProvider:              "smtp",
    smtpHost:                   "smtp.example.com",
    smtpPort:                   "587",
    smtpUsername:               "user@example.com",
    smtpPassword:               "••••••••",
    senderName:                 "NEXURA Store",
    senderEmail:                "noreply@nexura.com",
    enableOrderConfirmation:    true,
    enableShippingConfirmation: true,
    enableCustomerRegistration: true
  })
  
  // User settings state
  const [ userSettings, setUserSettings ] = useState({
    enableUserRegistration:   true,
    requireEmailVerification: true,
    enableGuestCheckout:      true,
    passwordMinLength:        "8"
  })
  
  // Appearance settings state
  const [ appearanceSettings, setAppearanceSettings ] = useState({
    primaryColor:   "#3b82f6",
    secondaryColor: "#10b981",
    accentColor:    "#f59e0b",
    enableDarkMode: true,
    defaultTheme:   "system"
  })
  
  // Handle input change for general settings
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle select change for general settings
  const handleGeneralSelectChange = (name: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle toggle change for payment settings
  const handlePaymentToggle = (name: string, checked: boolean) => {
    setPaymentSettings(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle input change for shipping settings
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle toggle change for shipping settings
  const handleShippingToggle = (name: string, checked: boolean) => {
    setShippingSettings(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle input change for email settings
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle select change for email settings
  const handleEmailSelectChange = (name: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle toggle change for email settings
  const handleEmailToggle = (name: string, checked: boolean) => {
    setEmailSettings(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle input change for user settings
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle toggle change for user settings
  const handleUserToggle = (name: string, checked: boolean) => {
    setUserSettings(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle input change for appearance settings
  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAppearanceSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle select change for appearance settings
  const handleAppearanceSelectChange = (name: string, value: string) => {
    setAppearanceSettings(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle toggle change for appearance settings
  const handleAppearanceToggle = (name: string, checked: boolean) => {
    setAppearanceSettings(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle save settings
  const handleSave = () => {
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      
      toast({
        title:       "Settings Saved",
        description: "Your settings have been saved successfully."
      })
    }, 1000)
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <AdminSidebar />
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Settings</h1>
              <p className="text-muted-foreground">
                Configure your store settings
              </p>
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="min-w-[100px]"
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Saving
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-y-2 w-full h-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            
            {/* General Settings Tab */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Store Information
                  </CardTitle>
                  <CardDescription>
                    Basic information about your store
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input 
                        id="storeName" 
                        name="storeName" 
                        value={generalSettings.storeName}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storeEmail">Store Email</Label>
                      <Input 
                        id="storeEmail" 
                        name="storeEmail" 
                        type="email"
                        value={generalSettings.storeEmail}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="storePhone">Store Phone</Label>
                      <Input 
                        id="storePhone" 
                        name="storePhone" 
                        value={generalSettings.storePhone}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storeAddress">Store Address</Label>
                      <Textarea 
                        id="storeAddress" 
                        name="storeAddress" 
                        value={generalSettings.storeAddress}
                        onChange={handleGeneralChange}
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="storeCurrency">Currency</Label>
                      <Select 
                        disabled={true}
                        value={generalSettings.storeCurrency} 
                        onValueChange={value => handleGeneralSelectChange("storeCurrency", value)}
                      >
                        <SelectTrigger id="storeCurrency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem  value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="storeTimeZone">Time Zone</Label>
                      <Select 
                        value={generalSettings.storeTimeZone} 
                        onValueChange={value => handleGeneralSelectChange("storeTimeZone", value)}
                      >
                        <SelectTrigger id="storeTimeZone">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Asia/Jakarta">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="Asia/Bangkok">Central European Time (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    SEO Settings
                  </CardTitle>
                  <CardDescription>
                    Search engine optimization settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">Default Page Title</Label>
                    <Input 
                      id="seoTitle" 
                      placeholder="NEXURA - Premium Bags and Accessories"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 50-60 characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Default Meta Description</Label>
                    <Textarea 
                      id="seoDescription" 
                      placeholder={`Discover premium quality backpacks, bags, and accessories at NEXURA. Free shipping on orders over ${formatPrice(100)}.`}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 150-160 characters
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords">Default Keywords</Label>
                    <Input 
                      id="seoKeywords" 
                      placeholder="backpacks, bags, accessories, travel, premium"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate keywords with commas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Settings Tab */}
            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>
                    Configure available payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 9.5V14.5C22 17 20 18.5 18 18.5H6C4 18.5 2 17 2 14.5V9.5C2 7 4 5.5 6 5.5H18C20 5.5 22 7 22 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15.5C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5C10.3431 9.5 9 10.8431 9 12.5C9 14.1569 10.3431 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Stripe</h3>
                          <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 8.5H4.5C3.67157 8.5 3 9.17157 3 10V17C3 17.8284 3.67157 18.5 4.5 18.5H19.5C20.3284 18.5 21 17.8284 21 17V10C21 9.17157 20.3284 8.5 19.5 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 14.5C16.8284 14.5 17.5 13.8284 17.5 13C17.5 12.1716 16.8284 11.5 16 11.5C15.1716 11.5 14.5 12.1716 14.5 13C14.5 13.8284 15.1716 14.5 16 14.5Z" fill="currentColor" />
                            <path d="M3 10.5L12 5.5L21 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">PayPal</h3>
                          <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-4">
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium">Cash on Delivery</h3>
                          <p className="text-sm text-muted-foreground">Accept cash payments on delivery</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure general payment settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Test Mode</h3>
                      <p className="text-sm text-muted-foreground">Enable test mode for payment gateways</p>
                    </div>
                    <div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Currency Format</h3>
                      <p className="text-sm text-muted-foreground">How prices are displayed on your store</p>
                    </div>
                    <div>
                      <Select defaultValue="symbol">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="symbol">Symbol ($100.00)</SelectItem>
                          <SelectItem value="code">Code (USD 100.00)</SelectItem>
                          <SelectItem value="symbolCode">Symbol and Code ($100.00 USD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Decimal Separator</h3>
                      <p className="text-sm text-muted-foreground">Character to use as decimal separator</p>
                    </div>
                    <div>
                      <Select defaultValue="period">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select separator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="period">Period (100.00)</SelectItem>
                          <SelectItem value="comma">Comma (100,00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Add other tabs content here */}
            <TabsContent value="shipping" className="space-y-6">
              {/* Shipping settings content */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Shipping settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-6">
              {/* Email settings content */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Email settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              {/* User settings content */}
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>User settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              {/* Appearance settings content */}
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Appearance settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

