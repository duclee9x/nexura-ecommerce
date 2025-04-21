import { ReleaseReservationRequest, ReleaseReservationResponse } from "@nexura/common/protos"
import { PrismaClient } from '../../db/prisma-client'
import type { ServerUnaryCall } from '@grpc/grpc-js'

export async function releaseReservation(
  call: ServerUnaryCall<ReleaseReservationRequest, ReleaseReservationResponse>
): Promise<ReleaseReservationResponse> {
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
      return {
        success: false,
        message: "Reservation not found"
      }
    }

    if (!reservation.variant?.stock) {
      return {
        success: false,
        message: "Variant or stock not found"
      }
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

    return {
      success: true,
      message: "Reservation released successfully"
    }
  } catch (error) {
    console.error("Error releasing reservation:", error)
    return {
      success: false,
      message: "Failed to release reservation"
    }
  } finally {
    await prisma.$disconnect()
  }
} 
