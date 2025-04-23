import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { Empty, GetAllCategoryResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const getAllCategory = async (call: ServerUnaryCall<Empty, GetAllCategoryResponse>, callback: sendUnaryData<GetAllCategoryResponse>) => {
  try {
    const categories = await prisma.category.findMany()

    if (!categories) {
      throw new Error("Category not found")
    }

    const response: GetAllCategoryResponse = {
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        parentId: category.parentId || "",
      })),
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}