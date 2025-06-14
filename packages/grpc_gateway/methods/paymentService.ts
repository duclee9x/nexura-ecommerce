import { PaymentServiceClient, InitiatePaymentRequest, InitiatePaymentResponse, GetPaymentRequest, GetPaymentResponse, GetBatchPaymentsRequest, GetBatchPaymentsResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';
const DAPR_PORT = process.env.DAPR_PORT;
if (!DAPR_PORT){
  throw Error("not found port");
}
const paymentConfig = createServiceConfig('PaymentService', DAPR_PORT);
const paymentClient = createClient(PaymentServiceClient, paymentConfig);

export const paymentService = {
  initiatePayment: async (request: InitiatePaymentRequest): Promise<InitiatePaymentResponse> => {
    return promisifyGrpcCall(paymentClient, 'initiatePayment', request);
  },
  getPayment: async (request: GetPaymentRequest): Promise<GetPaymentResponse> => {
    return promisifyGrpcCall(paymentClient, 'getPayment', request);
  },
  getBatchPayments: async (request: GetBatchPaymentsRequest): Promise<GetBatchPaymentsResponse> => {
    return promisifyGrpcCall(paymentClient, 'getBatchPayments', request);
  }


}; 