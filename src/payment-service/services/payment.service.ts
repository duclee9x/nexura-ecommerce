import type { UntypedServiceImplementation } from '@grpc/grpc-js'
import { InitiatePayment } from './initiate-payment'
import { GetPayment } from './get-payment'
import { GetBatchPayments } from './get-batch-payments'
// import { VerifyPayment } from './payment/verify-payment'
// import { CancelPayment } from './payment/cancel-payment'
// import { RefundPayment } from './payment/refund-payment'
// import { GetPaymentStatus } from './payment/get-payment-status'

export const paymentService: UntypedServiceImplementation = {
  initiatePayment: InitiatePayment,
  getPayment: GetPayment,
  getBatchPayments: GetBatchPayments
  // verifyPayment: VerifyPayment,
  // cancelPayment: CancelPayment,
  // refundPayment: RefundPayment,
  // GetPaymentStatus: GetPaymentStatus,  
} 