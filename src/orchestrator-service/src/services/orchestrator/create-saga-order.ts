import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { 
    CreateSagaOrderRequest, 
    CreateSagaOrderResponse, 
    OrderStatus, 
    CartItem, 
    ValidateAndReserveRequest, 
    CreateOrderRequest, 
    GetOrderResponse,
    VariantCart
} from '@nexura/grpc_gateway/protos'
import { getCartGateway,  getVariantsForCartGateway, validateAndReserveGateway, releaseReservationGateway, commitReservationGateway, createOrderGateway, getOrderStatusGateway } from '@nexura/grpc_gateway/gateway'
import { runSaga } from '../sagaRunner'
import { productService } from '../../gateway/services/serviceClient'

interface EnrichedCartItem extends CartItem {
    variant: VariantCart
}

export const createSagaOrder = async (
    callContext: ServerUnaryCall<CreateSagaOrderRequest, CreateSagaOrderResponse>, 
    callback: sendUnaryData<CreateSagaOrderResponse>
) => {
    try {
        const { 
            userId, 
            cartId, 
            shippingAddress, 
            paymentMethod, 
            paymentAmount, 
            paymentCurrency, 
            shippingMethod, 
            shippingCost, 
            subtotal, 
            total, 
            currencyCode 
        } = callContext.request

        if (!userId) {
            throw new Error('User ID is required')
        }

        if (!cartId) {
            throw new Error('Cart ID is required')
        }

        // Get cart data
        const cartResponse = await getCartGateway({ userId })
        
        if (!cartResponse?.cart) {
            throw new Error('Cart not found')
        }

        // Compare cart ID
        if (cartResponse.cart.id !== cartId) {
            throw new Error('Cart ID mismatch')
        }

        // Get variant information for all items
        const variantIds: string[] = cartResponse.cart.items.map((item: CartItem) => item.variantId)
        const variantsResponse = await getVariantsForCartGateway(variantIds)

        // Enrich cart items with variant information
        const enrichedItems: EnrichedCartItem[] = cartResponse.cart.items.map((item: CartItem) => {
            const variant = variantsResponse.variants.find((v: VariantCart) => v.id === item.variantId)
            if (!variant) {
                throw new Error(`Variant not found for item ${item.id}`)
            }
            return {
                ...item,
                variant
            }
        })

        let orderResponse: GetOrderResponse | undefined
        let reservationId: string | undefined

        // Process saga
        await runSaga([
            {
                name: 'ReserveStockAndCreateOrder',
                forward: async () => {
                    // Reserve stock
                    const reserveRequest: ValidateAndReserveRequest = {
                        userId,
                        variants: enrichedItems.map(item => ({
                            id: item.variant.id,
                            sku: item.variant.id, // Using variant ID as SKU since it's not available in VariantCart
                            price: item.variant.price,
                            attributes: item.variant.attributes,
                            lowStockThreshold: 5, // Default value
                            stock: item.variant.stock,
                            warehouseId: 'default', // Default value
                            imageIds: [item.variant.image]
                        }))
                    }
                    const reserveResponse = await validateAndReserveGateway(reserveRequest)
                    
                    if (!reserveResponse.success) {
                        throw new Error('Failed to reserve stock')
                    }
                    reservationId = reserveResponse.reservationId

                    // Create order
                    const orderRequest: CreateOrderRequest = {
                        userId,
                        cartId,
                        items: enrichedItems.map((item) => ({
                            productId: item.productId,
                            variantId: item.variantId,
                            quantity: item.quantity,
                            price: item.variant.price
                        })),
                        shippingAddress,
                        paymentMethod,
                        paymentAmount,
                        paymentCurrency,
                        shippingMethod,
                        shippingCost,
                        subtotal,
                        coupons: [],
                        total,
                        currencyCode
                    }

                    await createOrderGateway(orderRequest)
                    // Commit reservation
                    if (reservationId) {
                        await commitReservationGateway({ reservationId })
                    }
                },
                compensate: async () => {
                    // Release reservation if it exists
                    if (reservationId) {
                        await releaseReservationGateway({ reservationId })
                    }
                }
            }
        ])

        if (!orderResponse?.order) {
            throw new Error('Order creation failed')
        }

        const response: CreateSagaOrderResponse = {
            orderId: orderResponse.order.id,
            status: OrderStatus.ORDER_PENDING
        }

        callback(null, response)
    } catch (error) {
        handleError(error as ServiceError, callback)
    }
}
