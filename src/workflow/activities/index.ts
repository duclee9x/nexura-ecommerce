import type { WorkflowActivityContext } from "@dapr/dapr/index.js";
import type { WorkflowRuntime } from "@dapr/dapr";

import {
  createOrderActivityResponse,
  validateAndReserveStockActivityResponse,
  startOnlinePaymentActivityResponse,
  waitForPaymentConfirmationActivityResponse,
  commitStockActivityResponse,
  compensateReleaseStockActivityResponse,
  compensateCancelOrderActivityResponse,
  workflowFailedActivityResponse,
  workflowCompleteActivityResponse,
  notifyCustomerActivityResponse,
  updateOrderPaymentActivityResponse,
} from "../models/activity-response.js";

import {
  createOrderGateway,
  validateAndReserveGateway,
  commitReservationGateway,
  releaseReservationGateway,
  initiatePaymentGateway,
  getPaymentGateway,
  cancelOrderGateway,
  updateOrderStatusGateway,
  updateOrderPaymentGateway,
} from "@nexura/grpc_gateway/gateway";

import {
  OrderStatus,
  PaymentProvider,
} from "@nexura/grpc_gateway/protos";
import type {
  ValidateAndReserveRequest,
  CommitReservationRequest,
  ReleaseReservationRequest,
  InitiatePaymentRequest,
  GetPaymentRequest,
  CreateOrderRequest,
  UpdateOrderPaymentRequest,
} from "@nexura/grpc_gateway/protos";
import type { WorkflowStateData } from "../models/workflow-data";

// Setup logging helpers
const log = (msg: string) => console.log(msg);
const error = (msg: string) => console.error(msg);


/**
 * createOrderRecordActivity - Creates an order record in the system.
 */
export async function createOrderRecordActivity(
  context: WorkflowActivityContext,
  input: CreateOrderRequest
): Promise<createOrderActivityResponse> {
  log(`[Activity] Executing createOrderRecordActivity`);

  const response = new createOrderActivityResponse();

  try {
    if (!input.userId || !input.items || !input.cartId) {
      throw new Error("Missing required fields: userId, items, or cartId");
    }

    // Forward the request as is since it matches the type
    const createOrderResponse = await createOrderGateway(input);

    response.success = true;
    response.orderId = createOrderResponse.orderId;
    response.endTime = Date.now();
    log(`[Activity] createOrderRecordActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] createOrderRecordActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to create order";
  }

  return response;
}

/**
 * validateAndReserveStockActivity - Validates and reserves stock for items.
 */
export async function validateAndReserveStockActivity(
  context: WorkflowActivityContext,
  input: CreateOrderRequest
): Promise<validateAndReserveStockActivityResponse> {
  log(`[Activity] Executing validateAndReserveStockActivity`);

  const response = new validateAndReserveStockActivityResponse();

  try {
    if (!input.userId || !input.items) {
      throw new Error("Missing required fields: userId or items");
    }

    const validateRequest: ValidateAndReserveRequest = {
      userId: input.userId,
      items:  input.items,
    };

    const validateResponse = await validateAndReserveGateway(validateRequest);

    response.success = validateResponse.success;
    response.reservationId = validateResponse.reservationId;
    response.validationErrors = validateResponse.validationErrors;
    response.endTime = Date.now();

    log(`[Activity] validateAndReserveStockActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] validateAndReserveStockActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to validate and reserve stock";
  }

  return response;
}

/**
 * initiatePaymentActivity - Initiates the payment process for any payment method.
 */
export async function initiatePaymentActivity(
  context: WorkflowActivityContext,
  input: InitiatePaymentRequest
): Promise<startOnlinePaymentActivityResponse> {
  log(`[Activity] Executing initiatePaymentActivity`);

  const response = new startOnlinePaymentActivityResponse();

  try {
    if (!input.amount) {
      response.success = false;
      throw new Error("Missing required field: amount");
    }

    const paymentRequest: InitiatePaymentRequest = {
      amount: input.amount,
      provider:
        input.provider === "STRIPE"
          ? PaymentProvider.STRIPE
          : input.provider === "VNPAY"
            ? PaymentProvider.VNPAY
            : PaymentProvider.COD,
      currency: input.currency,
    };
    try {
      const paymentResponse = await initiatePaymentGateway(paymentRequest);

      response.success = true;
      response.paymentId = paymentResponse.paymentId;
      response.provider = paymentResponse.provider;
      // Only set redirectUrl for STRIPE or VNPAY
      if (input.provider === PaymentProvider.STRIPE || input.provider === PaymentProvider.VNPAY) {
        response.redirectUrl = paymentResponse.redirectUrl;
      } else {
        response.redirectUrl = ""; // Empty string for COD
      }
    } catch (err: unknown) {
      error(`[Activity] initiatePaymentActivity failed: ${err}`);
      response.error = err instanceof Error ? err.message : "Failed to initiate payment";
      response.success = false;
    }

    response.endTime = Date.now();

    log(`[Activity] initiatePaymentActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] initiatePaymentActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to initiate payment";
  }

  return response;
}

/**
 * waitForPaymentConfirmationActivity - Waits for payment confirmation event.
 */
export async function waitForPaymentConfirmationActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<waitForPaymentConfirmationActivityResponse> {
  log(`[Activity] Executing waitForPaymentConfirmationActivity`);

  const response = new waitForPaymentConfirmationActivityResponse();

  try {
    if (!input.orderId || !input.paymentId) {
      throw new Error("Missing required fields: orderId or paymentId");
    }

    const paymentStatusRequest: GetPaymentRequest = {
      paymentId: input.paymentId,
    };

    const paymentResponse = await getPaymentGateway(paymentStatusRequest);
    const payment = paymentResponse.payment;

    if (!payment) {
      throw new Error("Payment not found");
    }

    response.success = true;
    response.status = payment.status;
    response.transactionId = payment.id;
    response.amount = payment.total;
    response.currency = "USD";
    response.endTime = Date.now();

    log(`[Activity] waitForPaymentConfirmationActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] waitForPaymentConfirmationActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to get payment status";
  }

  return response;
}

/**
 * commitStockActivity - Commits the reserved stock.
 */
export async function commitStockActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<commitStockActivityResponse> {
  log(`[Activity] Executing commitStockActivity`);

  const response = new commitStockActivityResponse();

  try {
    if (!input.orderId || !input.reservationId) {
      throw new Error("Missing required fields: orderId or reservationId");
    }

    const commitRequest: CommitReservationRequest = {
      orderId:       input.orderId,
      reservationId: input.reservationId,
    };

    const commitResponse = await commitReservationGateway(commitRequest);

    response.success = commitResponse.success;
    response.message = commitResponse.message;
    response.orderId = commitResponse.orderId;
    response.endTime = Date.now();

    log(`[Activity] commitStockActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] commitStockActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to commit stock reservation";
  }

  return response;
}

/**
 * compensateReleaseStockActivity - Releases the reserved stock.
 */
export async function compensateReleaseStockActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<compensateReleaseStockActivityResponse> {
  log(`[Activity] Executing compensateReleaseStockActivity`);

  const response = new compensateReleaseStockActivityResponse();

  try {
    if (!input.orderId || !input.reservationId) {
      throw new Error("Missing required fields: orderId or reservationId");
    }

    const releaseRequest: ReleaseReservationRequest = {
      reservationId: input.reservationId,
    };

    const releaseResponse = await releaseReservationGateway(releaseRequest);

    response.success = releaseResponse.success;
    response.message = releaseResponse.message;
    response.endTime = Date.now();

    log(`[Activity] compensateReleaseStockActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] compensateReleaseStockActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to release stock reservation";
  }

  return response;
}

/**
 * compensateCancelOrderActivity - Cancels the order.
 */
export async function compensateCancelOrderActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<compensateCancelOrderActivityResponse> {
  log(`[Activity] Executing compensateCancelOrderActivity`);

  const response = new compensateCancelOrderActivityResponse();

  try {
    if (!input.orderId) {
      throw new Error("Missing required field: orderId");
    }

    await cancelOrderGateway({ orderId: input.orderId });

    response.success = true;
    response.message = "Order cancelled successfully";
    response.orderId = input.orderId;
    response.status = OrderStatus.ORDER_CANCELLED;
    response.endTime = Date.now();

    log(`[Activity] compensateCancelOrderActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] compensateCancelOrderActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to cancel order";
  }

  return response;
}

/**
 * workflowFailedActivity - Marks the workflow as failed.
 */
export async function workflowFailedActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<workflowFailedActivityResponse> {
  log(`[Activity] Executing workflowFailedActivity`);

  const response = new workflowFailedActivityResponse();

  try {
    if (!input.orderId) {
      throw new Error("Missing required field: orderId");
    }

    await updateOrderStatusGateway({
      orderId: input.orderId,
      status:  OrderStatus.ORDER_FAILED,
    });

    response.success = true;
    response.message = "Workflow marked as failed";
    response.orderId = input.orderId;
    response.status = OrderStatus.ORDER_FAILED;
    response.steps = []; // This should be populated with the workflow history
    response.endTime = Date.now();

    log(`[Activity] workflowFailedActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] workflowFailedActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to mark workflow as failed";
  }

  return response;
}

/**
 * workflowCompleteActivity - Marks the workflow as completed.
 */
export async function workflowCompleteActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<workflowCompleteActivityResponse> {
  log(`[Activity] Executing workflowCompleteActivity`);

  const response = new workflowCompleteActivityResponse();

  try {
    if (!input.orderId) {
      throw new Error("Missing required field: orderId");
    }

    await updateOrderStatusGateway({
      orderId: input.orderId,
      status:  OrderStatus.ORDER_COMPLETED,
    });

    response.success = true;
    response.message = "Workflow completed successfully";
    response.orderId = input.orderId;
    response.status = OrderStatus.ORDER_COMPLETED;
    response.steps = []; // This should be populated with the workflow history
    response.endTime = Date.now();

    log(`[Activity] workflowCompleteActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] workflowCompleteActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to mark workflow as completed";
  }

  return response;
}

/**
 * notifyCustomerActivity - Sends order confirmation notification.
 */
export async function notifyCustomerActivity(
  context: WorkflowActivityContext,
  input: WorkflowStateData
): Promise<notifyCustomerActivityResponse> {
  log(`[Activity] Executing notifyCustomerActivity`);

  const response = new notifyCustomerActivityResponse();

  try {
    if (!input.orderId || !input.userId) {
      throw new Error("Missing required fields: orderId or userId");
    }

    // Simulate notification being sent
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    response.success = true;
    response.notificationType = "EMAIL";
    response.notificationId = `notification-${Date.now()}`;
    response.recipientId = input.userId;
    response.sentTime = new Date().toISOString();
    response.endTime = Date.now();

    log(`[Activity] notifyCustomerActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] notifyCustomerActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to send notification";
  }

  return response;
}

/**
 * updateOrderPaymentActivity - Updates order with payment information.
 */
export async function updateOrderPaymentActivity(
  context: WorkflowActivityContext,
  input: UpdateOrderPaymentRequest
): Promise<updateOrderPaymentActivityResponse> {
  log(`[Activity] Executing updateOrderPaymentActivity`);

  const response = new updateOrderPaymentActivityResponse();

  try {
    if (!input.orderId || !input.paymentId) {
      throw new Error("Missing required fields: orderId or paymentId");
    }

    await updateOrderPaymentGateway(input);

    response.success = true;
    response.orderId = input.orderId;
    response.paymentId = input.paymentId;

    log(`[Activity] updateOrderPaymentActivity completed successfully`);
  } catch (err: unknown) {
    error(`[Activity] updateOrderPaymentActivity failed: ${err}`);
    response.error = err instanceof Error ? err.message : "Failed to update order with payment information";
    response.success = false;
  }

  return response;
}

// Export all activities
export const activities = {
  createOrderRecordActivity,
  validateAndReserveStockActivity,
  initiatePaymentActivity,
  waitForPaymentConfirmationActivity,
  commitStockActivity,
  compensateReleaseStockActivity,
  compensateCancelOrderActivity,
  workflowFailedActivity,
  workflowCompleteActivity,
  notifyCustomerActivity,
  updateOrderPaymentActivity,
};

// Register all activities
export function registerActivities(workflowRuntime: WorkflowRuntime): void {
  workflowRuntime.registerActivity(createOrderRecordActivity);
  workflowRuntime.registerActivity(validateAndReserveStockActivity);
  workflowRuntime.registerActivity(initiatePaymentActivity);
  workflowRuntime.registerActivity(waitForPaymentConfirmationActivity);
  workflowRuntime.registerActivity(commitStockActivity);
  workflowRuntime.registerActivity(compensateReleaseStockActivity);
  workflowRuntime.registerActivity(compensateCancelOrderActivity);
  workflowRuntime.registerActivity(workflowFailedActivity);
  workflowRuntime.registerActivity(workflowCompleteActivity);
  workflowRuntime.registerActivity(notifyCustomerActivity);
  workflowRuntime.registerActivity(updateOrderPaymentActivity);
}
