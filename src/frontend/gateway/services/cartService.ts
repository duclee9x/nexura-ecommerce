import { CartServiceClient, Cart, CartItem } from '../../protos/nexura';
import { DefaultResponse } from '../../lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const cartConfig = createServiceConfig('CartService', 50052);
const cartClient = createClient(CartServiceClient, cartConfig);

export const cartService = {
    getCart: async (userId: string): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'getCart', { userId });
    },

    addItem: async (userId: string, item: CartItem): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'addItem', { userId, item });
    },

    updateItem: async (userId: string, item: CartItem): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'updateItem', { userId, item });
    },

    removeItem: async (userId: string, item: CartItem): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'removeItem', { userId, item });
    },

    clearCart: async (userId: string): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'clearCart', { userId });
    },
}; 