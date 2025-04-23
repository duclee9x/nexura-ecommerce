import { CommitReservationRequest, CommitReservationResponse } from "@nexura/grpc_gateway/protos"
import { PrismaClient } from '../../db/prisma-client'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { handleError } from "@nexura/common/utils"

interface VariantRequest {
  id: string
  stock: {
    quantity: number
    reserved: number
  }
}

export async function commitReservation(
  call: ServerUnaryCall<CommitReservationRequest, CommitReservationResponse>,
  callback: sendUnaryData<CommitReservationResponse>
): Promise<CommitReservationResponse> {
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

      // Update stock - commit the reservation
      await tx.stock.update({
        where: { variantId: reservation.variantId },
        data: {
          quantity,
          reserved: reserved - reservation.quantity
        }
      })
    })

    return {
      success: true,
      message: "Reservation committed successfully"
    }
  } catch (error) {
    handleError(error as ServiceError, callback)
    return {
      success: false,
      message: "Failed to commit reservation"
    }
  } finally {
    await prisma.$disconnect()
  }
} 
