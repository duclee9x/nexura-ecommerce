"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FullscreenImageViewerProps {
  images:       string[]
  initialIndex: number
  isOpen:       boolean
  onClose:      () => void
}

export function FullscreenImageViewer({ images, initialIndex, isOpen, onClose }: FullscreenImageViewerProps) {
  const [ currentIndex, setCurrentIndex ] = useState(initialIndex)

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowLeft":
          setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
          break
        case "ArrowRight":
          setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
          break
        case "Escape":
          onClose()
          break
      }
    },
    [
      isOpen, images.length, onClose
    ],
  )

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  // Reset current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Prevent scrolling when viewer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Previous button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 text-white hover:bg-white/20 h-12 w-12"
          onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Image */}
        <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Product image ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 text-white hover:bg-white/20 h-12 w-12"
          onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}

