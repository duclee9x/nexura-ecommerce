import { PrismaClient } from '../../db/prisma-client';
import { GetOrderRequest, GetOrderResponse, OrderStatus as ProtoOrderStatus } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData, ServiceError } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { OrderStatus as PrismaOrderStatus } from '../../db/prisma-client';
import { getAddressGateway, getPaymentGateway, getUserGateway, getBatchUsersGateway, getBatchPaymentsGateway, getBatchAddressesGateway } from '@nexura/grpc_gateway/gateway';
import { User, Payment, ExtendedAddress } from '@nexura/grpc_gateway/protos';

const prisma = new PrismaClient();

// Map Prisma OrderStatus to proto OrderStatus
const mapOrderStatus = (status: PrismaOrderStatus): ProtoOrderStatus => {
  switch (status) {
    case PrismaOrderStatus.ORDER_PENDING:
      return ProtoOrderStatus.ORDER_PENDING
    case PrismaOrderStatus.ORDER_PROCESSING:
      return ProtoOrderStatus.ORDER_PROCESSING
    case PrismaOrderStatus.ORDER_SHIPPED:
      return ProtoOrderStatus.ORDER_SHIPPED
    case PrismaOrderStatus.ORDER_COMPENSATING:
      return ProtoOrderStatus.ORDER_COMPENSATING
    case PrismaOrderStatus.ORDER_DELIVERED:
      return ProtoOrderStatus.ORDER_DELIVERED
    case PrismaOrderStatus.ORDER_CANCELLED:
      return ProtoOrderStatus.ORDER_CANCELLED
    case PrismaOrderStatus.ORDER_COMPLETED:
      return ProtoOrderStatus.ORDER_COMPLETED
    case PrismaOrderStatus.ORDER_FAILED:
      return ProtoOrderStatus.ORDER_FAILED
    case PrismaOrderStatus.ORDER_REFUNDED:
      return ProtoOrderStatus.ORDER_REFUNDED
    case PrismaOrderStatus.ORDER_EXPIRED:
      return ProtoOrderStatus.ORDER_EXPIRED
    case PrismaOrderStatus.ORDER_ON_HOLD:
      return ProtoOrderStatus.ORDER_ON_HOLD
    default:
      return ProtoOrderStatus.ORDER_PENDING
  }
}

export async function getOrder(call: ServerUnaryCall<GetOrderRequest, GetOrderResponse>, callback: sendUnaryData<GetOrderResponse>) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: call.request.orderId },
      include: {
        items: true,
        statusHistory: true,
        shipping: {
          include: {
            tracking: {
              include: {
                history: true,
                coordinates: {
                  include: {
                    origin: true,
                    current: true,
                    destination: true
                  }
                }
              }
            }
          }
        },
        notes: true
      }
    });

    if (!order) {
      callback({
        code: Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }
    if (!order.paymentId) {
      callback({
        code: Status.NOT_FOUND,
        message: 'Payment not found'
      });
      return;
    }

    // Prepare batch requests
    const userPromise = getBatchUsersGateway([order.userId]);
    const paymentPromise = getBatchPaymentsGateway({ paymentIds: [order.paymentId] });
    const addressPromise = getBatchAddressesGateway({ addressIds: [order.shippingAddressId] });

    // Execute batch requests
    const results = await Promise.allSettled([
      userPromise.then(response => response.users).catch(() => {
        return new Error('Failed to fetch user details');
      }),
      paymentPromise.then(response => response.payments).catch(() => {
        return new Error('Failed to fetch payment details');
      }),
      addressPromise.then(response => response.addresses).catch(() => {
        return new Error('Failed to fetch shipping address details');
      })
    ]);

    // Check for any errors in the responses
    for (const result of results) {
      if (result.status === 'rejected' || result.value instanceof Error) {
        const error = result.status === 'rejected' ? result.reason : result.value;
        callback({
          code: Status.UNAVAILABLE,
          message: error.message || 'Failed to fetch order details'
        });
        return;
      }
    }

    // All responses are successful, extract the data with proper typing
    const [users, payments, addresses] = results.map(result => {
      if (result.status === 'fulfilled' && !(result.value instanceof Error)) {
        return result.value as User[] | Payment[] | ExtendedAddress[];
      }
      return [];
    }) as [User[], Payment[], ExtendedAddress[]];

    // Get the first (and should be only) item from each array
    const user = users[0];
    const payment = payments[0];
    const shippingAddress = addresses[0];

    if (!user) {
      callback({
        code: Status.NOT_FOUND,
        message: 'User not found'
      });
      return;
    }

    callback(null, {
      order: {
        id: order.id,
        user: user,
        totalAmount: order.totalAmount,
        shippingAddress: shippingAddress,
        paymentId: order.paymentId || '',
        notes: order.notes ? order.notes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).map(note => ({
          id: note.id,
          orderId: note.orderId,
          note: note.note,
          createdAt: note.createdAt.toISOString()
        })) : [],
        status: mapOrderStatus(order.status),
        statusHistory: order.statusHistory
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map(status => ({
            id: status.id,
            status: mapOrderStatus(status.status),
            createdAt: status.createdAt.toISOString(),
            description: status.description || ''
          })),
        createdAt: order.createdAt.toISOString(),
        items: order.items.map(item => ({
          id: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          variantName: item.variantName,
          sku: item.sku,
          image: item.image
        })),
        shipping: order.shipping ? {
          method: order.shipping.method,
          cost: order.shipping.cost,
          shippingAddress: shippingAddress,
          estimatedDelivery: order.shipping.estimatedDelivery?.toISOString() || '',
          tracking: order.shipping.tracking ? {
            number: order.shipping.tracking.number,
            carrier: order.shipping.tracking.carrier,
            status: order.shipping.tracking.status,
            currentLocation: order.shipping.tracking.currentLocation,
            history: order.shipping.tracking.history.map(event => ({
              date: event.date.toISOString(),
              time: event.time.toISOString(),
              location: event.location,
              status: event.status,
              description: event.description
            })),
            coordinates: order.shipping.tracking.coordinates ? {
              origin: order.shipping.tracking.coordinates.origin
                ? {
                    lat: order.shipping.tracking.coordinates.origin.lat,
                    lng: order.shipping.tracking.coordinates.origin.lng
                  }
                : undefined,
              current: order.shipping.tracking.coordinates.current
                ? {
                    lat: order.shipping.tracking.coordinates.current.lat,
                    lng: order.shipping.tracking.coordinates.current.lng
                  }
                : undefined,
              destination: order.shipping.tracking.coordinates.destination
                ? {
                    lat: order.shipping.tracking.coordinates.destination.lat,
                    lng: order.shipping.tracking.coordinates.destination.lng
                  }
                : undefined
            } : undefined
          } : undefined
        } : undefined,
        payment: payment
      }
    });
  } catch (error) {
    console.error('Error getting order:', error);
    callback({
      code: Status.INTERNAL,
      message: 'Failed to fetch order'
    });
  }
} 