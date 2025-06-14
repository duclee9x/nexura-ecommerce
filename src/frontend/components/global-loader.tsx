"use client"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export function GlobalLoader() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  const isLoading = isFetching + isMutating > 0
  if (!isLoading) return null
  return (
    <div className="fixed top-8 right-4 z-[9999]">
      <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  )
} 