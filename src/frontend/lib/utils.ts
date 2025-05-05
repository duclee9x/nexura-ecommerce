import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import type { OrderStatus, PaymentStatus, ProductVariant } from "@nexura/grpc_gateway/protos"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const mapStatus = (status: OrderStatus | PaymentStatus) => {
  return status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
}

export const getStatusBadgeColor = (status: OrderStatus) => {
  switch (status) {
    case "ORDER_COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "ORDER_PROCESSING":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "ORDER_SHIPPED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "ORDER_CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "ORDER_PENDING":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    case "ORDER_PAYMENT_PAID":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}
export const getStockStatus = (selectedVariant: ProductVariant) => {
  if (!selectedVariant || typeof selectedVariant.stock?.quantity !== 'number') {
    return { status: "Out of Stock", color: "destructive", stock: 0 };
  }
  const currentStock = selectedVariant.stock.quantity;
  const lowThreshold = typeof selectedVariant.lowStockThreshold === 'number' ? selectedVariant.lowStockThreshold : 5;
  if (currentStock <= 0) {
    return { status: "Out of Stock", color: "destructive", stock: 0 };
  }
  if (currentStock <= lowThreshold) {
    return { status: `Low Stock (${currentStock} left)`, color: "warning", stock: currentStock };
  }
  return { status: `In Stock (${currentStock} left)`, color: "success", stock: currentStock };
}
// Get payment status badge color
export const getPaymentStatusBadgeColor = (status: PaymentStatus) => {
  switch (status) {
    case "PAYMENT_PAID":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "PAYMENT_PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "PAYMENT_FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "PAYMENT_CANCELLED":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    case "PAYMENT_REFUNDED":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}
export const convertIdToName = (list: any[], id: string, attribute: string) => {
  const item = list.find((item) => item.id.toString() === id)
  return item?.[attribute]
}
export const generateAvatar = (name: string) => {
  const avatar = createAvatar(initials, {
      seed: name[0],
      size: 100,
  });
  return avatar.toDataUri();
}

export async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<File> {
  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Could not obtain canvas context")
  }

  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => {
    image.onload = resolve
  })

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" })
        resolve(file)
      } else {
        reject(new Error("Failed to create blob"))
      }
    }, "image/jpeg", 1)
  })
}


export const getAvatarUrl = (fileName: string) => {
  return `http://${process.env.NEXT_PUBLIC_IMAGE_HOST}/${process.env.NEXT_PUBLIC_AVATAR_BUCKET}/${fileName}`
}

export const getProductUrl = (fileName: string) => {
  return `http://${process.env.NEXT_PUBLIC_IMAGE_HOST}/${process.env.NEXT_PUBLIC_PRODUCT_BUCKET}/${fileName}`
}