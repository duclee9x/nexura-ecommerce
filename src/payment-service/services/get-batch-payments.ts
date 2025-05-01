import { PrismaClient } from '../src/db/prisma-client'
import type { handleUnaryCall, sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { GetBatchPaymentsRequest, GetBatchPaymentsResponse, PaymentStatus } from '@nexura/grpc_gateway/protos'
import { Status } from '@grpc/grpc-js/build/src/constants'

const prisma = new PrismaClient()

export const GetBatchPayments: handleUnaryCall<GetBatchPaymentsRequest, GetBatchPaymentsResponse> = async (call: ServerUnaryCall<GetBatchPaymentsRequest, GetBatchPaymentsResponse>, callback: sendUnaryData<GetBatchPaymentsResponse>) => {
  try {
    const { paymentIds } = call.request;
    
    if (!paymentIds || paymentIds.length === 0) {
      callback(null, { payments: [] });
      return;
    }

    const payments = await prisma.payment.findMany({
      where: {
        id: { in: paymentIds }
      }
    });

    // Map Prisma payment to proto Payment message
    const paymentsProto = payments.map((payment) => ({
      id: payment.id,
      method: payment.provider,
      subtotal: payment.amount,
      total: payment.amount,
      status: payment.status as PaymentStatus,
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
    }));

    callback(null, { payments: paymentsProto });
  } catch (error) {
    console.error('Error in GetBatchPayments:', error);
    callback({
      code: Status.INTERNAL,
      message: 'Failed to fetch batch payments',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
