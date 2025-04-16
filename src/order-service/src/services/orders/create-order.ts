import { PrismaClient } from '@prisma/client'
import { logger } from '../../utils/logger'
import { CreateOrderRequest, CreateOrderResponse, OrderStatus } from '../../proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'
import { sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'
const prisma = new PrismaClient()

export const createOrder = async (call: ServerUnaryCall<CreateOrderRequest, CreateOrderResponse>, callback: sendUnaryData<CreateOrderResponse>) => {
  try {
    const { userId, items, shippingAddressId, totalAmount } = call.request

    // Calculate total amount
    

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create addresses


      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddressId: shippingAddressId,
          items: {
            create: items.map((item: any) => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
              productId: item.productId,
              image: item.image,
            }))
          }
        },
        include: {
          items: true,
        }
      })

      return order
    })

    callback(null, {
      orderId: order.id,
      status: OrderStatus.ORDER_PENDING 
    })
  } catch (error) {
    logger.error('Error creating order:', error)
    callback({
      code: Status.INTERNAL,
      message: 'Failed to create order'
    })
  }
}

