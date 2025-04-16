import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'

const prisma = new PrismaClient()

export const removeBrand = async (call: any, callback: any) => {
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
    handleError(error, callback)
  }
}