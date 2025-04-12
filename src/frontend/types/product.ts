import type { ID } from "./schema"

// Base entity with common fields
export interface BaseEntity {
  id: ID
  createdAt?: Date
  updatedAt?: Date
}

// Product attribute value
export interface AttributeValue extends BaseEntity {
  name: string
  slug: string
  color?: string // For color attributes
  image?: string // For attributes that need visual representation
  displayOrder: number
}

// Product attribute
export interface ProductAttribute extends BaseEntity {
  name: string
  slug: string
  type: "text" | "number" | "boolean" | "select" | "color"
  description?: string
  required: boolean
  visible: boolean
  filterable: boolean
  searchable: boolean
  variantable: boolean // Whether this attribute can be used to generate variants
  displayOrder: number
  values: AttributeValue[]
}

// Product variant
export interface ProductVariant extends BaseEntity {
  productId: ID
  sku: string
  barcode?: string
  price: number
  compareAtPrice?: number
  cost?: number
  inventory: number
  lowStockThreshold?: number
  weight?: number
  attributeValues: {
    attributeId: ID
    valueId: ID
  }[]
  images: {
    id: ID
    url: string
    isMain?: boolean
  }[]
  isDefault: boolean
  status: "active" | "inactive"
}

// Product
export interface Product extends BaseEntity {
  name: string
  slug: string
  description: string
  costPrice: number
  basePrice: number
  minPrice?: number
  maxPrice?: number
  sku: string
  barcode?: string
  categories: ID[]
  tags: string[]
  images: {
    id: ID
    url: string
    isMain?: boolean
  }[]
  attributes: ID[] // References to ProductAttribute
  variants: ProductVariant[]
  brandId?: ID
  featured: boolean
  status: "draft" | "published" | "archived"
  dimensions?: {
    length: number
    width: number
    height: number
    weight: number
  }
  seo: {
    title: string
    description: string
    keywords: string
  }
  taxable: boolean
  shippable: boolean
}
