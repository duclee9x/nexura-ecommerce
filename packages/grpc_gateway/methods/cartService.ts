import { CartServiceClient, GetCartRequest, AddItemRequest, UpdateItemRequest, RemoveItemRequest, ClearCartRequest, GetCartResponse, AddItemResponse, UpdateItemResponse, RemoveItemResponse, ClearCartResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const cartConfig = createServiceConfig('CartService', 50054);
const cartClient = createClient(CartServiceClient, cartConfig);

export const cartService = {
    getCart: async ({userId}: GetCartRequest): Promise<GetCartResponse> => {
        return promisifyGrpcCall(cartClient, 'getCart', { userId });
    },

    addItem: async ({userId, productId, variantId, quantity, image, currencyCode}: AddItemRequest): Promise<AddItemResponse> => {
        return promisifyGrpcCall(cartClient, 'addItem', { userId, productId, variantId, quantity, image, currencyCode });
    },

    updateItem: async ({userId, productId, variantId, quantity, image}: UpdateItemRequest): Promise<UpdateItemResponse> => {
        return promisifyGrpcCall(cartClient, 'updateItem', { userId, productId, variantId, quantity, image });
    },

    removeItem: async ({userId, productId, variantId}: RemoveItemRequest): Promise<RemoveItemResponse> => {
        return promisifyGrpcCall(cartClient, 'removeItem', { userId, productId, variantId });
    },

    clearCart: async ({userId}: ClearCartRequest): Promise<ClearCartResponse> => {
        return promisifyGrpcCall(cartClient, 'clearCart', { userId });
    },
}; 