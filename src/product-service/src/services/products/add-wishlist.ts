import { PrismaClient } from "@nexura/product-service/src/db/prisma-client";

import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { AddWishlistRequest, AddWishlistResponse, GetWishlistRequest, GetWishlistResponse } from '@nexura/grpc_gateway/protos'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient();

export const addWishlist = async (call: ServerUnaryCall<AddWishlistRequest, AddWishlistResponse>, callback: sendUnaryData<AddWishlistResponse>) => {
    try {
        // First get the wishlist items with products
        await prisma.wishlist.create({
            data: {
                userId: call.request.userId,
                productId: call.request.productId
            }
        });

       
        callback(null, {
            success: true,
            message: 'Product added to wishlist'
        });
    } catch (error) {
        console.error('Error adding wishlist:', error);
        callback({
            code: Status.INTERNAL,
            details: 'Failed to add wishlist',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, null);
    }
}

