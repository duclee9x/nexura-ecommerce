import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { 
    CreateSagaOrderRequest, 
    CreateSagaOrderResponse, 
    OrderStatus, 
    CartItem, 
    GetVariantsForCartRequest, 
    ValidateAndReserveRequest, 
    CreateOrderRequest, 
    GetOrderResponse,
    VariantCart
} from '@nexura/common/protos'
import { cartService, productService, orderService } from '../../gateway/services/serviceClient'
import { runSaga } from '../sagaRunner'

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
        const cartResponse = await cartService.getCart({ userId })
        
        if (!cartResponse?.cart) {
            throw new Error('Cart not found')
        }

        // Compare cart ID
        if (cartResponse.cart.id !== cartId) {
            throw new Error('Cart ID mismatch')
        }

        // Get variant information for all items
        const variantIds: string[] = cartResponse.cart.items.map((item: CartItem) => item.variantId)
        const variantsResponse = await productService.getVariantsForCart(variantIds)

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
                    const reserveResponse = await productService.validateAndReserve(reserveRequest)
                    
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

                    const createOrderResponse = await orderService.createOrder(orderRequest)
                    orderResponse = await orderService.getOrderStatus({ orderId: createOrderResponse.orderId })

                    // Commit reservation
                    if (reservationId) {
                        await productService.commitReservation({ reservationId })
                    }
                },
                compensate: async () => {
                    // Release reservation if it exists
                    if (reservationId) {
                        await productService.releaseReservation({ reservationId })
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
        handleError(error, callback)
    }
}
