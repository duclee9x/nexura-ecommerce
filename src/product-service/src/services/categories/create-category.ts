import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { CreateCategoryRequest, CreateCategoryResponse } from '../../proto/nexura'

const prisma = new PrismaClient()

export const createCategory: UntypedHandleCall = async (call: ServerUnaryCall<CreateCategoryRequest, CreateCategoryResponse>, callback: sendUnaryData<CreateCategoryResponse>) => {
    try {
      console.log("Creating category", call.request)
      const categoryData = call.request.category
      if (categoryData == undefined) {
        throw new Error("Category data is required")
      }
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          parentId: categoryData.parentId || null,
        },
      })

      const response = {
        success: true,
        message: "Category created successfully",
        category: {
          id: category.id,
          name: category.name,
          parentId: category.parentId || "",
        },
      }

      callback(null, response)
    } catch (error) {
      handleError(error, callback)
    }
}