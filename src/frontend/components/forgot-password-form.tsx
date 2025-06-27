"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { emailSchema, verificationSchema } from "@/app/reset-password/resetPasswordFormSchema"

import { useActionState } from "react"
import { handleSubmitEmailAction, handleSubmitVerificationAction } from "@/app/reset-password/resetPasswordSubmitAction"
import UserHooks from "@/hooks/user-hooks"


type EmailFormValues = z.infer<typeof emailSchema>
type VerificationFormValues = z.infer<typeof verificationSchema>

export function ForgotPasswordForm() {
  const { useForgotPassword, useValidateOTP } = UserHooks()
  const { mutateAsync: forgotPassword } = useForgotPassword
  const { mutateAsync: validateOTP } = useValidateOTP
  const router = useRouter()
  const { toast } = useToast()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ step, setStep ] = useState<"email" | "verification">("email")
  const [ userEmail, setUserEmail ] = useState("")
  const [ lastEmailSent, setLastEmailSent ] = useState<Date | null>(null)
  const [ cooldownRemaining, setCooldownRemaining ] = useState<number>(0)
    
  // Email form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>({
    resolver:      zodResolver(emailSchema),
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
    resolver:      zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  })

  // Cooldown timer effect
  useEffect(() => {
    if (!lastEmailSent) return

    const interval = setInterval(() => {
      const now = new Date()
      const diffSeconds = Math.floor((now.getTime() - lastEmailSent.getTime()) / 1000)
      const remainingSeconds = Math.max(0, 60 - diffSeconds)
      
      setCooldownRemaining(remainingSeconds)
      
      if (remainingSeconds === 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lastEmailSent])

  const [ stateSubmitEmail, formActionSubmitEmail ] = useActionState(handleSubmitEmailAction, {message: "", success: false})
  const [ stateSubmitVerification, formActionSubmitVerification ] = useActionState(handleSubmitVerificationAction, {message: "", success: false})

  async function onSubmitEmail(data: EmailFormValues) {
    setIsLoading(true)

    try {
      const { success, message } = await forgotPassword(data.email)
      console.log(success, message)
      if (!success) {
        throw new Error(message)
      }
      setUserEmail(data.email)
      setLastEmailSent(new Date())
      setStep("verification")

      toast({
        title:       "Verification code sent",
        description: `We've sent a verification code to ${data.email}. Please check your inbox.`,
        variant:     "default",
      })
    } catch (error) {
      console.error("Forgot password error:", error)
      toast({
        title:       "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant:     "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmitVerification(data: VerificationFormValues) {
    setIsLoading(true)

    try {
      const { success, message, resetToken } = await validateOTP({ email: userEmail, otp: data.code })
      if (!success) {
        throw new Error(message)
      }
      toast({
        title:       "Verification successful",
        description: "Your identity has been verified. You can now reset your password.",
        variant:     "default",
      })

      router.push(`/reset-password?token=${resetToken}&email=${userEmail}`)
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title:       "Verification failed",
        description: "The verification code is invalid or has expired. Please try again.",
        variant:     "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (cooldownRemaining > 0) return

    setIsLoading(true)
    try {
      const { success, message } = await forgotPassword(userEmail)
      if (!success) {
        throw new Error(message)
      }
      setLastEmailSent(new Date())
      toast({
        title:       "Code resent",
        description: `We've sent a new verification code to ${userEmail}.`,
        variant:     "default",
      })
    } catch (error) {
      console.error("Resend code error:", error)
      toast({
        title:       "Error",
        description: "Failed to resend the verification code. Please try again.",
        variant:     "destructive",
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
                className={`text-brand-primary hover:underline ${cooldownRemaining > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleResendCode}
                disabled={isLoading || cooldownRemaining > 0}
              >
                {cooldownRemaining > 0 ? `Resend code (${cooldownRemaining}s)` : 'Resend code'}
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

