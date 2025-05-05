import { Effect, pipe, Layer, Context, Data } from "effect"
import type { UntypedServiceImplementation } from "@grpc/grpc-js"
import type { ServerUnaryCall } from '@grpc/grpc-js'
import { 
    CreateSagaOrderRequest, 
    CreateSagaOrderResponse, 
    OrderStatus, 
    CartItem, 
    CreateOrderRequest, 
    VariantCart,
    InitiatePaymentRequest,
    InitiatePaymentResponse,
    PaymentStatus,
    PaymentProvider,
} from '@nexura/grpc_gateway/protos'
import { 
    getCartGateway, 
    getVariantsForCartGateway, 
    validateAndReserveGateway, 
    releaseReservationGateway, 
    commitReservationGateway, 
    createOrderGateway, 
    initiatePaymentGateway
} from '@nexura/grpc_gateway/gateway'
import { runSaga } from './sagaRunner'

// Service interfaces
interface CartService {
    getCart: (userId: string) => Effect.Effect<{ id: string; items: CartItem[] }, GatewayError>
}

interface VariantService {
    getVariants: (variantIds: string[]) => Effect.Effect<{ variants: VariantCart[] }, GatewayError>
}

interface InventoryService {
    reserveStock: (userId: string, items: { id: string; price: number; quantity: number; image: string }[]) => Effect.Effect<{ success: boolean; reservationId: string; validationErrors: Array<{ variantId: string; error: string }> }, GatewayError>
    commitReservation: (reservationId: string, orderId: string) => Effect.Effect<void, GatewayError>
    releaseReservation: (reservationId: string) => Effect.Effect<void, GatewayError>
}

interface PaymentService {
    initiatePayment: (request: InitiatePaymentRequest) => Effect.Effect<InitiatePaymentResponse, GatewayError>
}

interface OrderService {
    createOrder: (request: CreateOrderRequest) => Effect.Effect<{ id: string }, GatewayError>
}

// Service contexts
const CartService = Context.GenericTag<CartService>("CartService")
const VariantService = Context.GenericTag<VariantService>("VariantService")
const InventoryService = Context.GenericTag<InventoryService>("InventoryService")
const PaymentService = Context.GenericTag<PaymentService>("PaymentService")
const OrderService = Context.GenericTag<OrderService>("OrderService")

// Error types
class ValidationError extends Data.TaggedError("ValidationError")<{
    message: string
}> {}

class GatewayError extends Data.TaggedError("GatewayError")<{
    message: string
    service: string
}> {}

class SagaError extends Data.TaggedError("SagaError")<{
    message: string
    step: string
}> {}

// Types
interface EnrichedCartItem extends CartItem {
    variant: VariantCart,
    price: number,
    productName: string,
    productSlug: string,
    variantName: string,
    sku: string
}

// Service implementations
const cartService = Layer.succeed(CartService, {
    getCart: (userId: string) => 
        Effect.tryPromise({
            try: () => getCartGateway({ userId }),
            catch: (error) => new GatewayError({ message: String(error), service: 'cart' })
        }).pipe(
            Effect.flatMap(response => 
                !response?.cart 
                    ? Effect.fail(new GatewayError({ message: 'Cart not found', service: 'cart' }))
                    : Effect.succeed(response.cart)
            )
        )
})

const variantService = Layer.succeed(VariantService, {
    getVariants: (variantIds: string[]) =>
        Effect.tryPromise({
            try: () => getVariantsForCartGateway({ variantIds }),
            catch: (error) => new GatewayError({ message: String(error), service: 'variants' })
        })
})

const inventoryService = Layer.succeed(InventoryService, {
    reserveStock: (userId: string, items: { id: string; price: number; quantity: number; image: string }[]) => 
        Effect.tryPromise({
            try: () => validateAndReserveGateway({
                userId,
                items
            }),
            catch: (error) => new GatewayError({ message: String(error), service: 'inventory' })
        }).pipe(
            Effect.map(response => ({
                success: response.success,
                reservationId: response.reservationId,
                validationErrors: response.validationErrors
            }))
        ),
    commitReservation: (reservationId: string, orderId: string) =>
        Effect.gen(function* (_) {
            return yield* _(
                Effect.tryPromise({
                    try: () => commitReservationGateway({ reservationId, orderId }),
                    catch: (error) => new GatewayError({ message: String(error), service: 'inventory' })
                })
            );
        }),
    releaseReservation: (reservationId: string) =>
        Effect.tryPromise({
            try: () => releaseReservationGateway({ reservationId }),
            catch: (error) => new GatewayError({ message: String(error), service: 'inventory' })
        })
})

const paymentService = Layer.succeed(PaymentService, {
    initiatePayment: (request: InitiatePaymentRequest) =>
        Effect.tryPromise({
            try: () => initiatePaymentGateway(request),
            catch: (error) => new GatewayError({ message: String(error), service: 'payment' })
        })
})

const orderService = Layer.succeed(OrderService, {
    createOrder: (request: CreateOrderRequest) =>
        Effect.tryPromise({
            try: () => createOrderGateway(request),
            catch: (error) => new GatewayError({ message: String(error), service: 'order' })
        }).pipe(
            Effect.map(response => ({ id: response.orderId }))
        )
})

// Combine all services
const services = Layer.mergeAll(
    cartService,
    variantService,
    inventoryService,
    paymentService,
    orderService
)

// Validation
const validateRequest = (request: CreateSagaOrderRequest): Effect.Effect<CreateSagaOrderRequest, ValidationError> => {
    if (!request.userId) {
        return Effect.fail(new ValidationError({ message: 'User ID is required' }))
    }
    if (!request.cartId) {
        return Effect.fail(new ValidationError({ message: 'Cart ID is required' }))
    }
    if (!request.paymentMethod) {
        return Effect.fail(new ValidationError({ message: 'Payment method is required' }))
    }
    if (!request.total) {
        return Effect.fail(new ValidationError({ message: 'Total amount is required' }))
    }
    if (!request.shippingAddress) {
        return Effect.fail(new ValidationError({ message: 'Shipping address is required' }))
    }
    return Effect.succeed(request)
}

const enrichCartItems = (items: CartItem[], variants: VariantCart[]): Effect.Effect<EnrichedCartItem[], ValidationError> =>
    Effect.forEach(items, (item: CartItem) => {
        const variant = variants.find(v => v.id === item.variantId)
        if (!variant) {
            return Effect.fail(new ValidationError({ message: `Variant not found for item ${item.id}` }))
        }
        return Effect.succeed({ 
            ...item, 
            variant,
            price: variant.price,
            productName: variant.productName,
            productSlug: variant.productSlug,
            variantName: variant.variantName,
            sku: variant.sku
        })
    })

// Main saga implementation
const createSagaOrder = (call: ServerUnaryCall<CreateSagaOrderRequest, CreateSagaOrderResponse>): Effect.Effect<CreateSagaOrderResponse, ValidationError | GatewayError | SagaError> => {
    return pipe(
        Effect.succeed(call.request),
        Effect.flatMap(validateRequest),
        Effect.flatMap(request => 
            Effect.gen(function* (_) {
                const cart = yield* _(Effect.flatMap(CartService, service => service.getCart(request.userId)))
                
                if (cart.id !== request.cartId) {
                    return yield* _(Effect.fail(new ValidationError({ message: 'Cart ID mismatch' })))
                }

                const variantIds = cart.items.map(item => item.variantId)
                const variants = yield* _(Effect.flatMap(VariantService, service => service.getVariants(variantIds)))
                const enrichedItems = yield* _(enrichCartItems(cart.items, variants.variants))
                let reservationId: string | undefined
                let orderId: string | undefined
                let paymentId: string | undefined

                const result = yield* Effect.tryPromise({
                    try: async () => {
                        await runSaga([
                            {
                                name: 'InitiatePayment',
                                forward: async () => {
                                    console.log("Starting InitiatePayment step")
                                    try {
                                        const effect = Effect.flatMap(PaymentService, service => 
                                            service.initiatePayment({
                                                amount: request.total,
                                                provider: request.paymentMethod as PaymentProvider,
                                                currency: request.currencyCode
                                            })
                                        )
                                        const response = await Effect.runPromise(
                                            Effect.provide(effect, services)
                                        )
                                        console.log("InitiatePayment response:", response)
                                        
                                        if (!response.paymentId) {
                                            throw new Error('No payment ID returned')
                                        }
                                        
                                        paymentId = response.paymentId
                                        console.log("InitiatePayment completed with paymentId:", paymentId)
                                    } catch (error) {
                                        console.error("Error in InitiatePayment:", error)
                                        throw error
                                    }
                                },
                                compensate: async () => {
                                    console.log("Starting InitiatePayment compensation")
                                    // Payment compensation would go here if needed
                                    console.log("InitiatePayment compensation completed")
                                }
                            },
                            {
                                name: 'ReserveStockAndCreateOrder',
                                forward: async () => {
                                    console.log("Starting ReserveStockAndCreateOrder step")
                                    try {
                                        const effect = Effect.flatMap(InventoryService, service => 
                                            service.reserveStock(request.userId, enrichedItems.map(item => ({
                                                id: item.variant.id,
                                                price: item.variant.price,
                                                quantity: item.quantity,
                                                image: item.variant.image
                                            })))
                                        )
                                        const response = await Effect.runPromise(
                                            Effect.provide(effect, services)
                                        )
                                        console.log("ReserveStockAndCreateOrder response:", response)
                                        
                                        if (!response.success) {
                                            throw new Error(`Failed to reserve stock: ${response.validationErrors.map(e => e.error).join(', ')}`)
                                        }
                                        
                                        if (!response.reservationId) {
                                            throw new Error('No reservation ID returned')
                                        }
                                        
                                        reservationId = response.reservationId
                                        console.log("ReserveStockAndCreateOrder completed with reservationId:", reservationId)
                                    } catch (error) {
                                        console.error("Error in ReserveStockAndCreateOrder:", error)
                                        throw error
                                    }
                                },
                                compensate: async () => {
                                    console.log("Starting ReserveStockAndCreateOrder compensation")
                                    const currentReservationId = reservationId
                                    if (currentReservationId) {
                                        try {
                                            const effect = Effect.flatMap(InventoryService, service => 
                                                service.releaseReservation(currentReservationId)
                                            )
                                            await Effect.runPromise(
                                                Effect.provide(effect, services)
                                            )
                                            console.log("ReserveStockAndCreateOrder compensation completed")
                                        } catch (error) {
                                            console.error("Error in ReserveStockAndCreateOrder compensation:", error)
                                            throw error
                                        }
                                    }
                                }
                            },
                            {
                                name: 'CreateOrder',
                                forward: async () => {
                                    console.log("Starting CreateOrder step")
                                    try {
                                        if (!paymentId) {
                                            throw new Error('Payment ID is required')
                                        }
                                        if (!request.shippingAddress) {
                                            throw new Error('Shipping address is required')
                                        }
                                        const orderRequest: CreateOrderRequest = {
                                            userId: request.userId,
                                            cartId: request.cartId,
                                            items: enrichedItems.map(item => ({
                                                id: item.id,
                                                productId: item.productId,
                                                variantId: item.variantId,
                                                quantity: item.quantity,
                                                price: item.price,
                                                productName: item.productName,
                                                productSlug: item.productSlug,
                                                variantName: item.variantName,
                                                image: item.image,
                                                sku: item.sku
                                            })),
                                            status: OrderStatus.ORDER_PENDING,
                                            paymentId: paymentId,
                                            payment: {
                                                method: request.paymentMethod,
                                                subtotal: request.subtotal,
                                                total: request.total,
                                                status: PaymentStatus.PAYMENT_PENDING,
                                                createdAt: new Date().toISOString(),
                                                updatedAt: new Date().toISOString()
                                            },
                                            shipping: {
                                                method: request.shippingMethod,
                                                cost: request.shippingCost,
                                                shippingAddress: request.shippingAddress,
                                                estimatedDelivery: (() => {
                                                    const createdAt = new Date();
                                                    const daysToAdd = request.shippingMethod === 'standard' ? 7 : 3;
                                                    const deliveryDate = new Date(createdAt.getTime());
                                                    deliveryDate.setDate(createdAt.getDate() + daysToAdd);
                                                    return deliveryDate.toISOString();
                                                  })(),
                                                tracking: {
                                                    number: "",
                                                    carrier: "",
                                                    status: "",
                                                    currentLocation: "",
                                                    history: [],
                                                    coordinates: {
                                                        origin: { lat: 0, lng: 0 },
                                                        current: { lat: 0, lng: 0 },
                                                        destination: { lat: 0, lng: 0 }
                                                    }
                                                }
                                            },
                                            coupons: request.coupons || [],
                                            currencyCode: request.currencyCode
                                        }
                                        const effect = Effect.flatMap(OrderService, service => 
                                            service.createOrder(orderRequest)
                                        )
                                        const response = await Effect.runPromise(
                                            Effect.provide(effect, services)
                                        )
                                        console.log("CreateOrder response:", response)
                                        
                                        if (!response?.id) {
                                            throw new Error('Failed to create order: No order ID returned')
                                        }
                                        
                                        orderId = response.id
                                        console.log("CreateOrder completed with orderId:", orderId)
                                    } catch (error) {
                                        console.error("Error in CreateOrder:", error)
                                        if (error instanceof Error) {
                                            throw new Error(`Failed to create order: ${error.message}`)
                                        }
                                        throw error
                                    }
                                },
                                compensate: async () => {
                                    console.log("Starting CreateOrder compensation")
                                    // Order compensation would go here if needed
                                    console.log("CreateOrder compensation completed")
                                }
                            },
                            {
                                name: 'CommitReservation',
                                forward: async () => {
                                    console.log("Starting CommitReservation step")
                                    if (!reservationId || !orderId) {
                                        throw new Error("Missing reservationId or orderId for commit")
                                    }
                                    
                                    try {
                                        const effect = Effect.flatMap(InventoryService, service => 
                                            service.commitReservation(reservationId!, orderId!)
                                        )
                                        await Effect.runPromise(
                                            Effect.provide(effect, services)
                                        )
                                        console.log("CommitReservation completed")
                                    } catch (error) {
                                        console.error("Error in CommitReservation:", error)
                                        throw error
                                    }
                                },
                                compensate: async () => {
                                    console.log("Starting CommitReservation compensation")
                                    if (!reservationId) {
                                        console.log("No reservationId available for compensation")
                                        return
                                    }
                                    try {
                                        const effect = Effect.flatMap(InventoryService, service => 
                                            service.releaseReservation(reservationId as string)
                                        )
                                        await Effect.runPromise(
                                            Effect.provide(effect, services)
                                        )
                                        console.log("CommitReservation compensation completed")
                                    } catch (error) {
                                        console.error("Error in CommitReservation compensation:", error)
                                        throw error
                                    }
                                }
                            }
                        ])
                        
                        if (!orderId) {
                            throw new Error('Order ID not found')
                        }
                        
                        return {
                            orderId,
                            status: OrderStatus.ORDER_PROCESSING
                        }
                    },
                    catch: (error) => {
                        console.error("Saga execution error:", error)
                        return new SagaError({ message: String(error), step: 'SagaExecution' })
                    }
                })

                return result
            })
        ),
        Effect.provide(services)
    )
}

export const orchestratorService: UntypedServiceImplementation = {
    createSagaOrder: (call: ServerUnaryCall<CreateSagaOrderRequest, CreateSagaOrderResponse>, callback: (error: Error | null, response: CreateSagaOrderResponse | null) => void) => {
        Effect.runPromise(createSagaOrder(call))
            .then(result => {
                if (result instanceof SagaError) {
                    callback(result, null)
                } else {
                    callback(null, result)
                }
            })
            .catch(error => callback(error, null))
    }
}
