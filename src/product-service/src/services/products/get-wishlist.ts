import { PrismaClient } from "@nexura/product-service/src/db/prisma-client";
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { GetWishlistRequest, GetWishlistResponse } from '@nexura/grpc_gateway/protos'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient();

export const getWishlist = async (call: ServerUnaryCall<GetWishlistRequest, GetWishlistResponse>, callback: sendUnaryData<GetWishlistResponse>) => {
  try {
    // First get the wishlist items with products
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: call.request.userId
      },
      include: {
        product: {
          include: {
            images: {
              take: 1
            }
          }
        }
      }
    });

    // Get all unique category IDs
    if (wishlist.length === 0) {
      callback(null, {
        wishlistItems: []
      });
      return;
    }
    callback(null, {
      wishlistItems: wishlist.map(item => ({
        id:           item.id,
        productId:    item.productId,
        productName:  item.product.name ?? '',
        productImage: item.product.images[0]?.url || '',
        productPrice: item.product.basePrice,
        productSlug:  item.product.slug
      }))
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    callback({
      code:    Status.INTERNAL,
      details: 'Failed to fetch wishlist',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, null);
  }
}

