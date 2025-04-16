import ImageKit from "imagekit"
import type { UploadResponse } from "imagekit/dist/libs/interfaces"

// Initialize ImageKit
export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
})

// Generate authentication parameters for client-side uploads
export const getImageKitAuth = () => {
  const timestamp = Math.floor(Date.now() / 1000)
  const signature = imagekit.getAuthenticationParameters(timestamp.toString())
  return {
    ...signature,
    timestamp,
  }
}

// Upload file to ImageKit
export const uploadToImageKit = async (file: File, folder: string = "products"): Promise<{ url: string; fileId: string }> => {
  try {
    // Convert File to base64 string
    const base64String = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = reader.result.split(',')[1]
          resolve(base64)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = () => reject(reader.error)
    })

    const response = await imagekit.upload({
      file: base64String,
      fileName: `${Date.now()}-${file.name}`,
      folder: folder,
      useUniqueFileName: true,
    }) as UploadResponse

    return {
      url: response.url,
      fileId: response.fileId,
    }
  } catch (error) {
    console.error("Error uploading to ImageKit:", error)
    throw error
  }
}

// Delete file from ImageKit
export const deleteFromImageKit = async (fileId: string): Promise<void> => {
  try {
    await imagekit.deleteFile(fileId)
  } catch (error) {
    console.error("Error deleting from ImageKit:", error)
    throw error
  }
} 