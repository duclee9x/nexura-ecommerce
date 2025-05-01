import { PrismaClient } from '../../db/prisma-client'
import { logger } from '@nexura/common/utils'
import { AddOrderNoteRequest, AddOrderNoteResponse, UpdateTrackingNumberRequest, UpdateTrackingNumberResponse } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient()

export const updateTrackingNumber = async (call: ServerUnaryCall<UpdateTrackingNumberRequest, UpdateTrackingNumberResponse>, callback: sendUnaryData<UpdateTrackingNumberResponse>) => {
  try {
    logger.info("Starting order creation process", { request: call.request })
    const { orderId, trackingNumber } = call.request
    if (!orderId || !trackingNumber) {
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
          shipping: {
            update: {
              tracking: {
                update: {
                  number: trackingNumber
                }
              }
            }
          }
        }
      })
      logger.info("Tracking number updated successfully", { orderId, trackingNumber })
      callback(null, {
        success: true
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

