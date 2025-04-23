import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { NewBrandRequest, NewBrandResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const newBrand = async (call: ServerUnaryCall<NewBrandRequest, NewBrandResponse>, callback: sendUnaryData<NewBrandResponse>) => {
    try {
      const brandData = call.request.brand
      if (brandData == undefined) {
        throw new Error("Brand data is required")
      }
      const brand = await prisma.brand.create({
        data: {
          name: brandData.name,
          logo: brandData.logo || null,
        },
      })

      const response = {
        success: true,
        message: "Brand created successfully",
        brand: {
          id: brand.id,
          name: brand.name,
          logo: brand.logo || "",
        },
      }

      callback(null, response)
    } catch (error) {
      handleError(error as ServiceError, callback)
    }
}