import { PrismaClient } from '../../db/prisma-client'
import { logger } from '@nexura/common/utils'
import { CreateOrderRequest, CreateOrderResponse, OrderStatus } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'
const prisma = new PrismaClient()

export const createOrder = async (call: ServerUnaryCall<CreateOrderRequest, CreateOrderResponse>, callback: sendUnaryData<CreateOrderResponse>) => {
  try {
    const { userId, cartId, items, shippingAddress, paymentMethod, paymentAmount, paymentCurrency, shippingMethod, shippingCost, subtotal, total, currencyCode } = call.request

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount: total,
          shippingAddressId: shippingAddress?.id || '',
          status: OrderStatus.ORDER_PENDING.toString(),
          items: {
            create: items.map((item: any) => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
              productId: item.productId,
              image: item.image || ''
            }))
          },
          shipping: {
            create: {
              method: shippingMethod,
              status: 'pending'
            }
          }
        },
        include: {
          items: true,
          shipping: true
        }
      })

      return order
    })

    callback(null, {
      orderId: order.id
    })
  } catch (error) {
    logger.error('Error creating order:', error)
    callback({
      code: Status.INTERNAL,
      message: 'Failed to create order'
    })
  }
}

