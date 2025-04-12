"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Cropper from "react-easy-crop"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { getCroppedImg } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface AvatarCropperModalProps {
  image: string | null
  isOpen: boolean
  onClose: () => void
  onSave: (croppedImage: File) => void
}

export function AvatarCropperModal({ image, isOpen, onClose, onSave }: AvatarCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const isGeneratingRef = useRef(false)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const generateCroppedImage = useCallback(async () => {
    if (!image || !croppedAreaPixels || isGeneratingRef.current) return

    isGeneratingRef.current = true
    setIsGenerating(true)
    
    try {
      const file = await getCroppedImg(image, croppedAreaPixels)
      const imageUrl = URL.createObjectURL(file)
      setCroppedImage(imageUrl)
      setCroppedFile(file)
    } catch (e) {
      console.error("Error generating cropped image:", e)
    } finally {
      isGeneratingRef.current = false
      setIsGenerating(false)
    }
  }, [image, croppedAreaPixels])

  useEffect(() => {
    if (croppedAreaPixels && !isGeneratingRef.current) {
      generateCroppedImage()
    }
  }, [croppedAreaPixels, generateCroppedImage])

  const handleSave = () => {
    if (croppedFile) {
      onSave(croppedFile)
      onClose()
    }
  }

  useEffect(() => {
    return () => {
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage)
      }
    }
  }, [croppedImage])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Crop and Resize Avatar</DialogTitle>
          <DialogDescription>Adjust the crop area and zoom level to create your perfect avatar.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {image && (
            <div className="space-y-2">
              <Label>Original Image:</Label>
              <div className="relative aspect-square rounded-md overflow-hidden">
                <div className="relative aspect-square rounded-md overflow-hidden">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                      containerStyle: {
                        width: "100%",
                        height: "250px",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label>Cropped Image:</Label>
            <div className="relative aspect-square rounded-full overflow-hidden border">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <img
                  src={croppedImage || "/placeholder.svg"}
                  alt="Cropped Avatar"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <Label>Zoom:</Label>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
            className="w-full"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSave} 
            disabled={!croppedFile || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Save Avatar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

