import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { UpdateCategoryRequest, UpdateCategoryResponse } from '@nexura/common/protos'

const prisma = new PrismaClient()

export const updateCategory = async (call: ServerUnaryCall<UpdateCategoryRequest, UpdateCategoryResponse>, callback: sendUnaryData<UpdateCategoryResponse>) => {
  try {
    const request = call.request
    if (request.category == undefined) {
      throw new Error("Category is required")
    }
    
    const categoryId = request.category.id

    if (categoryId == undefined) {
      throw new Error("Category ID is required")
    }
    
    const parentId = request.category.parentId == "" ? null : request.category.parentId
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: request.category.name,
        parentId: parentId
      },
    })

    const response: UpdateCategoryResponse = {
      category: request.category,
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}