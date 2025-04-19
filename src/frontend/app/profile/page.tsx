"use client"

import { useSession } from "@/contexts/session-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import PersonalTab from "./tabs/personal-tab"
import AddressTab from "./tabs/address-tab"
import SecurityTab from "./tabs/security-tab"
import Link from "next/link"
export default function ProfilePage() {
  const { user } = useSession()
  return (
    <div className="container mx-auto px-4">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
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
            <PersonalTab user={user || null} />

            {/* Addresses Tab */}
            <AddressTab type="profile" user={user || null} setAddress={()=>{}} />

            {/* Security Tab */}
            <SecurityTab user={user || null} />
          </Tabs>
        </div>
      </main>
    </div>
  )
}


