import { CartServiceClient, Cart } from '../../protos/nexura';
import { DefaultResponse } from '../../lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const cartConfig = createServiceConfig('CartService', 50052);
const cartClient = createClient(CartServiceClient, cartConfig);

export const cartService = {
    addItem: async (userId: string, item: any): Promise<DefaultResponse> => {
        return promisifyGrpcCall(cartClient, 'addItem', { userId, item });
    },

    emptyCart: async (userId: string): Promise<DefaultResponse> => {
        return promisifyGrpcCall(cartClient, 'emptyCart', { userId });
    },

    getCart: async (userId: string): Promise<DefaultResponse & { cart: Cart }> => {
        return promisifyGrpcCall(cartClient, 'getCart', { userId });
    }
}; 