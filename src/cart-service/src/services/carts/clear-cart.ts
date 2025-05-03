import type { sendUnaryData, ServerUnaryCall, ServiceError } from "@grpc/grpc-js"
import type { ClearCartRequest, ClearCartResponse } from "@nexura/grpc_gateway/protos"

import { PrismaClient } from '@nexura/cart-service/src/db/prisma-client'
import { handleError } from "@nexura/common/utils"

const prisma = new PrismaClient()

  export const clearCart = async (call: ServerUnaryCall<ClearCartRequest, ClearCartResponse>, callback: sendUnaryData<ClearCartResponse>)=> {
    try {
    const { userId } = call.request

    if (!userId) {
      throw new Error('User ID is required')
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    })

    if (!cart) {
      throw new Error('Cart not found')
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    callback(null, { success: true })
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}

