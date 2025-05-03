  import { ValidateAndReserveRequest, ValidateAndReserveResponse } from "@nexura/grpc_gateway/protos"
  import { PrismaClient, Prisma } from '@nexura/product-service/src/db/prisma-client'
  import type { ServerUnaryCall } from '@grpc/grpc-js'
  import type { sendUnaryData } from '@grpc/grpc-js'

  // Configure Prisma client with connection pooling
  const prisma = new PrismaClient()

  export async function validateAndReserve(
    call: ServerUnaryCall<ValidateAndReserveRequest, ValidateAndReserveResponse>,
    callback: sendUnaryData<ValidateAndReserveResponse>
  ): Promise<void> {
    try {
      const { userId, items: variantsRequest } = call.request
      console.log("validateAndReserve", call.request)

     
      try {
        console.log("Starting transaction")
        // Start a transaction with timeout
        await prisma.$transaction(async (tx) => {

          const variants = await prisma.productVariant.findMany({
            where: { 
            id: { in: variantsRequest.map((v) => v.id) }
            },
            include: {
              stock: true
            }
          })
          console.log("variants vs variantsRequest", variants, variantsRequest)
          // Check if all variants exist
          if (variants.length !== variantsRequest.length) {
            callback(null, {
              success: false,
              reservationId: "",
              validationErrors: [{
                variantId: variantsRequest.find(v => !variants.some(v2 => v2.id === v.id))?.id || "",
                error: "Variant not found"
              }]
            })
            return
          }
          console.log("variants exist", variants.length === variantsRequest.length)
          const validationErrors: {variantId: string, error: string}[] = []
          
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
            if (!requestedVariant.quantity) {
              validationErrors.push({
                variantId: variant.id,
                error: "Stock data is required"
              })
              continue
            }
    
    
            if (!variant.stock) {
              validationErrors.push({
                variantId: variant.id,
                error: "Stock record not found"
              });
              continue;
            }
            
            if (variant.stock.quantity < requestedVariant.quantity) {
              validationErrors.push({
                variantId: variant.id,
                error: "Insufficient stock"
              });
              continue;
            }
    
            // Check low stock threshold
            if (variant.lowStockThreshold && variant.stock.quantity - requestedVariant.quantity < 0) {
              validationErrors.push({
                variantId: variant.id,
                error: "Stock below threshold"
              })
            }
          }
          if (validationErrors.length > 0) {
            callback(null, {
              success: false,
              reservationId: "",
              validationErrors
            })
            return
          }
      
          
          const reservationResult = await tx.reservation.create({
            data: {
              userId: userId,
              items: {
                create: variantsRequest.map((v) => ({
                  variantId: v.id,
                  quantity: v.quantity,
                })),
              },
            },
          });
        
          await Promise.all(
            variantsRequest.map((variant) =>
              tx.stock.update({
                where: { variantId: variant.id },
                data: {
                  quantity: { decrement: variant.quantity },
                  reserved: { increment: variant.quantity },
                },
              })
            )
          )
          callback(null, {
            success: true,
            reservationId: reservationResult.id,
            validationErrors: []
          })
        }); 
      } catch (error) {
        console.error("Transaction error:", error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2028') {
            console.error('Transaction timed out')
            callback(null, {
              success: false,
              reservationId: "",
              validationErrors: [{
                variantId: "",
                error: "Transaction timed out"
              }]
            })
            return
          }
          if (error.code === 'P2034') {
            console.error('Transaction failed due to write conflict')
            callback(null, {
              success: false,
              reservationId: "",
              validationErrors: [{
                variantId: "",
                error: "Transaction failed due to write conflict"
              }]
            })
            return
          }
        }
        const typedError = error as Error
        callback(typedError, null)
        return
      }

      
    } catch (error) {
      console.error("Error validating and reserving stock:", error)
      const typedError = error as Error
      callback(typedError, null)
    } 
  } 
