import { PrismaClient } from '../src/db/prisma-client'
import type { handleUnaryCall, sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { GetPaymentRequest, GetPaymentResponse, PaymentStatus } from '@nexura/grpc_gateway/protos'


const prisma = new PrismaClient()


export const GetPayment: handleUnaryCall<GetPaymentRequest, GetPaymentResponse> = async (call: ServerUnaryCall<GetPaymentRequest, GetPaymentResponse>, callback: sendUnaryData<GetPaymentResponse>) => {
  const { paymentId } = call.request;
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId
    }
  })

  if (!payment) {
    callback(new Error("Payment not found"), { payment: undefined });
    return;
  }

  // Map Prisma payment to proto Payment message
  const paymentProto = {
    id:        payment.id,
    method:    payment.provider,
    subtotal:  payment.amount,
    total:     payment.amount,
    status:    payment.status as PaymentStatus,
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt.toISOString(),
  };

  callback(null, { payment: paymentProto });
}
