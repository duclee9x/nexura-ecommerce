import type { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js"

import type { RemoveItemRequest, RemoveItemResponse } from "@nexura/common/protos"

import { PrismaClient } from '../../db/prisma-client'
import { handleError } from "@nexura/common/utils"

const prisma = new PrismaClient()

export const removeItem = async (call: ServerUnaryCall<RemoveItemRequest, RemoveItemResponse>, callback: sendUnaryData<RemoveItemResponse>) => {
  try {
    const { userId, productId, variantId } = call.request

    if (!userId || !productId || !variantId) {
      throw new Error('Missing required fields')
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    })

    if (!cart) {
      throw new Error('Cart not found')
    }

    const item = cart.items.find(
      (item) => item.productId === productId && item.variantId === variantId
    )

    if (!item) {
      throw new Error('Item not found')
    }

    await prisma.cartItem.delete({
      where: { id: item.id }
    })

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true }
    })

    if (!updatedCart) {
      throw new Error('Failed to update cart')
    }

    callback(null, {
      cart: {
        id: updatedCart.id,
        userId: updatedCart.userId,
        createdAt: updatedCart.createdAt.toString(),
        updatedAt: updatedCart.updatedAt.toString(),
        currencyCode: updatedCart.currencyCode,
        items: updatedCart.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          variantId: item.variantId,
          image: item.image || '',
          quantity: item.quantity,
          createdAt: item.createdAt.toString(),
          updatedAt: item.updatedAt.toString()
        }))
      }
    })
  } catch (error) {
    handleError(error, callback)
  }
}