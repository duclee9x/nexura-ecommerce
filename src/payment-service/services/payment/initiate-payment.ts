import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js'
import { InitiatePaymentRequest, InitiatePaymentResponse, PaymentStatus } from '../../proto/nexura'

const prisma = new PrismaClient()
const payments: Record<string, { status: PaymentStatus, redirectUrl: string }> = {};


export const InitiatePayment: UntypedHandleCall = async (call: ServerUnaryCall<InitiatePaymentRequest, InitiatePaymentResponse>, callback: sendUnaryData<InitiatePaymentResponse>) => {
  const { amount, provider, currency } = call.request;
    
  const id = `pay_${Date.now()}`;
  const url = `https://mockpay.com/redirect/${id}`;
  payments[id] = { status: PaymentStatus.PENDING, redirectUrl: url };

  const res = {
    paymentId: id,
    redirectUrl: url,
    status: PaymentStatus.PENDING
  }

  callback(null, res);
}
