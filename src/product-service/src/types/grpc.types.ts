import { ServerUnaryCall, sendUnaryData, StatusObject, ServerErrorResponse } from '@grpc/grpc-js'

export type GrpcUnaryCall<Request = any, Response = any> = ServerUnaryCall<Request, Response>
export type GrpcCallback<Response = any> = sendUnaryData<Response>
export type GrpcError = Partial<StatusObject> | ServerErrorResponse | null

export interface CreateProductRequest {
  name: string
  description?: string
  brandId: string
  categoryId: string
  basePrice: number
  salePrice?: number
  status?: string
}

export interface GetProductRequest {
  id: string
}

export interface UpdateProductRequest {
  id: string
  name?: string
  description?: string
  brandId?: string
  categoryId?: string
  basePrice?: number
  salePrice?: number
  status?: string
}

export interface DeleteProductRequest {
  id: string
}

export interface ListProductsRequest {
  page?: number
  limit?: number
  categoryId?: string
  brandId?: string
  status?: string
  search?: string
}

export interface CreateVariantRequest {
  productId: string
  sku: string
  barcode?: string
  colorId?: string
  sizeId?: string
  materialId?: string
  price: number
  salePrice?: number
  stockLevel: number
  status?: string
}

export interface CreateBrandRequest {
  name: string
  description?: string
  logo?: string
}

export interface CreateCategoryRequest {
  name: string
  description?: string
  parentId?: string
} 