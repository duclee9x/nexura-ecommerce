"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { X, ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  currentImage?: string
  onImageSelected: (imageUrl: string) => void
}

export function ImageUploader({ currentImage, onImageSelected }: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload")
  const [imageUrl, setImageUrl] = useState(currentImage || "")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Sample images for gallery
  const galleryImages = [
    "/placeholder.svg?height=600&width=1200&text=Sample+Image+1",
    "/placeholder.svg?height=600&width=1200&text=Sample+Image+2",
    "/placeholder.svg?height=600&width=1200&text=Sample+Image+3",
    "/placeholder.svg?height=600&width=1200&text=Sample+Image+4",
    "/placeholder.svg?height=600&width=1200&text=Sample+Image+5",
    "/placeholder.svg?height=600&width=1200&text=Sample+Image+6",
  ]

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      // In a real app, you would upload the file to a server here
      // For this demo, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
      onImageSelected(imageUrl)
      setIsUploading(false)

      toast({
        title: "Image Uploaded",
        description: "Your image has been uploaded successfully.",
      })
    }, 1500)
  }

  // Handle URL input
  const handleUrlSubmit = () => {
    if (!imageUrl) return

    // Basic URL validation
    try {
      new URL(imageUrl)
      onImageSelected(imageUrl)

      toast({
        title: "Image Added",
        description: "Your image URL has been added successfully.",
      })
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive",
      })
    }
  }

  // Handle gallery image selection
  const handleGallerySelect = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    onImageSelected(imageUrl)

    toast({
      title: "Image Selected",
      description: "Gallery image has been selected.",
    })
  }

  // Handle image removal
  const handleRemoveImage = () => {
    setUploadedImage(null)
    setImageUrl("")
    onImageSelected("")

    toast({
      title: "Image Removed",
      description: "The featured image has been removed.",
    })
  }

  return (
    <div className="space-y-4">
      {(currentImage || uploadedImage) && (
        <div className="relative aspect-video rounded-md overflow-hidden border">
          <Image
            src={uploadedImage || currentImage || "/placeholder.svg"}
            alt="Featured image"
            fill
            className="object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "upload" | "url")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="url">Image URL</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image-upload">Upload Image</Label>
            <div className="flex items-center gap-2">
              <Input id="image-upload" type="file" accept="image/*" onChange={handleFileUpload} className="flex-1" />
              {isUploading && <div className="animate-spin">⏳</div>}
            </div>
            <p className="text-xs text-muted-foreground">Maximum file size: 5MB. Supported formats: JPEG, PNG, GIF.</p>
          </div>

          <div className="space-y-2">
            <Label>Media Gallery</Label>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video relative rounded-md overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleGallerySelect(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="image-url">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleUrlSubmit} disabled={!imageUrl}>
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Enter the URL of an image from the web.</p>
          </div>
        </TabsContent>
      </Tabs>

      {!currentImage && !uploadedImage && (
        <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground">
          <ImageIcon className="h-8 w-8 mb-2" />
          <p className="text-sm">No featured image selected</p>
          <p className="text-xs">Upload an image or provide a URL</p>
        </div>
      )}
    </div>
  )
}

