import { ReleaseReservationRequest, ReleaseReservationResponse } from "@nexura/grpc_gateway/protos"
import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { handleError } from "@nexura/common/utils"

export async function releaseReservation(
  call: ServerUnaryCall<ReleaseReservationRequest, ReleaseReservationResponse>,
  callback: sendUnaryData<ReleaseReservationResponse>
): Promise<void> {
  const prisma = new PrismaClient()
  
  try {
    const { reservationId } = call.request

    // Get the reservation with its variant and stock
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: {
        variant: {
          include: {
            stock: true
          }
        }
      }
    })

    if (!reservation) {
      callback(null, {
        success: false,
        message: "Reservation not found"
      })
      return
    }

    if (!reservation.variant?.stock) {
      callback(null, {
        success: false,
        message: "Variant or stock not found"
      })
      return
    }

    // Store stock data in variables to avoid repeated null checks
    const { quantity, reserved } = reservation.variant.stock

    // Start a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Delete the reservation
      await tx.reservation.delete({
        where: { id: reservationId }
      })

      // Update stock - reverse the reservation operation
      await tx.stock.update({
        where: { variantId: reservation.variantId },
        data: {
          quantity: quantity + reservation.quantity,
          reserved: reserved - reservation.quantity
        }
      })
    })

    callback(null, {
      success: true,
      message: "Reservation released successfully"
    })
  } catch (error) {
    handleError(error as ServiceError, callback)
  } finally {
    await prisma.$disconnect()
  }
} 
