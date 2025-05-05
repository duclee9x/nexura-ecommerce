import { PrismaClient, OrderStatus as PrismaOrderStatus } from '@nexura/order-service/src/db/prisma-client'
import { logger } from '@nexura/common/utils'
import { CreateOrderRequest, CreateOrderResponse, OrderStatus as ProtoOrderStatus } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient()

// Map proto OrderStatus to Prisma OrderStatus
const mapOrderStatus = (status: ProtoOrderStatus | undefined): PrismaOrderStatus => {
  switch (status) {
    case ProtoOrderStatus.ORDER_PENDING:
      return PrismaOrderStatus.ORDER_PENDING
    case ProtoOrderStatus.ORDER_PROCESSING:
      return PrismaOrderStatus.ORDER_PROCESSING
    case ProtoOrderStatus.ORDER_SHIPPED:
      return PrismaOrderStatus.ORDER_SHIPPED
    case ProtoOrderStatus.ORDER_COMPENSATING:
      return PrismaOrderStatus.ORDER_COMPENSATING
    case ProtoOrderStatus.ORDER_DELIVERED:
      return PrismaOrderStatus.ORDER_DELIVERED
    case ProtoOrderStatus.ORDER_CANCELLED:
      return PrismaOrderStatus.ORDER_CANCELLED
    case ProtoOrderStatus.ORDER_COMPLETED:
      return PrismaOrderStatus.ORDER_COMPLETED
    case ProtoOrderStatus.ORDER_FAILED:
      return PrismaOrderStatus.ORDER_FAILED
    case ProtoOrderStatus.ORDER_REFUNDED:
      return PrismaOrderStatus.ORDER_REFUNDED
    case ProtoOrderStatus.ORDER_EXPIRED:
      return PrismaOrderStatus.ORDER_EXPIRED
    case ProtoOrderStatus.ORDER_ON_HOLD:
      return PrismaOrderStatus.ORDER_ON_HOLD
    default:
      return PrismaOrderStatus.ORDER_PENDING
  }
}

export const createOrder = async (call: ServerUnaryCall<CreateOrderRequest, CreateOrderResponse>, callback: sendUnaryData<CreateOrderResponse>) => {
  try {
    logger.info("Starting order creation process", { request: call.request })
    const items = call.request.items || []
    const { userId, cartId, paymentId, status, payment, shipping, coupons } = call.request

    // Calculate total amount from payment
    const totalAmount = payment?.total || 0

    // Create order with transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order with initial status
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddressId: shipping?.shippingAddress?.id || '',
          status: mapOrderStatus(status),
          paymentId: paymentId || '',
          shipping: {
            create: {
              estimatedDelivery: shipping?.estimatedDelivery || '',
              method: shipping?.method || '',
              cost: shipping?.cost || 0,
              tracking: {
                create: {
                  number: shipping?.tracking?.number || '',
                  carrier: shipping?.tracking?.carrier || '',
                  status: shipping?.tracking?.status || '',
                  currentLocation: shipping?.tracking?.currentLocation || '',
                }
              }
            }
          },
          items: {
            create: items.map((item) => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
              productId: item.productId,
              image: item.image || '',
              productName: item.productName || '',
              productSlug: item.productSlug || '',
              variantName: item.variantName || '',
              sku: item.sku || ''
            }))
          },
          statusHistory: {
            create: {
              status: mapOrderStatus(status),
              description: 'Order created'
            }
          }
        },
        include: {
          items: true,
          statusHistory: true
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
      code: Status.INTERNAL,
      message: 'Failed to create order'
    })
  }
}

