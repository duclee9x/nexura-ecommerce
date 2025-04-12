'use client'
 
export default function myImageLoader({ src, width, quality=90 }: { src: string, width: number, quality: number }) {
  return `http://${process.env.NEXT_PUBLIC_IMAGE_PROXY_HOST}:${process.env.NEXT_PUBLIC_IMAGE_PROXY_PORT}/${width}x,q${quality}/${src}`
}