"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, X, Star, StarOff } from "lucide-react"
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

export interface ProductImage {
  id: string
  url: string
  isMain: boolean
  blurhash: string
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
      className={`relative aspect-square border rounded-md overflow-hidden ${image.isMain ? "ring-2 ring-primary" : ""
        }`}
    >
      <div {...listeners} className="absolute inset-0 cursor-move" />
      <NextImage src={getProductUrl(image.url)} alt="Product image" fill objectFit="contain"   style={{ pointerEvents: "none" }}
 />
      <div className="absolute top-1 right-1 flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 text-white hover:bg-black/80 h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onSetMain(image.id)
          }}
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
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

export function ImageGallery({ images, onChange }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  console.log(images, "image gallery")

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

    const newImages: ProductImage[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const imageUrl = URL.createObjectURL(file)

      // Create a canvas to get image data for blurhash
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      await new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)
          resolve(null)
        }
        img.src = imageUrl
      })

      // Get image data and encode to blurhash
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      const blurhash = imageData ? encode(imageData.data, imageData.width, imageData.height, 4, 4) : ''

      // Get presigned URL for upload
      const id = `img-${Date.now()}-${i}`
      const fileName = `${id}.jpg`
      const response = await fetch(`/api/presignedPut?name=${fileName}&bucket=products`)

      if (!response.ok) {
        throw new Error("Failed to get upload URL")
      }
      const { urls } = await response.json()
      console.log(urls, "urls")
      if (!urls?.length) {
        throw new Error("Invalid upload URL received")
      }

      // Upload image to S3
      await fetch(urls[0], {
        method: 'PUT',
        body: file,
      })

      newImages.push({
        id,
        url: fileName, // Use the returned path directly
        isMain: images.length === 0 && i === 0, // First image is main by default
        blurhash: blurhash
      })
    }

    const updatedImages = [...images, ...newImages]
    onChange(updatedImages)

    if (images.length === 0) {
      setCurrentImageIndex(0)
    }

    toast({
      title: "Images Added",
      description: `${newImages.length} image(s) have been added to the gallery.`,
    })
  }

  const handleRemoveImage = (id: string) => {
    const index = images.findIndex((img) => img.id === id)
    const isMain = images[index].isMain
    const newImages = images.filter((img) => img.id !== id)
    toast({
      title: "Images Removed",
      description: `${newImages.length} image(s) have been removed from the gallery.`,
    })
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
            <NextImage
              src={getProductUrl(images[currentImageIndex]?.url || "")}
              width={500}
              height={500}
              objectFit="contain"
              // placeholder="blur"
              // blurDataURL={images[currentImageIndex]?.blurhash}
              alt={`Product image ${currentImageIndex + 1}`}
              className="object-contain max-h-full max-w-full"
            />
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
