"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class VerifyEmailErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="text-center space-y-4">
          <div className="text-error text-4xl">⚠️</div>
          <h1 className="text-2xl font-semibold text-text-base">Something went wrong</h1>
          <p className="text-text-muted">
            We encountered an error while verifying your email. Please try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full btn-primary"
          >
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
} 