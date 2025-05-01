import { CommitReservationRequest, CommitReservationResponse } from "@nexura/grpc_gateway/protos"
import { PrismaClient } from '../../db/prisma-client'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { handleError } from "@nexura/common/utils"

export async function commitReservation(
  call: ServerUnaryCall<CommitReservationRequest, CommitReservationResponse>,
  callback: sendUnaryData<CommitReservationResponse>
): Promise<void> {
  const prisma = new PrismaClient()
  
  try {
    const { reservationId, orderId } = call.request

    // Get the reservation with its items, variants and their stock
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                stock: true
              }
            }
          }
        }
      }
    })

    if (!reservation) {
      callback(null, {
        success: false,
        message: "Reservation not found",
        orderId: ""
      })
      return
    }

    if (!reservation.items || reservation.items.length === 0) {
      callback(null, {
        success: false,
        message: "No items found in reservation",
        orderId: ""
      })
      return
    }

    // Start a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Delete the reservation (this will cascade delete the items)
      await tx.reservation.delete({
        where: { id: reservationId }
      })

      // Update stock for each item in the reservation
      for (const item of reservation.items) {
        if (!item.variant?.stock) {
          throw new Error(`Stock not found for variant ${item.variantId}`)
        }

        const { quantity, reserved } = item.variant.stock

        await tx.stock.update({
          where: { variantId: item.variantId },
          data: {
            quantity,
            reserved: reserved - item.quantity
          }
        })
      }
    })

    callback(null, {
      success: true,
      message: "Reservation committed successfully",
      orderId: orderId
    })
  } catch (error) {
    handleError(error as ServiceError, callback)
  } finally {
    await prisma.$disconnect()
  }
} 
  