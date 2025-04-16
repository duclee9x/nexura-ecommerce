import { UntypedServiceImplementation } from '@grpc/grpc-js'
import { InitiatePayment } from './payment/initiate-payment'

export const paymentService: UntypedServiceImplementation = {
  initiatePayment: InitiatePayment,
  verifyPayment: VerifyPayment,
  cancelPayment: CancelPayment,
  refundPayment: RefundPayment,
  GetPaymentStatus: GetPaymentStatus,  
} 