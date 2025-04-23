import { CartServiceClient, Cart, CartItem, UpdateItemRequest, RemoveItemRequest, ClearCartRequest, GetCartRequest } from '@nexura/grpc_gateway/protos';
import { DefaultResponse } from '../../lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';
import {AddItemRequest} from '@nexura/grpc_gateway/protos';
const cartConfig = createServiceConfig('CartService', 50054);
const cartClient = createClient(CartServiceClient, cartConfig);

export const cartService = {
    getCart: async ({userId}: GetCartRequest): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'getCart', { userId });
    },

    addItem: async ({userId, productId, variantId, quantity, image, currencyCode}: AddItemRequest): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'addItem', { userId, productId, variantId, quantity, image, currencyCode });
    },

    updateItem: async ({userId, productId, variantId, quantity, image}: UpdateItemRequest): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'updateItem', { userId, productId, variantId, quantity, image });
    },

    removeItem: async ({userId, productId, variantId}: RemoveItemRequest): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'removeItem', { userId, productId, variantId });
    },

    clearCart: async ({userId}: ClearCartRequest): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'clearCart', { userId });
    },
}; 