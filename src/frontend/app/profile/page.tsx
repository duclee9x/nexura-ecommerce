"use client"

import { useSession } from "@/contexts/session-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import PersonalTab from "./tabs/personal-tab"
import AddressTab from "./tabs/address-tab"
import SecurityTab from "./tabs/security-tab"
import Link from "next/link"
import UserHooks from "@/hooks/user-hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Loading Skeleton Components
function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1 mb-4">
        <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="space-y-2">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="space-y-4">
        <div className="h-10 w-[400px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Error Component
function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const { user, isLoading: isUserLoading, error: sessionError, refetch: refetchSession } = useSession()
  const { useUpdateUser } = UserHooks()

  // Loading state
  if (isUserLoading) {
    return (
      <div className="container mx-auto px-4">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <ProfileSkeleton />
          </div>
        </main>
      </div>
    )
  }

  // Error state
  if (sessionError) {
    return (
      <div className="container mx-auto px-4">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorState 
                  message={sessionError.message || "Failed to load profile. Please try again later."} 
                  onRetry={refetchSession}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return null
  }

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
            <PersonalTab useUpdateUser={useUpdateUser} user={user} />

            {/* Addresses Tab */}
            <AddressTab type="profile" user={user} setAddress={()=>{}} />

            {/* Security Tab */}
            <SecurityTab useUpdateUser={useUpdateUser} user={user} />
          </Tabs>
        </div>
      </main>
    </div>
  )
}


