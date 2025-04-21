import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'

const prisma = new PrismaClient()

export const getAllBrand = async (call: any, callback: any) => {
  try {
    const brands = await prisma.brand.findMany()

    if (!brands) {
      throw new Error("Brand not found")
    }

    const response = {
      success: true,
      message: "Brand retrieved successfully",
      brands: brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        picture: brand.logo || "",
      })),
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}