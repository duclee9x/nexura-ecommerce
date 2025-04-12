import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { DeleteProductAttributesResponse, DeleteProductAttributesRequest } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const deleteProductAttribute = async (call: ServerUnaryCall<DeleteProductAttributesRequest, DeleteProductAttributesResponse>, callback: sendUnaryData<DeleteProductAttributesResponse>) => {
  try {
    const request = call.request
    const attributeId = request.attributeId

    if (attributeId == undefined) {
      throw new Error("Attribute ID is required")
    }

    const attributes = await prisma.productAttribute.delete({
      where: {
        id: attributeId,
      },
    })

    const response: DeleteProductAttributesResponse = {
      attributeId: attributeId,
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}