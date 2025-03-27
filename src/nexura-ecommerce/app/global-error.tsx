"use client"

import { useEffect } from "react"
import { AlertOctagon, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log the error to an error reporting service
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-5">
                <AlertOctagon className="h-14 w-14 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">Critical Error</h1>
            <p className="text-muted-foreground mb-6">
              The application has encountered a critical error and cannot continue.
            </p>

            <div className="space-y-4">
              <p className="text-sm">
                We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
              </p>

              {error.digest && <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>}

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Button onClick={reset} className="w-full sm:w-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload Application
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => (window.location.href = "/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

