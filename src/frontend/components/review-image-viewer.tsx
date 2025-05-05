"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X } from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Review {
  id: number
  rating: number
  comment: string
  images?: string[]
  user: {
    name: string
    avatar: string
    date: string
  }
  likes: number
  verified: boolean
}

interface ReviewImageViewerProps {
  reviews: Review[]
  currentReviewIndex: number
  currentImageIndex: number
  isOpen: boolean
  onClose: () => void
  onReviewChange: (index: number) => void
  onImageChange: (index: number) => void
  formatDate: (date: string) => string
}

export function ReviewImageViewer({
  reviews,
  currentReviewIndex,
  currentImageIndex,
  isOpen,
  onClose,
  onReviewChange,
  onImageChange,
  formatDate,
}: ReviewImageViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const currentReview = reviews[currentReviewIndex]
  const currentImages = useMemo(() => currentReview?.images || [], [currentReview])

  const handlePrevImage = useCallback(() => {
    if (currentImages.length > 0) {
      onImageChange((currentImageIndex - 1 + currentImages.length) % currentImages.length)
    }
  }, [currentImages, currentImageIndex, onImageChange])

  const handleNextImage = useCallback(() => {
    if (currentImages.length > 0) {
      onImageChange((currentImageIndex + 1) % currentImages.length)
    }
  }, [currentImages, currentImageIndex, onImageChange])

  const handlePrevReview = useCallback(() => {
    const newIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length
    onReviewChange(newIndex)
    onImageChange(0) // Reset image index when changing reviews
  }, [currentReviewIndex, reviews, onReviewChange, onImageChange])

  const handleNextReview = useCallback(() => {
    const newIndex = (currentReviewIndex + 1) % reviews.length
    onReviewChange(newIndex)
    onImageChange(0) // Reset image index when changing reviews
  }, [currentReviewIndex, reviews, onReviewChange, onImageChange])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          handlePrevImage()
          break
        case "ArrowRight":
          handleNextImage()
          break
        case "ArrowUp":
          handlePrevReview()
          break
        case "ArrowDown":
          handleNextReview()
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, currentReviewIndex, currentImageIndex, onClose, handlePrevImage, handleNextImage, handlePrevReview, handleNextReview])

  if (!currentReview) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 h-full">
          {/* Image Section */}
          <div className="relative bg-black col-span-3 aspect-square md:aspect-auto">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
            {currentImages.length > 0 && (
              <>
                <NextImage
                  src={currentImages[currentImageIndex]}
                  alt={`Review image ${currentImageIndex + 1}`}
                  fill
                  className={cn(
                    "object-contain transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  onLoadingComplete={() => setIsLoading(false)}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-2 py-1 rounded-md text-sm">
                  {currentImageIndex + 1} / {currentImages.length}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Review Details Section */}
          <div className="p-6 overflow-y-auto">
            <div className="flex items-start gap-4 mb-4">
              <Avatar>
                <AvatarImage src={currentReview.user.avatar} />
                <AvatarFallback>{currentReview.user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{currentReview.user.name}</span>
                    {currentReview.verified && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= currentReview.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(currentReview.user.date)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6">{currentReview.comment}</p>

            {/* Review Navigation */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handlePrevReview}
              >
                <ChevronUp className="h-4 w-4" />
                Previous Review
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleNextReview}
              >
                Next Review
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 