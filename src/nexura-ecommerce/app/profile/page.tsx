"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Upload, Trash2, Plus, Edit, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Address as AddressType } from "@/types/schema"

export default function ProfilePage() {
  const router = useRouter()
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "278 Treadgold Dr",
      city: "Sarasota",
      state: "FL",
      zip: "34238",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      street: "1250 Broadway Ave, Suite 300",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: false,
    },
  ])

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    isDefault: false,
  })

  const [editingAddress, setEditingAddress] = useState(null)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)

  const handleAddAddress = () => {
    setAddresses([...addresses, { ...newAddress, id: Date.now() }])
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      isDefault: false,
    })
    setIsAddressDialogOpen(false)
  }

  const handleEditAddress = (address: AddressType) => {
    setEditingAddress(address)
    setIsAddressDialogOpen(true)
  }

  const handleUpdateAddress = () => {
    setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? editingAddress : addr)))
    setEditingAddress(null)
    setIsAddressDialogOpen(false)
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-1 mb-4" onClick={() => router.push("/")}>
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Upload a new profile picture. JPG, PNG or GIF. Maximum file size 2MB.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Upload
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2">
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  <Button variant="outline">Verify</Button>
                </div>
                <p className="text-sm text-muted-foreground">Your email is not verified yet</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 555-0123" />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup defaultValue="male" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue="1990-01-01" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Delivery Addresses</CardTitle>
                <CardDescription>Manage your delivery addresses</CardDescription>
              </div>
              <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingAddress(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
                    <DialogDescription>
                      {editingAddress ? "Update your delivery address details" : "Enter your delivery address details"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-name">Address Name</Label>
                      <Input
                        id="address-name"
                        placeholder="Home, Work, etc."
                        value={editingAddress ? editingAddress.name : newAddress.name}
                        onChange={(e) =>
                          editingAddress
                            ? setEditingAddress({ ...editingAddress, name: e.target.value })
                            : setNewAddress({ ...newAddress, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        placeholder="123 Main St"
                        value={editingAddress ? editingAddress.street : newAddress.street}
                        onChange={(e) =>
                          editingAddress
                            ? setEditingAddress({ ...editingAddress, street: e.target.value })
                            : setNewAddress({ ...newAddress, street: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={editingAddress ? editingAddress.city : newAddress.city}
                          onChange={(e) =>
                            editingAddress
                              ? setEditingAddress({ ...editingAddress, city: e.target.value })
                              : setNewAddress({ ...newAddress, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="State"
                          value={editingAddress ? editingAddress.state : newAddress.state}
                          onChange={(e) =>
                            editingAddress
                              ? setEditingAddress({ ...editingAddress, state: e.target.value })
                              : setNewAddress({ ...newAddress, state: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          placeholder="ZIP Code"
                          value={editingAddress ? editingAddress.zip : newAddress.zip}
                          onChange={(e) =>
                            editingAddress
                              ? setEditingAddress({ ...editingAddress, zip: e.target.value })
                              : setNewAddress({ ...newAddress, zip: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={editingAddress ? editingAddress.country : newAddress.country}
                          onValueChange={(value) =>
                            editingAddress
                              ? setEditingAddress({ ...editingAddress, country: value })
                              : setNewAddress({ ...newAddress, country: value })
                          }
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="default-address"
                        checked={editingAddress ? editingAddress.isDefault : newAddress.isDefault}
                        onCheckedChange={(checked) =>
                          editingAddress
                            ? setEditingAddress({ ...editingAddress, isDefault: checked })
                            : setNewAddress({ ...newAddress, isDefault: checked })
                        }
                      />
                      <Label htmlFor="default-address">Set as default address</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddressDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={editingAddress ? handleUpdateAddress : handleAddAddress}>
                      {editingAddress ? "Update Address" : "Add Address"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
                  <p className="text-muted-foreground mb-4">Add your first delivery address to get started</p>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 ${address.isDefault ? "border-primary" : "border-border"}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{address.name}</h3>
                        {address.isDefault && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleEditAddress(address)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {address.street}, {address.city}, {address.state} {address.zip}, {address.country}
                    </p>
                    {!address.isDefault && (
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2 text-sm"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        Set as default
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive a verification code on your phone when signing in
                  </p>
                </div>
                <Switch id="2fa" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Backup Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate backup codes to use when you don't have your device
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Generate Codes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>View your recent account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Password Changed</h4>
                    <p className="text-sm text-muted-foreground">New York, USA</p>
                  </div>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Login</h4>
                    <p className="text-sm text-muted-foreground">San Francisco, USA</p>
                  </div>
                  <p className="text-sm text-muted-foreground">5 days ago</p>
                </div>
                <Separator />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Login</h4>
                    <p className="text-sm text-muted-foreground">Miami, USA</p>
                  </div>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

