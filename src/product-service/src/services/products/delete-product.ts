import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { DeleteProductResponse, DeleteProductRequest } from '@nexura/common/protos'

const prisma = new PrismaClient()

export const deleteProduct = async (call: ServerUnaryCall<DeleteProductRequest, DeleteProductResponse>, callback: sendUnaryData<DeleteProductResponse>) => {
  try {
    const request = call.request
    const productId = request.id

    if (productId == undefined) {
      throw new Error("Product ID is required")
    }

    // Delete the product - all related records will be deleted automatically
    await prisma.product.delete({
      where: {
        id: productId,
      },
    })

    const response: DeleteProductResponse = {
      id: productId,
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}