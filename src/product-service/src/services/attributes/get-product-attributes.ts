import { PrismaClient } from '../../db/prisma-client'
import { GetProductAttributesRequest, GetProductAttributesResponse } from '@nexura/common/protos'

import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const getProductAttributes = async (call: ServerUnaryCall<GetProductAttributesRequest, GetProductAttributesResponse>, callback: sendUnaryData<GetProductAttributesResponse>) => {
  try {
    const productId = call.request.productId
    const attributes = await prisma.productAttribute.findMany({
      where: {
        productId: productId,
      },
    })

    if (!attributes) {
      throw new Error("Attributes not found")
    }

    const response: GetProductAttributesResponse = {
      attributes: attributes.map((attribute) => ({
        id: attribute.id,
        name: attribute.name,
        required: attribute.required,
        visible: attribute.visible,
        values: attribute.values,
        productId: attribute.productId,
        variantable: attribute.variantable,
        filterable: attribute.filterable,
        searchable: attribute.searchable,
        displayOrder: attribute.displayOrder,
      })),
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}