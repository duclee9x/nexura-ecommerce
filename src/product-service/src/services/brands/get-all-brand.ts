import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils'
import { GetAllBrandResponse } from '@nexura/grpc_gateway/protos'
import type { sendUnaryData, ServiceError } from '@grpc/grpc-js'
const prisma = new PrismaClient()

export const getAllBrand = async (callback: sendUnaryData<GetAllBrandResponse>) => {
  try {
    const brands = await prisma.brand.findMany()

    if (!brands) {
      throw new Error("Brand not found")
    }

    const response = {
      success: true,
      message: "Brand retrieved successfully",
      brands:  brands.map(brand => ({
        id:      brand.id,
        name:    brand.name,
        logo:    brand.logo || "",
      })),
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}