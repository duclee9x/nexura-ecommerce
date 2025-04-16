import { z } from 'zod'

export const ProductStatus = z.enum(['DRAFT', 'ACTIVE', 'INACTIVE', 'DISCONTINUED'])
export const VariantStatus = z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'DISCONTINUED'])

export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  brandId: z.string(),
  categoryId: z.string(),
  basePrice: z.number().positive(),
  salePrice: z.number().positive().optional(),
  status: ProductStatus.optional(),
})

export const updateProductSchema = createProductSchema.partial()

export const createVariantSchema = z.object({
  productId: z.string(),
  sku: z.string().min(1),
  barcode: z.string().optional(),
  colorId: z.string().optional(),
  sizeId: z.string().optional(),
  materialId: z.string().optional(),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  stockLevel: z.number().int().nonnegative(),
  status: VariantStatus.optional(),
})

export const updateVariantSchema = createVariantSchema.partial()

export const createBrandSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  logo: z.string().url().optional(),
})

export const updateBrandSchema = createBrandSchema.partial()

export const createCategorySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  parentId: z.string().optional(),
})

export const updateCategorySchema = createCategorySchema.partial()

export const createColorSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
})

export const createSizeSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  order: z.number().int().nonnegative().optional(),
})

export const createMaterialSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  description: z.string().optional(),
})

export const createImageSchema = z.object({
  productId: z.string(),
  url: z.string().url(),
  alt: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
}) 