/**
 * Workflow Result Model
 * 
 * This file defines the result structure returned by workflows.
 * It contains only essential information about the workflow execution outcome
 * and any data that should be returned to the caller.
 * 
 * IMPORTANT FOR PRODUCTION USE:
 * =============================================================================
 * This model provides a simplified template for prototype development.
 * For production systems, you should replace it with domain-specific result types
 * that contain only the fields relevant to your business domain.
 * 
 * PRODUCTION RECOMMENDATION:
 * - Define focused result types with specific fields rather than using this generic model
 * - Do NOT include the generic data object or activity history in production result types
 * 
 * Example for an order processing workflow:
 * 
 * class OrderProcessingResult {
 *   constructor(orderId, customerId, status) {
 *     // Only include success/failure status
 *     this.success = true;
 *     this.errorMessage = null;
 *     
 *     // Domain-specific result fields
 *     this.orderId = orderId;
 *     this.customerId = customerId;
 *     this.status = status;
 *     this.shippingMethod = null;
 *     this.trackingNumber = null;
 *     this.totalAmount = 0;
 *     this.paymentStatus = null;
 *   }
 * }
 * =============================================================================
 */

/**
 * Creates a new workflow result
 * 
 * @param {boolean} success - Whether the workflow was successful
 * @returns {Object} A new workflow result
 */
export function createWorkflowResult(success = true) {
  return {
    success:         success,
    data:            {},
    // Array of workflow activity info objects, not raw activity responses
    activityHistory: []
  };
}

/**
 * Creates a workflow result from a workflow state
 * 
 * @param {Object} state - The workflow state
 * @returns {Object} A workflow result
 */
export function createWorkflowResultFromState(state) {
  const result = createWorkflowResult(state.success);
  
  // Copy data from the state to the result
  result.data = { ...state.data };
  
  // Copy activity history from the state to the result
  result.activityHistory = [...state.activityHistory];
  
  return result;
}