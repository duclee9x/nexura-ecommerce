import { Order, CreateOrderRequest, OrderServiceClient, OrderStatus, CreateOrderResponse, GetOrderStatusResponse, GetOrderResponse, CancelOrderResponse, UpdateOrderStatusResponse, ReleaseReservationRequest, ValidateAndReserveRequest, ValidateAndReserveResponse, ReleaseReservationResponse, CommitReservationRequest, CommitReservationResponse, ListOrdersResponse, ListOrdersRequest, AddOrderNoteRequest, DeleteOrderNoteRequest, DeleteOrderNoteResponse, AddOrderNoteResponse, UpdateTrackingNumberRequest, UpdateTrackingNumberResponse, ListAllOrdersResponse, GetOrdersForAdminResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const orderConfig = createServiceConfig('OrderService', 50055);
const orderClient = createClient(OrderServiceClient, orderConfig);

export const orderService = {
    createOrder: async (request: CreateOrderRequest): Promise<CreateOrderResponse> => {
        return promisifyGrpcCall(orderClient, 'createOrder', request);
    },
    getOrderStatus: async (orderId: string): Promise<GetOrderStatusResponse> => {
        return promisifyGrpcCall(orderClient, 'getOrderStatus', { orderId });
    },
    getOrder: async (orderId: string): Promise<GetOrderResponse> => {
        return promisifyGrpcCall(orderClient, 'getOrder', { orderId });
    },
    getOrdersForAdmin: async (userIds: string[]): Promise<GetOrdersForAdminResponse> => {
        return promisifyGrpcCall(orderClient, 'getOrdersForAdmin', { userIds });
    },

    cancelOrder: async (orderId: string): Promise<CancelOrderResponse> => {
        return promisifyGrpcCall(orderClient, 'cancelOrder', { orderId });
    },
    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<UpdateOrderStatusResponse> => {
        return promisifyGrpcCall(orderClient, 'updateOrderStatus', { orderId, status });
    },

    listOrders: async (request: ListOrdersRequest): Promise<ListOrdersResponse> => {
        return promisifyGrpcCall(orderClient, 'listOrders', request);
    },

    listAllOrders: async (): Promise<ListAllOrdersResponse> => {
        return promisifyGrpcCall(orderClient, 'listAllOrders', {});
    },
    addOrderNote: async (request: AddOrderNoteRequest): Promise<AddOrderNoteResponse> => {
        return promisifyGrpcCall(orderClient, 'addOrderNote', request);
    },
    deleteOrderNote: async (request: DeleteOrderNoteRequest): Promise<DeleteOrderNoteResponse> => {
        return promisifyGrpcCall(orderClient, 'deleteOrderNote', request);
    },
    updateTrackingNumber: async (request: UpdateTrackingNumberRequest): Promise<UpdateTrackingNumberResponse> => {
        return promisifyGrpcCall(orderClient, 'updateTrackingNumber', request);
    },
}; 