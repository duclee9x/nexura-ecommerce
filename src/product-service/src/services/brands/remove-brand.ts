import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { ServerUnaryCall, sendUnaryData, ServiceError } from '@grpc/grpc-js'
import { RemoveBrandResponse, RemoveBrandRequest } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const removeBrand = async (call: ServerUnaryCall<RemoveBrandRequest, RemoveBrandResponse>, callback: sendUnaryData<RemoveBrandResponse>) => {
  try {
    const request = call.request
    const brandId = request.id

    if (brandId == undefined) {
      throw new Error("Brand ID is required")
    }

    await prisma.brand.delete({
      where: {
        id: brandId,
      },
    })

    const response = {
      success: true,
      message: "Brand removed successfully",
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}