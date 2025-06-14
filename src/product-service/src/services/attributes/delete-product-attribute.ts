import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'

import { handleError } from "@nexura/common/utils"
import { DeleteProductAttributesResponse, DeleteProductAttributesRequest } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const deleteProductAttribute = async (call: ServerUnaryCall<DeleteProductAttributesRequest, DeleteProductAttributesResponse>, callback: sendUnaryData<DeleteProductAttributesResponse>) => {
  try {
    const request = call.request
    const attributeId = request.attributeId

    if (attributeId == undefined) {
      throw new Error("Attribute ID is required")
    }

    await prisma.productAttribute.delete({
      where: {
        id: attributeId,
      },
    })

    const response: DeleteProductAttributesResponse = {
      attributeId: attributeId,
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}