import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { DeleteCategoryResponse, DeleteCategoryRequest } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const removeCategory = async (call: ServerUnaryCall<DeleteCategoryRequest, DeleteCategoryResponse>, callback: sendUnaryData<DeleteCategoryResponse>) => {
  try {
    const request = call.request
    const categoryId = request.id

    if (categoryId == undefined) {
      throw new Error("Category ID is required")
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })

    const response: DeleteCategoryResponse = {
      id: categoryId,
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}