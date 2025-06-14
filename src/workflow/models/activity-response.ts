import { ActivityResponse } from './workflow-data';
import { 
  OrderStatus, 
  PaymentStatus,
  PaymentProvider,
  CreateOrderResponse as NexuraCreateOrderResponse,
  ValidateAndReserveResponse as NexuraValidateAndReserveResponse,
  CommitReservationResponse as NexuraCommitReservationResponse,
  ReleaseReservationResponse as NexuraReleaseReservationResponse,
  InitiatePaymentResponse as NexuraInitiatePaymentResponse,
  GetPaymentStatusResponse as NexuraGetPaymentStatusResponse,
  CancelOrderResponse as NexuraCancelOrderResponse,
  UpdateOrderStatusResponse as NexuraUpdateOrderStatusResponse,
  UpdateOrderPaymentResponse as NexuraUpdateOrderPaymentResponse,
  ValidationError,
  OrderStep
} from '@nexura/grpc_gateway/protos';

/**
 * Response for createOrder activity
 */
export class createOrderActivityResponse extends ActivityResponse implements NexuraCreateOrderResponse {
  orderId: string;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.orderId = '';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      orderId: this.orderId
    };
  }
}

/**
 * Response for validateAndReserveStock activity
 */
export class validateAndReserveStockActivityResponse extends ActivityResponse implements NexuraValidateAndReserveResponse {
  success:          boolean;
  reservationId:    string;
  validationErrors: ValidationError[];
  items: Array<{
    productId:   string;
    quantity:    number;
    warehouseId: string;
  }>;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.reservationId = '';
    this.validationErrors = [];
    this.items = [];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success:          this.success,
      reservationId:    this.reservationId,
      validationErrors: this.validationErrors,
      items:            this.items
    };
  }
}

/**
 * Response for startOnlinePayment activity
 */
export class startOnlinePaymentActivityResponse extends ActivityResponse implements NexuraInitiatePaymentResponse {
  paymentId:   string;
  provider:    PaymentProvider;
  redirectUrl: string;
  status:      PaymentStatus;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.paymentId = '';
    this.provider = PaymentProvider.COD;
    this.redirectUrl = '';
    this.status = PaymentStatus.PAYMENT_PENDING;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      paymentId:   this.paymentId,
      provider:    this.provider,
      redirectUrl: this.redirectUrl,
      status:      this.status
    };
  }
}

/**
 * Response for waitForPaymentConfirmation activity
 */
export class waitForPaymentConfirmationActivityResponse extends ActivityResponse implements NexuraGetPaymentStatusResponse {
  status:        PaymentStatus;
  transactionId: string;
  amount:        number;
  currency:      string;
  error:         string;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.status = PaymentStatus.PAYMENT_PENDING;
    this.transactionId = '';
    this.amount = 0;
    this.currency = '';
    this.error = '';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      status:        this.status,
      transactionId: this.transactionId,
      amount:        this.amount,
      currency:      this.currency,
      error:         this.error
    };
  }
}

/**
 * Response for commitStock activity
 */
export class commitStockActivityResponse extends ActivityResponse implements NexuraCommitReservationResponse {
  success: boolean;
  message: string;
  orderId: string;
  error:   string;
  items: Array<{
    productId:   string;
    quantity:    number;
    warehouseId: string;
  }>;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.message = '';
    this.orderId = '';
    this.error = '';
    this.items = [];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success: this.success,
      message: this.message,
      orderId: this.orderId,
      error:   this.error,
      items:   this.items
    };
  }
}

/**
 * Response for compensateReleaseStock activity
 */
export class compensateReleaseStockActivityResponse extends ActivityResponse implements NexuraReleaseReservationResponse {
  success: boolean;
  message: string;
  error:   string;
  items: Array<{
    productId:   string;
    quantity:    number;
    warehouseId: string;
  }>;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.message = '';
    this.error = '';
    this.items = [];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success: this.success,
      message: this.message,
      error:   this.error,
      items:   this.items
    };
  }
}

/**
 * Response for compensateCancelOrder activity
 */
export class compensateCancelOrderActivityResponse extends ActivityResponse implements NexuraCancelOrderResponse {
  success: boolean;
  message: string;
  error:   string;
  orderId: string;
  status:  OrderStatus;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.message = '';
    this.error = '';
    this.orderId = '';
    this.status = OrderStatus.ORDER_CANCELLED;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success: this.success,
      message: this.message,
      error:   this.error,
      orderId: this.orderId,
      status:  this.status
    };
  }
}

/**
 * Response for workflowFailed activity
 */
export class workflowFailedActivityResponse extends ActivityResponse implements NexuraUpdateOrderStatusResponse {
  success: boolean;
  message: string;
  error:   string;
  orderId: string;
  status:  OrderStatus;
  steps:   OrderStep[];

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.message = '';
    this.error = '';
    this.orderId = '';
    this.status = OrderStatus.ORDER_FAILED;
    this.steps = [];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success: this.success,
      message: this.message,
      error:   this.error,
      orderId: this.orderId,
      status:  this.status,
      steps:   this.steps
    };
  }
}

/**
 * Response for workflowComplete activity
 */
export class workflowCompleteActivityResponse extends ActivityResponse implements NexuraUpdateOrderStatusResponse {
  success: boolean;
  message: string;
  error:   string;
  orderId: string;
  status:  OrderStatus;
  steps:   OrderStep[];

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.message = '';
    this.error = '';
    this.orderId = '';
    this.status = OrderStatus.ORDER_COMPLETED;
    this.steps = [];
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success: this.success,
      message: this.message,
      error:   this.error,
      orderId: this.orderId,
      status:  this.status,
      steps:   this.steps
    };
  }
}

/**
 * Response for notifyCustomer activity
 */
export class notifyCustomerActivityResponse extends ActivityResponse {
  success:          boolean;
  error:            string;
  notificationType: 'EMAIL' | 'SMS' | 'PUSH';
  notificationId:   string;
  recipientId:      string;
  sentTime:         string;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.error = '';
    this.notificationType = 'EMAIL';
    this.notificationId = '';
    this.recipientId = '';
    this.sentTime = new Date().toISOString();
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success:          this.success,
      error:            this.error,
      notificationType: this.notificationType,
      notificationId:   this.notificationId,
      recipientId:      this.recipientId,
      sentTime:         this.sentTime
    };
  }
}

/**
 * Response for updateOrderPayment activity
 */
export class updateOrderPaymentActivityResponse extends ActivityResponse implements NexuraUpdateOrderPaymentResponse {
  success:   boolean;
  error:     string;
  orderId:   string;
  paymentId: string;

  constructor(startTime: number = Date.now()) {
    super(true, {}, null, startTime);
    this.success = false;
    this.error = '';
    this.orderId = '';
    this.paymentId = '';
  }

  toJSON() {
    return {
      ...super.toJSON(),
      success:   this.success,
      error:     this.error,
      orderId:   this.orderId,
      paymentId: this.paymentId,
    };
  }
} 