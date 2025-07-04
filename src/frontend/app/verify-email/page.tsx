"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserHooks from "@/hooks/user-hooks"
export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [ status, setStatus ] = useState<"loading" | "success" | "error">("loading")
  const [ message, setMessage ] = useState("")
  const [ isPending, setIsPending ] = useState(false)

  const {useVerifyEmailApi} = UserHooks()

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error")
        setMessage("Invalid verification link")
        return
      }

      setIsPending(true)
      try {
        const response = await useVerifyEmailApi.mutateAsync(token) 
        if (response.success) {
          setStatus("success")
          setMessage("Email verified successfully! You can now log in.")
        } else {
          setStatus("error")
          setMessage(response.message || "Failed to verify email")
        }
      } catch (error) {
        setStatus("error")
        setMessage(error instanceof Error ? error.message : "An error occurred while verifying your email")
      } finally {
        setIsPending(false)
      }
    }

    verify()
  }, [token])

  return (
    <div className="container max-w-lg mx-auto px-4 py-8">
      <div className="bg-card rounded-lg shadow-lg p-6">
        {isPending ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-text-base">Verifying your email...</p>
          </div>
        ) : (    
          <>
            {status === "success" && (
              <div className="text-center space-y-4">
                <div className="text-success text-4xl">✓</div>
                <h1 className="text-2xl font-semibold text-text-base">Email Verified!</h1>
                <p className="text-text-muted">{message}</p>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full btn-primary"
                >
                  Go to Login
                </Button>
              </div>
            )}
            {status === "error" && (
              <div className="text-center space-y-4">
                <div className="text-error text-4xl">✕</div>
                <h1 className="text-2xl font-semibold text-text-base">Verification Failed</h1>
                <p className="text-text-muted">{message}</p>
                <Button
                  onClick={() => router.push("/register")}
                  className="w-full btn-primary"
                >
                  Back to Registration
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 