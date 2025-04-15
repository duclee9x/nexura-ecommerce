"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, X, Star, StarOff, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import NextImage from "next/image"
import { getProductUrl } from "@/lib/utils"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { encode } from "blurhash"
import { useToast } from "@/hooks/use-toast"
import path from "path"
import { ObjectId } from 'bson'

export interface ProductImage {
  id: string
  url: string
  isMain: boolean
  blurhash: string
  isUploading?: boolean
  uploadProgress?: number
}

interface ImageGalleryProps {
  images: ProductImage[]
  onChange: (images: ProductImage[]) => void
}

const SortableImage = ({
  image,
  onRemove,
  onSetMain,
}: {
  image: ProductImage
  onRemove: (id: string) => void
  onSetMain: (id: string) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative aspect-square border rounded-md overflow-hidden ${
        image.isMain ? "ring-2 ring-primary" : ""
      }`}
    >
      <div {...listeners} className="absolute inset-0 cursor-move" />
      <NextImage 
        src={getProductUrl(image.url)} 
        alt="Product image" 
        fill 
        objectFit="contain" 
        style={{ pointerEvents: "none" }}
      />
      
      {image.isUploading && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-white mb-2" />
          {image.uploadProgress !== undefined && (
            <div className="text-white text-xs">
              {Math.round(image.uploadProgress)}%
            </div>
          )}
        </div>
      )}

      <div className="absolute top-1 right-1 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/80 h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onSetMain(image.id)
          }}
          disabled={image.isUploading}
          title={image.isMain ? "Main image" : "Set as main image"}
        >
          {image.isMain ? <Star className="h-3 w-3 text-yellow-400" /> : <StarOff className="h-3 w-3" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/80 h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(image.id)
          }}
          disabled={image.isUploading}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

const generateBlurhash = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 32  // Reduced size for faster processing
      canvas.height = (img.height * 32) / img.width
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        requestIdleCallback(() => {
          const hash = encode(imageData.data, imageData.width, imageData.height, 4, 4)
          resolve(hash)
        })
      } else {
        resolve('')
      }
    }
    img.onerror = () => resolve('')
    img.src = imageUrl
  })
}

export function ImageGallery({ images, onChange }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()
  const [uploadingFiles, setUploadingFiles] = useState<{ id: string; progress: number }[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id)
      const newIndex = images.findIndex((img) => img.id === over.id)

      const newImages = arrayMove(images, oldIndex, newIndex)
      onChange(newImages)

      // Update current image index if we're viewing the dragged image
      if (currentImageIndex === oldIndex) {
        setCurrentImageIndex(newIndex)
      } else if (currentImageIndex === newIndex) {
        setCurrentImageIndex(oldIndex)
      }
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Create temporary images with loading states
    const newUploads = Array.from(files).map(file => {
      const tempId = new ObjectId().toString()
      const tempUrl = URL.createObjectURL(file)
      return { file, tempUrl, id: tempId }
    })

    // Add temporary images to the gallery immediately
    const tempImages: ProductImage[] = newUploads.map(({ tempUrl, id }) => ({
      id,
      url: tempUrl,
      isMain: images.length === 0,
      blurhash: '',
      isUploading: true,
      uploadProgress: 0
    }))

    // Keep track of the current state of images
    let currentImages = [...images, ...tempImages]
    onChange(currentImages)
    setUploadingFiles(prev => [...prev, ...newUploads.map(upload => ({ id: upload.id, progress: 0 }))])

    // Upload each file
    for (const upload of newUploads) {
      try {
        const formData = new FormData()
        formData.append('files', upload.file)

        const response = await fetch('/api/presignedPut', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const result = await response.json()
        if (!result.success || !result.results?.[0]) {
          throw new Error(result.error || 'Upload failed')
        }

        // Since we're uploading one file at a time, use the first result
        const uploadedFile = result.results[0]

        // Update image with final URL while preserving the rest of the images
        currentImages = currentImages.map(img => 
          img.id === upload.id 
            ? { 
                ...img, 
                url: uploadedFile.url,
                isUploading: false,
                uploadProgress: undefined
              }
            : img
        )
        
        onChange(currentImages)

        // Clean up
        URL.revokeObjectURL(upload.tempUrl)
        setUploadingFiles(prev => prev.filter(f => f.id !== upload.id))

      } catch (error) {
        console.error('Error uploading image:', error)
        // Remove failed image while preserving other images
        currentImages = currentImages.filter(img => img.id !== upload.id)
        onChange(currentImages)
        setUploadingFiles(prev => prev.filter(f => f.id !== upload.id))
        toast({
          title: "Upload Failed",
          description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
          variant: "destructive",
        })
      }
    }

    // Reset input
    e.target.value = ""
  }

  const handleRemoveImage = (id: string) => {
    const index = images.findIndex((img) => img.id === id)
    const isMain = images[index].isMain
    const newImages = images.filter((img) => img.id !== id)
    
    // If we removed the main image, set the first image as main
    if (isMain && newImages.length > 0) {
      newImages[0].isMain = true
    }

    onChange(newImages)
    // Update current image index
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1))
    }
  }

  const handleSetMainImage = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isMain: img.id === id,
    }))

    onChange(updatedImages)

    // Set current image to the main one
    const mainIndex = updatedImages.findIndex((img) => img.id === id)
    setCurrentImageIndex(mainIndex)

    toast({
      title: "Main Image Updated",
      description: "The main product image has been updated.",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="border rounded-md aspect-square overflow-hidden bg-muted/50 flex items-center justify-center">
          {images.length > 0 ? (
            <div className="relative w-full h-full">
              <NextImage
                src={getProductUrl(images[currentImageIndex]?.url || "")}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                alt={`Product image ${currentImageIndex + 1}`}
              />
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No images uploaded</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="w-full">
            <label htmlFor="gallery-image-upload" className="cursor-pointer w-full">
              Upload Images
            </label>
            <Input
              type="file"
              id="gallery-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Image Gallery</h4>
          <p className="text-xs text-muted-foreground">Drag to reorder</p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  onRemove={handleRemoveImage}
                  onSetMain={handleSetMainImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="text-sm text-muted-foreground">
          <p>Click the star icon to set an image as the main product image.</p>
          <p>Recommended image size: 1000x1000px</p>
        </div>
      </div>
    </div>
  )
}
