import { PrismaClient } from '../../db/prisma-client'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'

import { handleError } from "@nexura/common/utils"
import { DeleteProductAttributesResponse, DeleteProductAttributesRequest } from '@nexura/common/protos'

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