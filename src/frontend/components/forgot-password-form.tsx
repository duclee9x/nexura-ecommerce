"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { emailSchema, verificationSchema } from "@/app/forgot-password/forgotPasswordFormSchema"

import { useActionState } from "react"
import { handleSubmitEmailAction, handleSubmitVerificationAction } from "@/app/forgot-password/forgotPasswordSubmitAction"


type EmailFormValues = z.infer<typeof emailSchema>
type VerificationFormValues = z.infer<typeof verificationSchema>

export function ForgotPasswordForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"email" | "verification">("email")
  const [userEmail, setUserEmail] = useState("")
    
  // Email form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  // Verification form
  const {
    register: registerVerification,
    handleSubmit: handleSubmitVerification,
    formState: { errors: verificationErrors },
  } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  })


  const [stateSubmitEmail, formActionSubmitEmail] = useActionState(handleSubmitEmailAction, {message: "", success: false})
  const [stateSubmitVerification, formActionSubmitVerification] = useActionState(handleSubmitVerificationAction, {message: "", success: false})
  async function onSubmitEmail(data: EmailFormValues) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API here
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) throw new Error("User not found");

      setUserEmail(data.email)
      setStep("verification")

      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${data.email}. Please check your inbox.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Forgot password error:", error)
      toast({
        title: "Error",
        description: "We couldn't find an account with that email address. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmitVerification(data: VerificationFormValues) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API here
      // const response = await fetch("/api/auth/verify-code", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: userEmail, code: data.code }),
      // });

      // if (!response.ok) throw new Error("Invalid verification code");

      toast({
        title: "Verification successful",
        description: "Your identity has been verified. You can now reset your password.",
        variant: "default",
      })

      // Redirect to reset password page with a token
      // In a real app, the API would return a token
      const mockToken = Buffer.from(`${userEmail}-${Date.now()}`).toString("base64")
      router.push(`/reset-password?token=${mockToken}`)
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Verification failed",
        description: "The verification code is invalid or has expired. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="space-y-6">
      {step === "email" ? (
        <form action={formActionSubmitEmail} ref={formRef} onSubmit={handleSubmitEmail(onSubmitEmail)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...registerEmail("email")}
              disabled={isLoading}
              className={emailErrors.email ? "border-status-error" : ""}
            />
            {emailErrors.email && <p className="text-sm text-status-error">{emailErrors.email.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full btn-primary text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending verification code...
              </>
            ) : (
              "Send verification code"
            )}
          </Button>
            
        </form>
      ) : (
        <form action={formActionSubmitVerification} onSubmit={handleSubmitVerification(onSubmitVerification)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="code">Verification code</Label>
              <button
                type="button"
                className="text-sm text-brand-primary hover:underline"
                onClick={() => setStep("email")}
                disabled={isLoading}
              >
                <ArrowLeft className="inline-block mr-1 h-3 w-3" />
                Back to email
              </button>
            </div>
            <Input
              id="code"
              type="text"
              placeholder="Enter the 6-digit code"
              {...registerVerification("code")}
              disabled={isLoading}
              className={verificationErrors.code ? "border-status-error" : ""}
            />
            {verificationErrors.code && <p className="text-sm text-status-error">{verificationErrors.code.message}</p>}
          </div>

          <div className="text-sm text-text-muted">
            <p>
              We sent a verification code to <span className="font-medium">{userEmail}</span>
            </p>
            <p className="mt-2">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-brand-primary hover:underline"
                onClick={() => {
                  toast({
                    title: "Code resent",
                    description: `We've sent a new verification code to ${userEmail}.`,
                    variant: "default",
                  })
                }}
                disabled={isLoading}
              >
                Resend code
              </button>
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify and continue"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

