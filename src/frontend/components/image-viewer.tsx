"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

interface ImageViewerProps {
    images: string[]
    currentIndex: number
    isOpen: boolean
    onClose: () => void
    onIndexChange: (index: number) => void
}

export function ImageViewer({
    images,
    currentIndex,
    isOpen,
    onClose,
    onIndexChange,
}: ImageViewerProps) {
    const [isLoading, setIsLoading] = useState(true)

    const handlePrev = useCallback(() => {
        onIndexChange((currentIndex - 1 + images.length) % images.length)
    }, [currentIndex, images, onIndexChange])

    const handleNext = useCallback(() => {
        onIndexChange((currentIndex + 1) % images.length)
    }, [currentIndex, images, onIndexChange])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            } else if (e.key === "ArrowLeft") {
                handlePrev()
            } else if (e.key === "ArrowRight") {
                handleNext()
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
    }, [isOpen, currentIndex, onClose, handlePrev, handleNext])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none">
                <div className="relative w-full h-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div className="relative w-full h-full min-h-[80vh]">
                        <NextImage
                            src={images.length > 0 ? images[currentIndex] : "/no-image-placeholder.webp"}
                            alt={`Product image ${currentIndex + 1}`}
                            fill
                            className={cn(
                                "object-contain transition-opacity duration-300",
                                isLoading ? "opacity-0" : "opacity-100"
                            )}
                            priority
                            onLoadingComplete={() => setIsLoading(false)}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 