import { PrismaClient, PaymentStatus as PrismaPaymentStatus } from '../src/db/prisma-client'
import type { handleUnaryCall, sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { InitiatePaymentRequest, InitiatePaymentResponse, PaymentStatus as ProtoPaymentStatus, PaymentProvider } from '@nexura/grpc_gateway/protos'


const prisma = new PrismaClient()
const mapPaymentStatus = (status: ProtoPaymentStatus | undefined): PrismaPaymentStatus => {
  switch (status) {
    case ProtoPaymentStatus.PAYMENT_PENDING:
      return PrismaPaymentStatus.PAYMENT_PENDING
    case ProtoPaymentStatus.PAYMENT_PAID:
      return PrismaPaymentStatus.PAYMENT_PAID
    case ProtoPaymentStatus.PAYMENT_FAILED:
      return PrismaPaymentStatus.PAYMENT_FAILED
    case ProtoPaymentStatus.PAYMENT_CANCELLED:
      return PrismaPaymentStatus.PAYMENT_CANCELLED
    case ProtoPaymentStatus.PAYMENT_REFUNDED:
      return PrismaPaymentStatus.PAYMENT_REFUNDED
    default:
      return PrismaPaymentStatus.PAYMENT_PENDING
  }
}


export const InitiatePayment: handleUnaryCall<InitiatePaymentRequest, InitiatePaymentResponse> = async (call: ServerUnaryCall<InitiatePaymentRequest, InitiatePaymentResponse>, callback: sendUnaryData<InitiatePaymentResponse>) => {
  const { provider, amount, currency } = call.request;
  if (provider === PaymentProvider.COD) {
    const payment = await prisma.payment.create({
      data: {
        amount:   amount,
        currency: currency,
        provider: provider,
        status:   mapPaymentStatus(ProtoPaymentStatus.PAYMENT_PENDING),
      }
    })
    callback(null, { paymentId: payment.id, provider: provider, redirectUrl: "", status: ProtoPaymentStatus.PAYMENT_PENDING });
    
  }
  else {
    callback(new Error("Invalid payment provider"), null);
  }
}
