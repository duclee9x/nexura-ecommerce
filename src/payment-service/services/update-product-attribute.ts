import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { ServerUnaryCall } from '@grpc/grpc-js'
import { UpdateProductAttributesRequest, UpdateProductAttributesResponse } from '@/src/proto/nexura'
import { sendUnaryData } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const updateProductAttribute = async (call: ServerUnaryCall<UpdateProductAttributesRequest, UpdateProductAttributesResponse>, callback: sendUnaryData<UpdateProductAttributesResponse>) => {
  try {
    const request = call.request
    if (request.attribute == undefined) {
      throw new Error("Attribute is required")
    }
    
    const attributeId = request.attribute.id

    if (attributeId == undefined) {
      throw new Error("Attribute ID is required")
    }
    
    await prisma.productAttribute.update({
      where: {
        id: attributeId,
      },
      data: {
        name: request.attribute.name,
        required: request.attribute.required,
        visible: request.attribute.visible,
        values: request.attribute.values,
        variantable: request.attribute.variantable,
        filterable: request.attribute.filterable,
        searchable: request.attribute.searchable,
        displayOrder: request.attribute.displayOrder,
      },
    })

    const response: UpdateProductAttributesResponse = {
      attribute: request.attribute,
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}