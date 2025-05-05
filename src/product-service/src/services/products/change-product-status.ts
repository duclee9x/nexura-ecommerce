import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { ChangeProductStatusRequest, ChangeProductStatusResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const changeProductStatus = async (call: ServerUnaryCall<ChangeProductStatusRequest, ChangeProductStatusResponse>, callback: sendUnaryData<ChangeProductStatusResponse>) => {
  try {
    const request = call.request
    if (request.productId == undefined || request.status == undefined) {
      callback(null, {
        success: false,
      })
      return
    }


    // Update product with all related data
    await prisma.product.update({
      where: {
        id: request.productId,
      },
      data: {
        status: request.status,
      }
    })


    const response: ChangeProductStatusResponse = {
      success: true,
    }
    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}