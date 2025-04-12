import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertIdToName = (list: any[], id: string, attribute: string) => {
  // console.log(JSON.stringify(list, null, 2), 'list')
  // console.log(id, 'id')
  // console.log(attribute, 'attribute')
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
  return `http://${process.env.NEXT_PUBLIC_IMAGE_HOST}:${process.env.NEXT_PUBLIC_IMAGE_PORT}/${process.env.NEXT_PUBLIC_AVATAR_BUCKET}/${fileName}`
}