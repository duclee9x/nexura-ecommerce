import { Order, CreateOrderRequest, OrderServiceClient, OrderStatus, CreateOrderResponse, GetOrderStatusResponse, GetOrderResponse, CancelOrderResponse, UpdateOrderStatusResponse, ReleaseReservationRequest, ValidateAndReserveRequest, ValidateAndReserveResponse, ReleaseReservationResponse, CommitReservationRequest, CommitReservationResponse, ListOrdersResponse, ListOrdersRequest, AddOrderNoteRequest, DeleteOrderNoteRequest, DeleteOrderNoteResponse, AddOrderNoteResponse, UpdateTrackingNumberRequest, UpdateTrackingNumberResponse, ListAllOrdersResponse, GetOrdersForAdminResponse, GetOrderStatusRequest, GetOrderRequest, GetOrdersForAdminRequest, CancelOrderRequest, UpdateOrderStatusRequest, UpdateOrderPaymentRequest, UpdateOrderPaymentResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';
const DAPR_PORT = process.env.DAPR_PORT;
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT;
if (!DAPR_PORT || !DAPR_HTTP_PORT){
  throw Error("not found port");
}
const orderConfig = createServiceConfig('OrderService', DAPR_PORT);
const orderClient = createClient(OrderServiceClient, orderConfig);

const workflowConfig = createServiceConfig('WorkflowService', DAPR_PORT, Number(DAPR_HTTP_PORT));
export const orderService = {
  createOrder: async (request: CreateOrderRequest): Promise<CreateOrderResponse> => {
    return promisifyGrpcCall(orderClient, 'createOrder', request);
  },
  createOrderWorkflow: async (request: CreateOrderRequest): Promise<{ instanceID: string }> => {
    const response = await fetch(`${workflowConfig.daprEndpoint}/v1.0/workflows/dapr/orderProcessingWorkflow/start`, {
      method: 'POST',
      body:   JSON.stringify(request),
    }).then(res => res.json());
    return response as { instanceID: string };
  },

  updateOrderPayment: async (request: UpdateOrderPaymentRequest): Promise<UpdateOrderPaymentResponse> => {
    return promisifyGrpcCall(orderClient, 'updateOrderPayment', request);
  },
  getOrderWorkflow: async (instanceID: string) => {
    return fetch(`${workflowConfig.daprEndpoint}/v1.0/workflows/dapr/${instanceID}`, {
      method: 'GET',
    }).then(res => res.json());
  },
  getOrderStatus: async (request: GetOrderStatusRequest): Promise<GetOrderStatusResponse> => {
    return promisifyGrpcCall(orderClient, 'getOrderStatus', request);
  },
  getOrder: async (request: GetOrderRequest): Promise<GetOrderResponse> => {
    return promisifyGrpcCall(orderClient, 'getOrder', request);
  },
  getOrdersForAdmin: async (request: GetOrdersForAdminRequest): Promise<GetOrdersForAdminResponse> => {
    return promisifyGrpcCall(orderClient, 'getOrdersForAdmin', request);
  },

  cancelOrder: async (request: CancelOrderRequest): Promise<CancelOrderResponse> => {
    return promisifyGrpcCall(orderClient, 'cancelOrder', request);
  },
  updateOrderStatus: async (request: UpdateOrderStatusRequest): Promise<UpdateOrderStatusResponse> => {
    return promisifyGrpcCall(orderClient, 'updateOrderStatus', request);
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