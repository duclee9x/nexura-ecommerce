/*
 * =============================================================================
 * IMPORTANT: Keep Workflow Code Deterministic
 * =============================================================================
 *    - Don't use Date.now(), Math.random(), or crypto.randomUUID() directly
 *      Instead use: context.getCurrentUtcDateTime() for current time
 *    - Don't make direct I/O or service calls - use activities instead
 *      Example: const data = yield context.callActivity(makeHttpCall, url);
 *    - Don't use mutable static state or global variables
 *    - Always declare JavaScript workflows as generator functions, not async functions
 *      (The Node.js runtime doesn't guarantee that async functions are deterministic)
 * =============================================================================
 */

import { WorkflowState } from "../models/workflow-data";
import { getReplaySafeLogger } from "../utils/replay_safe_logger.js";
import type {
  createOrderActivityResponse,
  validateAndReserveStockActivityResponse,
  startOnlinePaymentActivityResponse,
} from "../models/activity-response";
import type { WorkflowContext } from "@dapr/dapr/index.js";
import {
  PaymentStatus,
  type CreateOrderRequest,
} from "@nexura/grpc_gateway/protos";

// Validation function for workflow input
function validateWorkflowInput(input: unknown): CreateOrderRequest {
  const data = input as CreateOrderRequest;
  const errors: string[] = [];

  if (!data.userId) {
    errors.push("User ID is required");
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push("At least one item is required");
  } else {
    data.items.forEach((item, index) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Product ID is required`);
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be a positive integer`);
      }
    });
  }

  if (!data.paymentMethod) {
    errors.push("Payment method is required");
  }

  if (!data.shippingAddress) {
    errors.push("Shipping address is required");
  }

  if (errors.length > 0) {
    throw new Error(`Invalid workflow input: ${errors.join(", ")}`);
  }

  return data;
}

// =============================================================================
// MAIN WORKFLOW FUNCTION
// This function orchestrates the entire workflow execution.
// =============================================================================
/**
 * orderProcessingWorkflow workflow implementation
 * Handles the end-to-end process for order processing with payment options and error handling.
 */
async function* orderProcessingWorkflow(
  context: WorkflowContext,
  input: unknown
): AsyncGenerator<any, WorkflowState, any> {
  const logger = getReplaySafeLogger(context);
  logger.info(`[Workflow] Starting workflow`);

  // Validate input
  const inputObject: CreateOrderRequest = validateWorkflowInput(input);

  // Create and initialize workflow data
  const workflowData = WorkflowState.fromInput(inputObject);

  try {
    logger.info(
      `[Workflow] Orchestrating activity: Creates a new order record in the system.`
    );
    const createOrderRecordResult: createOrderActivityResponse =
      yield context.callActivity("createOrderRecordActivity", inputObject);

    if (!createOrderRecordResult.success || !createOrderRecordResult.orderId) {
      throw new Error(
        createOrderRecordResult.error || "Failed to create order"
      );
    }

    // Store orderId
    workflowData.data.orderId = createOrderRecordResult.orderId;

    logger.info(
      `[Workflow] Orchestrating activity: Validates order details and reserves stock.`
    );
    const validateAndReserveStockResult: validateAndReserveStockActivityResponse =
      yield context.callActivity(
        "validateAndReserveStockActivity",
        inputObject
      );

    if (
      !validateAndReserveStockResult.success ||
      !validateAndReserveStockResult.reservationId
    ) {
      throw new Error(
        validateAndReserveStockResult.error ||
        "Failed to validate and reserve stock"
      );
    }

    // Store reservationId
    workflowData.data.reservationId =
      validateAndReserveStockResult.reservationId;

    // Process payment for both COD and online payments
    logger.info(
      `[Workflow] Starting payment processing for ${inputObject.paymentMethod}`
    );
    const startPaymentResult: startOnlinePaymentActivityResponse =
      yield context.callActivity("initiatePaymentActivity", {
        amount:   inputObject.paymentTotal,
        orderId:  workflowData.data.orderId,
        provider: inputObject.paymentMethod,
        userId:   inputObject.userId,
        items:    inputObject.items,
        currency: inputObject.currencyCode,
      });

    if (!startPaymentResult.success) {
      throw new Error(
        startPaymentResult.error || "Failed to start payment process"
      );
    }

    // Store payment info
    workflowData.data.paymentId = startPaymentResult.paymentId;

    // Update order with payment ID
    logger.info(`[Workflow] Updating order with payment information`);
    const updateOrderResult = yield context.callActivity(
      "updateOrderPaymentActivity",
      {
        orderId:       workflowData.data.orderId,
        paymentId:     startPaymentResult.paymentId,
        paymentMethod: inputObject.paymentMethod,
      }
    );

    if (!updateOrderResult.success) {
      throw new Error(
        updateOrderResult.error ||
        "Failed to update order with payment information"
      );
    }

    // For online payments, wait for confirmation
    if (inputObject.paymentMethod !== "COD") {
      logger.info(`[Workflow] Waiting for online payment confirmation`);
      const eventData = yield context.waitForExternalEvent(
        "payment_confirmation_received"
      );
      workflowData.data.paymentStatus = eventData?.status;

      if (workflowData.data.paymentStatus !== PaymentStatus.PAYMENT_PAID) {
        logger.info(`[Workflow] Online payment failed or was declined`);
        return yield* processCompensateReleaseStock(context, workflowData);
      }
    } else {
      // For COD, mark payment as pending
      workflowData.data.paymentStatus = PaymentStatus.PAYMENT_PENDING;
    }

    // If we reach here, either payment was successful (online) or pending (COD)
    logger.info(`[Workflow] Payment processed successfully`);
    return yield* processCommitStock(context, workflowData);
  } catch (err) {
    const error = err as Error;
    logger.error(`[Workflow] Error in workflow: ${error.message}`);
    workflowData.success = false;
    workflowData.data.error = error.message;
    return yield* processCompensateReleaseStock(context, workflowData);
  }
}

/**
 * Process workflow failure
 */
function processWorkflowFailed(
  context: WorkflowContext,
  workflowData: WorkflowState
): WorkflowState {
  const logger = getReplaySafeLogger(context);
  logger.info(`[Workflow] Workflow failed`);
  workflowData.success = false;
  return workflowData;
}

/**
 * Process stock commitment
 */
async function* processCommitStock(
  context: WorkflowContext,
  workflowData: WorkflowState
): AsyncGenerator<any, WorkflowState, any> {
  const logger = getReplaySafeLogger(context);

  try {
    logger.info(`[Workflow] Committing stock reservation`);
    const commitStockResult = yield context.callActivity(
      "commitStockActivity",
      {
        reservationId: workflowData.data.reservationId,
        orderId:       workflowData.data.orderId,
      }
    );

    if (!commitStockResult.success) {
      throw new Error(commitStockResult.error || "Failed to commit stock");
    }

    logger.info(`[Workflow] Notifying customer`);
    yield context.callActivity("notifyCustomerActivity", workflowData.data);

    workflowData.success = true;
    return workflowData;
  } catch (err) {
    const error = err as Error;
    logger.error(`[Workflow] Error in commit stock process: ${error.message}`);
    workflowData.success = false;
    workflowData.data.error = error.message;
    return yield* processCompensateReleaseStock(context, workflowData);
  }
}

/**
 * Process compensation (release stock)
 */
async function* processCompensateReleaseStock(
  context: WorkflowContext,
  workflowData: WorkflowState
): AsyncGenerator<any, WorkflowState, any> {
  const logger = getReplaySafeLogger(context);

  try {
    if (workflowData.data.reservationId) {
      logger.info(`[Workflow] Releasing reserved stock`);
      yield context.callActivity("compensateReleaseStockActivity", {
        reservationId: workflowData.data.reservationId,
        orderId:       workflowData.data.orderId,
      });
    }

    if (workflowData.data.orderId) {
      logger.info(`[Workflow] Cancelling order`);
      yield context.callActivity("compensateCancelOrderActivity", {
        orderId: workflowData.data.orderId,
      });
    }

    return processWorkflowFailed(context, workflowData);
  } catch (err) {
    const error = err as Error;
    logger.error(`[Workflow] Error in compensation process: ${error.message}`);
    workflowData.success = false;
    workflowData.data.error = error.message;
    return processWorkflowFailed(context, workflowData);
  }
}

export { orderProcessingWorkflow };
