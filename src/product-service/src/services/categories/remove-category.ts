import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { DeleteCategoryResponse } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'
import { DeleteCategoryRequest } from '@/src/proto/nexura'

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
    handleError(error, callback)
  }
}