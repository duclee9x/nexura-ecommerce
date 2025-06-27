"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BannerSlide {
  title: string
  tag: string
  backgroundImage: string
  href: string
}

interface BannerCarouselProps {
  slides: BannerSlide[]
  autoPlay?: boolean
  showDots?: boolean
  showArrows?: boolean
}

export function BannerCarousel({
  slides,
  autoPlay = true,
  showDots = true,
  showArrows = true,
}: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay || isDragging) return
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, isDragging, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Only show arrows if there are multiple slides
  const shouldShowArrows = showArrows && slides.length > 1
  const shouldShowDots = showDots && slides.length > 1

  return (
    <section className="relative h-[70vh] overflow-hidden bg-[#f5f5f0]">
      <div
        ref={constraintsRef}
        className="relative w-full h-full"
        onMouseEnter={() => {
          setIsDragging(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }}
        onMouseLeave={() => {
          setIsDragging(false)
        }}
      >
        <motion.div
          className="flex h-full"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.8,
          }}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          onDragStart={() => {
            setIsDragging(true)
            if (intervalRef.current) clearInterval(intervalRef.current)
          }}
          onDragEnd={(event, info) => {
            setIsDragging(false)
            const threshold = 50
            if (info.offset.x > threshold && currentSlide > 0) {
              prevSlide()
            } else if (info.offset.x < -threshold && currentSlide < slides.length - 1) {
              nextSlide()
            }
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative flex items-center">
              <div className="absolute inset-0">
                <Image
                  src={slide.backgroundImage || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      x: index === currentSlide ? 0 : -50,
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Tag */}
                    <div className="inline-block bg-white/90 px-4 py-2">
                      <span className="text-sm font-medium text-gray-800 tracking-wider">
                        {slide.tag}
                      </span>
                    </div>
                    <br />
                    <br />
                    <br />
                    {/* Title */}
                    <Link href={slide.href || '#'}>
                    <h1 className="text-4xl lg:text-6xl font-light text-white tracking-wider drop-shadow-lg">
                      {slide.title}
                    </h1>
                    </Link>
                    <br />
                    <br />
                    <br />
                  
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {shouldShowArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {shouldShowDots && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </section>
  )
}
