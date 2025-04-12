import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { Empty, GetAllCategoryResponse } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'

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
    handleError(error, callback)
  }
}