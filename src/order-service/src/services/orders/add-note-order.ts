import { PrismaClient} from "@nexura/order-service/src/db/prisma-client";
import { logger } from '@nexura/common/utils'
import { AddOrderNoteRequest, AddOrderNoteResponse } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient()

export const addOrderNote = async (call: ServerUnaryCall<AddOrderNoteRequest, AddOrderNoteResponse>, callback: sendUnaryData<AddOrderNoteResponse>) => {
  try {
    logger.info("Starting order creation process", { request: call.request })
    const { orderId, note } = call.request
    if (!orderId || !note) {
      callback({
        code: Status.INVALID_ARGUMENT,
        message: 'Invalid request'
      })
      return
    }
    // Create order with transaction
    await prisma.$transaction(async (tx) => {
      // Create order with initial status
      const order = await tx.order.update({
        where: { id: orderId },
        data: {
          notes: {
            create: {
              note: note
            }
          }
        },
        select: {
          notes: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      })
      logger.info("Order note added successfully", { orderId, note })
      callback(null, {
        notes: order.notes.map((note) => ({
          id: note.id,
          orderId: note.orderId,
          note: note.note,
          createdAt: note.createdAt.toISOString()
        }))
      })
    })

    
  } catch (error) {
    logger.error('Error creating order:', error)
    callback({
      code: Status.INTERNAL,
      message: 'Failed to create order'
    })
  }
}

