import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { handleUnaryCall, sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { CreateProductAttributeRequest, CreateProductAttributeResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const createProductAttribute: handleUnaryCall<CreateProductAttributeRequest, CreateProductAttributeResponse> = async (call: ServerUnaryCall<CreateProductAttributeRequest, CreateProductAttributeResponse>, callback: sendUnaryData<CreateProductAttributeResponse>) => {
  try {
    const attributeData = call.request.attribute
    if (attributeData == undefined) {
      throw new Error("Attribute data is required")
    }
    const attribute = await prisma.productAttribute.create({
      data: {
        name:     attributeData.name,
        required: attributeData.required,
        visible:  attributeData.visible,
        values:   attributeData.values,
        product:  {
          connect: {
            id: attributeData.productId,
          },
        },
        variantable:  attributeData.variantable,
        filterable:   attributeData.filterable,
        searchable:   attributeData.searchable,
        displayOrder: attributeData.displayOrder,
      },
    })

    const response = {
      attribute: {
        id:           attribute.id,
        name:         attribute.name,
        required:     attribute.required,
        visible:      attribute.visible,
        values:       attribute.values,
        variantable:  attribute.variantable,
        productId:    attribute.productId,
        filterable:   attribute.filterable,
        searchable:   attribute.searchable,
        displayOrder: attribute.displayOrder,
      },
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}