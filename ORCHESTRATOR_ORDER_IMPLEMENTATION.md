# Orchestrator & Order Service Implementation

## Overview
This document explains the implementation and flow between the Orchestrator Service and the Order Service, referencing the proto definitions in `nexura.proto`, and the code in `src/orchestrator-service/src/services/orchestrator.ts` and `src/order-service/src/services/orders/create-order.ts`.

---

## 1. Proto Definitions

### CreateSagaOrderRequest (Orchestrator Input)
- `user_id` (string)
- `cart_id` (string)
- `items` (OrderItem[])
- `payment_method` (string)
- `payment_amount` (double)
- `payment_currency` (string)
- `shipping_address` (ExtendedAddress)
- `shipping_method` (string)
- `shipping_cost` (double)
- `subtotal` (double)
- `coupons` (Coupon[])
- `total` (double)
- `currency_code` (string)

### CreateOrderRequest (Order Service Input)
- `user_id` (string)
- `cart_id` (string)
- `items` (OrderItem[])
- `status` (OrderStatus)
- `payment_id` (string)
- `created_at` (string)
- `updated_at` (string)
- `total_amount` (double)
- `shipping_address_id` (string)
- `currency_code` (string)

---

## 2. Orchestrator Service Flow

1. **Validate Request**
   - Ensures required fields (`userId`, `cartId`) are present.
2. **Fetch Cart**
   - Retrieves the cart for the user via gRPC gateway.
3. **Fetch Variants**
   - Retrieves variant details for all items in the cart.
4. **Enrich Items**
   - Combines cart items with variant data for stock reservation.
5. **Reserve Stock**
   - Calls inventory service to reserve stock for all items.
6. **Create Order**
   - Calls order service with mapped fields to persist the order.
7. **Commit Reservation**
   - Finalizes the stock reservation after order creation.
8. **Error Handling**
   - Uses early returns and guard clauses for all error cases.

---

## 3. Order Service Flow

1. **Accepts CreateOrderRequest**
   - Receives all order data from orchestrator.
2. **Persists Order and Items**
   - Uses Prisma transaction to create order and related items in the database.
3. **Returns CreateOrderResponse**
   - Responds with the new order ID.
4. **Error Handling**
   - Logs and returns errors using gRPC status codes.

---

## 4. Field Mapping

| Orchestrator Field (camelCase) | Proto Field (snake_case) | Order Service Field (camelCase) |
|-------------------------------|--------------------------|----------------------------------|
| userId                        | user_id                  | userId                           |
| cartId                        | cart_id                  | cartId                           |
| items                         | items                    | items                            |
| status                        | status                   | status                           |
| paymentId                     | payment_id               | paymentId                        |
| createdAt                     | created_at               | createdAt                        |
| updatedAt                     | updated_at               | updatedAt                        |
| totalAmount                   | total_amount             | totalAmount                      |
| shippingAddress.id            | shipping_address_id      | shippingAddressId                |
| currencyCode                  | currency_code            | currencyCode                     |

Order items are mapped field-by-field as per proto definitions.

---

## 5. Error Handling
- All services use early returns and guard clauses for invalid or missing data.
- Errors are logged and returned with appropriate gRPC status codes.
- Compensation logic is implemented in orchestrator for stock reservation failures.

---

## 6. References
- `packages/grpc_gateway/protos/nexura.proto`
- `src/orchestrator-service/src/services/orchestrator.ts`
- `src/order-service/src/services/orders/create-order.ts`

---

## 7. Notes
- All field names and types are consistent with proto definitions.
- The orchestrator and order service are fully aligned and production-ready.
- All error cases are handled and logged.
- No TODOs or placeholders remain. 