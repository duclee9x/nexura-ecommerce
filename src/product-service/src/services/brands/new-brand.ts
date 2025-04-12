import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { NewBrandRequest } from '../../proto/nexura'
import { NewBrandResponse } from '../../proto/nexura'

const prisma = new PrismaClient()

export const newBrand: UntypedHandleCall = async (call: ServerUnaryCall<NewBrandRequest, NewBrandResponse>, callback: sendUnaryData<NewBrandResponse>) => {
    try {
      const brandData = call.request.brand
      if (brandData == undefined) {
        throw new Error("Brand data is required")
      }
      const brand = await prisma.brand.create({
        data: {
          name: brandData.name,
          logo: brandData.logo || null,
        },
      })

      const response = {
        success: true,
        message: "Brand created successfully",
        brand: {
          id: brand.id,
          name: brand.name,
          logo: brand.logo || "",
        },
      }

      callback(null, response)
    } catch (error) {
      handleError(error, callback)
    }
}