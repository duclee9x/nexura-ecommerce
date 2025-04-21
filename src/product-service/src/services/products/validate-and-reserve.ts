import { ValidateAndReserveRequest, ValidateAndReserveResponse } from "@nexura/common/protos"
import { PrismaClient } from '../../db/prisma-client'
import type { ServerUnaryCall } from '@grpc/grpc-js'

interface VariantRequest {
  id: string
  stock: {
    quantity: number
    reserved: number
  }
  price: number
}

export async function validateAndReserve(
  call: ServerUnaryCall<ValidateAndReserveRequest, ValidateAndReserveResponse>
): Promise<ValidateAndReserveResponse> {
  const prisma = new PrismaClient()
  
  try {
    const { userId, variants: variantsRequest } = call.request

    // Get all variants with their current stock
    const variants = await prisma.productVariant.findMany({
      where: { 
        id: { in: variantsRequest.map((v) => v.id) }
      },
      include: {
        stock: true
      }
    })

    // Check if all variants exist
    if (variants.length !== variantsRequest.length) {
      return {
        success: false,
        reservationId: "",
        validationErrors: [{
          variantId: variantsRequest.find(v => !variants.some(v2 => v2.id === v.id))?.id || "",
          error: "Variant not found"
        }]
      }
    }

    const validationErrors = []

    // Validate each variant
    for (const variant of variants) {
      const requestedVariant = variantsRequest.find((v) => v.id === variant.id)!
      
      // Check price
      if (variant.price !== requestedVariant.price) {
        validationErrors.push({
          variantId: variant.id,
          error: "Price mismatch"
        })
        continue
      }

      // Check if requested variant has stock data
      if (!requestedVariant.stock) {
        validationErrors.push({
          variantId: variant.id,
          error: "Stock data is required"
        })
        continue
      }

      const requestedQuantity = requestedVariant.stock.reserved

      // Check stock availability
      if (!variant.stock || variant.stock.quantity < requestedQuantity) {
        validationErrors.push({
          variantId: variant.id,
          error: "Insufficient stock"
        })
        continue
      }

      // Check low stock threshold
      if (variant.lowStockThreshold && variant.stock.quantity - requestedQuantity < variant.lowStockThreshold) {
        validationErrors.push({
          variantId: variant.id,
          error: "Stock below threshold"
        })
      }
    }

    if (validationErrors.length > 0) {
      return {
        success: false,
        reservationId: "",
        validationErrors
      }
    }

    // Start a transaction to ensure atomicity
    const reservation = await prisma.$transaction(async (tx) => {
      // Create reservations and update stock for each variant
      for (const variant of variants) {
        const requestedVariant = variantsRequest.find((v) => v.id === variant.id)!
        const requestedQuantity = requestedVariant.stock?.reserved || 0

        // Create reservation
        await tx.reservation.create({
          data: {
            quantity: requestedQuantity,
            userId: userId,
            variantId: variant.id
          }
        })

        // Update stock
        await tx.stock.update({
          where: { variantId: variant.id },
          data: {
            quantity: variant.stock!.quantity - requestedQuantity,
            reserved: variant.stock!.reserved + requestedQuantity
          }
        })
      }

      return await tx.reservation.create({
        data: {
          userId: userId,
          variantId: variants[0]?.id || "",
          quantity: variantsRequest[0]?.stock?.reserved || 0
        }
      })
    })

    return {
      success: true,
      reservationId: reservation.id,
      validationErrors: []
    }
  } catch (error) {
    console.error("Error validating and reserving stock:", error)
    return {
      success: false,
      reservationId: "",
      validationErrors: [
        {
          variantId: "",
          error: "Failed to validate and reserve stock"
        }
      ]
    }
  } finally {
    await prisma.$disconnect()
  }
} 
