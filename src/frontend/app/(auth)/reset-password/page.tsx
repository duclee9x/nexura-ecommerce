"use client"

import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useReducer, useState, useEffect } from "react"
import { RefreshCw, Loader2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { handleSubmitResetPasswordAction } from "../forgot-password/forgotPasswordSubmitAction"
import { useActionState } from "react"

type PasswordState = {
  hasChangedPassword: boolean
  password: string
  confirmPassword: string
  token: string
  email: string
}

type PasswordStateAction = 
  | { type: 'SET_PASSWORD'; password: string }
  | { type: 'SET_CONFIRM_PASSWORD'; confirmPassword: string }
  | { type: 'SET_TOKEN_EMAIL'; token: string; email: string }
  | { type: 'SET_PASSWORDS'; password: string; confirmPassword: string }

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tokenStatus, setTokenStatus] = useState<"loading" | "valid" | "invalid">("loading")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [passwordState, setPasswordState] = useReducer((state: PasswordState, action: PasswordStateAction) => {
    switch (action.type) {
      case 'SET_PASSWORD':
        return { ...state, password: action.password }
      case 'SET_CONFIRM_PASSWORD':
        return { ...state, confirmPassword: action.confirmPassword }
      case 'SET_TOKEN_EMAIL':
        return { ...state, token: action.token, email: action.email }
      case 'SET_PASSWORDS':
        return { ...state, password: action.password, confirmPassword: action.confirmPassword }
      default:
        return state
    }
  }, {
    hasChangedPassword: false,
    password: "",
    confirmPassword: "",
    token: "",
    email: "",
  })

  const [state, formAction] = useActionState(handleSubmitResetPasswordAction, {message: "", success: false})

  useEffect(() => {
    const token = searchParams.get("token")
    const email = searchParams.get("email")
    if (!token || !email) {
      setTokenStatus("invalid")
      return
    }
    setPasswordState({ type: 'SET_TOKEN_EMAIL', token, email })
    setTokenStatus("valid")
  }, [searchParams])

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPasswordState({ type: 'SET_PASSWORDS', password, confirmPassword: password })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('password', passwordState.password)
      formData.append('confirmPassword', passwordState.confirmPassword)
      formData.append('token', passwordState.token)
      formData.append('email', passwordState.email)

      const result = await handleSubmitResetPasswordAction(state, formData)
      
      if (result.success) {
        toast({
          title: "Password reset successful",
          description: "Your password has been reset successfully. Please login with your new password.",
          variant: "default",
        })
        router.push("/login")
      } else {
        toast({
          title: "Password reset failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while resetting your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (tokenStatus === "invalid") {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="w-full max-w-lg space-y-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-status-error">Invalid or Expired Token</h2>
          <p className="text-text-muted">
            The password reset link is invalid or has expired. Please request a new password reset link.
          </p>
          <Button onClick={() => router.push("/forgot-password")}>
            Request New Reset Link
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold tracking-tight">Reset your password</h2>
          <p className="mt-2 text-sm text-text-muted">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={passwordState.password}
                  onChange={(e) => setPasswordState({ type: 'SET_PASSWORD', password: e.target.value })}
                  placeholder="Enter your new password"
                  required
                  minLength={8}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordState.confirmPassword}
                  onChange={(e) => setPasswordState({ type: 'SET_CONFIRM_PASSWORD', confirmPassword: e.target.value })}
                  placeholder="Confirm your new password"
                  required
                  minLength={8}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 text-muted-foreground" />
              <Button
                variant="ghost"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={generateRandomPassword}
                type="button"
              >
                Generate random password
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-text-base">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-brand-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

