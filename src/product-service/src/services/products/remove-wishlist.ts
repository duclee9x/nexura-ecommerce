import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { RemoveWishlistRequest, RemoveWishlistResponse } from '@nexura/grpc_gateway/protos'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient();

export const removeWishlist = async (call: ServerUnaryCall<RemoveWishlistRequest, RemoveWishlistResponse>, callback: sendUnaryData<RemoveWishlistResponse>) => {
  try {
    // First get the wishlist items with products
    await prisma.wishlist.delete({
      where: {
        id: call.request.wishlistId
      }
    });
        
    callback(null, {
      success: true,
    });
  } catch (error) {
    console.error('Error removing wishlist:', error);
    callback({
      code:    Status.INTERNAL,
      details: 'Failed to remove wishlist',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, null);
  }
}

