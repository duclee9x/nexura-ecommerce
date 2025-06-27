import { PrismaClient, OrderStatus as PrismaOrderStatus } from '../../db/prisma-client'
import { logger } from '@nexura/common/utils'
import { CreateOrderRequest, CreateOrderResponse } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient()

export const createOrder = async (call: ServerUnaryCall<CreateOrderRequest, CreateOrderResponse>, callback: sendUnaryData<CreateOrderResponse>) => {
  try {
    logger.info("Starting order creation process", { request: call.request })
    const { 
      userId, 
      items, 
      paymentTotal, 
      shippingMethod, 
      shippingCost, 
      shippingAddress, 
    } = call.request

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order with initial status
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount:       paymentTotal || 0,
          shippingAddressId: shippingAddress?.id || '',
          items:             {
            create: items.map(item => ({
              variantId:   item.variantId,
              quantity:    item.quantity,
              price:       item.price,
              productId:   item.productId,
              image:       item.image || '',
              productName: item.productName || '',
              productSlug: item.productSlug || '',
              variantName: item.variantName || '',
              sku:         item.sku || ''
            }))
          },
          shipping: {
            create: {
              method:            shippingMethod || 'standard',
              cost:              shippingCost || 0,
              shippingAddressId: shippingAddress?.id,              
            }
          },
          statusHistory: {
            create: {
              status:      PrismaOrderStatus.ORDER_PENDING,
              description: 'Order created'
            }
          }
        }
      })

      logger.info("Order created successfully", { orderId: order.id })
      return order
    })

    callback(null, {
      orderId: order.id
    })
  } catch (error) {
    logger.error('Error creating order:', error)
    callback({
      code:    Status.INTERNAL,
      message: 'Failed to create order'
    })
  }
}

