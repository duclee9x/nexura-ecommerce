import { CartServiceClient, GetCartRequest, AddItemRequest, UpdateItemRequest, RemoveItemRequest, ClearCartRequest, GetCartResponse, AddItemResponse, UpdateItemResponse, RemoveItemResponse, ClearCartResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';
const DAPR_PORT = process.env.DAPR_PORT;
if (!DAPR_PORT){
  throw Error("not found port");
}
const cartConfig = createServiceConfig('CartService', DAPR_PORT);
const cartClient = createClient(CartServiceClient, cartConfig);

export const cartService = {
  getCart: async (request: GetCartRequest): Promise<GetCartResponse> => {
    return promisifyGrpcCall(cartClient, 'getCart', request);
  },

  addItem: async (request: AddItemRequest): Promise<AddItemResponse> => {
    return promisifyGrpcCall(cartClient, 'addItem', request);
  },

  updateItem: async (request: UpdateItemRequest): Promise<UpdateItemResponse> => {
    return promisifyGrpcCall(cartClient, 'updateItem', request);
  },

  removeItem: async (request: RemoveItemRequest): Promise<RemoveItemResponse> => {
    return promisifyGrpcCall(cartClient, 'removeItem', request);
  },

  clearCart: async (request: ClearCartRequest): Promise<ClearCartResponse> => {
    return promisifyGrpcCall(cartClient, 'clearCart', request);
  },
}; 