import { PrismaClient } from '@nexura/order-service/src/db/prisma-client'
import { logger } from '@nexura/common/utils'
import { DeleteOrderNoteRequest, DeleteOrderNoteResponse } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient()

export const deleteOrderNote = async (call: ServerUnaryCall<DeleteOrderNoteRequest, DeleteOrderNoteResponse>, callback: sendUnaryData<DeleteOrderNoteResponse>) => {
  try {
    logger.info("Starting order creation process", { request: call.request })
    const { orderId, noteId } = call.request


    // Create order with transaction
    await prisma.$transaction(async (tx) => {
      // Create order with initial status
      await tx.order.update({
        where: { id: orderId },
        data:  {
          notes: {
            delete: {
              id: noteId
            }
          }
        }
      })
      logger.info("Order note deleted successfully", { orderId, noteId })
      callback(null, {
        success: true
      })
    })
  } catch (error) {
    logger.error('Error creating order:', error)
    callback({
      code:    Status.INTERNAL,
      message: 'Failed to delete order note'
    })
  }
}

