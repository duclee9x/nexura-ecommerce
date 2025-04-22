import Link from "next/link"
import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/forgot-password-form"


export default function ForgotPasswordPage() {
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold tracking-tight">Reset your password</h2>
          <p className="mt-2 text-sm text-text-muted">
            Enter your email address and we'll send you a code to reset your password
          </p>
        </div>

        <ForgotPasswordForm />

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

