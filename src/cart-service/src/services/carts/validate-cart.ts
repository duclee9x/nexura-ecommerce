// import { ValidateCartRequest, ValidateCartResponse } from "@nexura/common/protos"
// import { sendUnaryData, ServerUnaryCall } from "@nexura/common/grpc"

// import { PrismaClient } from '@prisma/client'
// import { handleError } from "@nexura/common/utils"

// const prisma = new PrismaClient()

//   export const validateCart = async (call: ServerUnaryCall<ValidateCartRequest, ValidateCartResponse>, callback: sendUnaryData<ValidateCartResponse>) => {
//     try {
//       const { userId, items } = call.request

//       if (!userId) {
//         throw new Error('User ID is required')
//       }

//       const cart = await prisma.cart.findUnique({
//         where: { userId },
//         include: { items: true }
//       })

//       if (!cart) {
//         callback(null, { valid: false, message: 'Cart not found', items: [], issues: [] })
//         return
//       }

//       const issues: string[] = []
//       const validItems = []

//       for (const requestItem of items) {
//         const cartItem = cart.items.find(
//           (item) => item.productId === requestItem.productId && item.variantId === requestItem.variantId
//         )

//         if (!cartItem) {
//           issues.push(`Item not found for product: ${requestItem.variantId}`)
//           continue
//         }

//         if (cartItem.quantity <= 0) {
//           issues.push(`Item quantity invalid for product: ${requestItem.variantId}`)
//           continue
//         }

//         validItems.push({
//           id: cartItem.id,
//           productId: cartItem.productId,
//           variantId: cartItem.variantId,
//           image: cartItem.image || '',
//           quantity: cartItem.quantity,
//           createdAt: cartItem.createdAt.toISOString(),
//           updatedAt: cartItem.updatedAt.toISOString()
//         })
//       }

//       callback(null, {
//         valid: issues.length === 0,
//         message: issues.length === 0 ? 'Cart is valid' : 'Cart has issues',
//         items: validItems,
//         issues
//       })
//     } catch (error) {
//       handleError(error, callback)
//     }
//   }
