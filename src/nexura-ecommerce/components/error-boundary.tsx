"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ForbiddenPage from "@/app/forbidden"
import type { AppError } from "@/types/schema"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<AppError | null>(null)
  const [errorType, setErrorType] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught error:", event.error)

      // Check if it's a 403 error
      if (
        event.error?.message?.includes("403") ||
        event.error?.message?.toLowerCase().includes("forbidden") ||
        event.error?.message?.toLowerCase().includes("permission denied")
      ) {
        setErrorType("forbidden")
      } else if (event.error?.message?.includes("useCart must be used within a CartProvider")) {
        // Handle cart context errors
        console.error("Cart context error detected, attempting recovery")
        setErrorType("cart")

        // Try to recover by refreshing the page
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setErrorType("unknown")
      }

      // Create an AppError with additional details
      const appError: AppError = new Error(event.error?.message || "An unknown error occurred")
      appError.name = event.error?.name || "Error"
      appError.stack = event.error?.stack

      if (event.error?.statusCode) {
        appError.statusCode = event.error.statusCode
      } else if (errorType === "forbidden") {
        appError.statusCode = 403
      }

      setError(appError)
      event.preventDefault()
    }

    window.addEventListener("error", handleError)

    // Also handle unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason)

      const appError: AppError = new Error(event.reason?.message || "An unhandled promise rejection occurred")
      appError.name = event.reason?.name || "PromiseRejectionError"
      appError.stack = event.reason?.stack

      setError(appError)
      setErrorType("unknown")
      event.preventDefault()
    }

    window.addEventListener("unhandledrejection", handleRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [router, errorType])

  if (errorType === "forbidden") {
    return <ForbiddenPage />
  }

  if (errorType === "cart") {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Restoring your shopping experience</h1>
        <p className="mt-2">Please wait while we refresh your cart...</p>
        <div className="mt-4 w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse" style={{ width: "100%" }}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
        <p className="mt-2">{error.message || "An unexpected error occurred"}</p>
        {error.statusCode && <p className="text-sm text-muted-foreground mt-1">Error code: {error.statusCode}</p>}
        <button
          onClick={() => {
            setError(null)
            setErrorType(null)
          }}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Try again
        </button>
      </div>
    )
  }

  return <>{children}</>
}

