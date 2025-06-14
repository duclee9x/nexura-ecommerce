import { PrismaClient } from '@nexura/order-service/src/db/prisma-client';
import { ListOrdersRequest, ListOrdersResponse, OrderStatus } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { getBatchUsersGateway, getBatchPaymentsGateway, getBatchAddressesGateway } from '@nexura/grpc_gateway/gateway';
import { User, Payment, ExtendedAddress } from '@nexura/grpc_gateway/protos';

const prisma = new PrismaClient();

export async function listOrders(call: ServerUnaryCall<ListOrdersRequest, ListOrdersResponse>, callback: sendUnaryData<ListOrdersResponse>) {
  try {
    const orders = await prisma.order.findMany({
      where:   { userId: call.request.userId },
      include: {
        items:    true,
        shipping: {
          include: {
            tracking: {
              include: {
                history: true
              }
            }
          }
        },
        statusHistory: true,
        notes:         true
      }
    });
    if (!orders) {
      callback(null, {
        orders: []
      });
      return;
    }
    
    const uniqueUserIds = [...new Set(orders.map(order => order.userId))];
    const paymentIds = [...new Set(orders.map(order => order.paymentId).filter(item => item !== null))];
    const shippingAddressIds = [...new Set(orders.map(order => order.shippingAddressId).filter(item => item !== null))];

    const userPromise = getBatchUsersGateway({ userIds: uniqueUserIds });
    const paymentPromise = getBatchPaymentsGateway({ paymentIds: paymentIds });
    const addressPromise = getBatchAddressesGateway({ addressIds: shippingAddressIds });

    const results = await Promise.allSettled([
      userPromise.then(response => response.users).catch(() => {
        return new Error('Getting order failed with connection error getting user');
      }),
      paymentPromise.then(response => response.payments).catch(() => {
        return new Error('Getting order failed with connection error getting payment');
      }), 
      addressPromise.then(response => response.addresses).catch(() => {
        return new Error('Getting order failed with connection error getting shipping address');
      })
    ]);

    // Check for any errors in the responses
    for (const result of results) {
      if (result.status === 'rejected' || result.value instanceof Error) {
        const error = result.status === 'rejected' ? result.reason : result.value;
        callback({
          code:    Status.UNAVAILABLE,
          message: error.message || 'Failed to fetch order details'
        });
        return;
      }
    }

    // All responses are successful, extract the data with proper typing
    const [
      users, payments, addresses
    ] = results.map((result) => {
      if (result.status === 'fulfilled' && !(result.value instanceof Error)) {
        return result.value;
      }
      return [];
    }) as [User[], Payment[], ExtendedAddress[]];

    // Process orders with the fetched data
    const ordersWithDetails = orders.map((order) => {
      const user = users.find((user: User) => user.id === order.userId);
      const payment = payments.find((payment: Payment) => payment.id === order.paymentId);
      const shippingAddress = addresses.find((address: ExtendedAddress) => address.id === order.shippingAddressId);

      if (!user) {
        throw new Error(`User not found for order ${order.id}`);
      }

      return {
        id:              order.id,
        user:            user,
        totalAmount:     order.totalAmount,
        shippingAddress: shippingAddress,
        paymentId:       order.paymentId || '',
        notes:           order.notes ? order.notes.map(note => ({
          id:        note.id,
          orderId:   note.orderId,
          note:      note.note,
          createdAt: note.createdAt.toISOString()
        })) : [],
        status:        order.status as OrderStatus,
        statusHistory: order.statusHistory
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map(status => ({
            id:          status.id,
            status:      status.status as OrderStatus,
            createdAt:   status.createdAt.toISOString(),
            description: status.description || ''
          })),
        createdAt: order.createdAt.toISOString(),
        items:     order.items.map(item => ({
          id:          item.id,
          variantId:   item.variantId,
          quantity:    item.quantity,
          price:       item.price,
          productId:   item.productId,
          productName: item.productName,
          productSlug: item.productSlug,
          variantName: item.variantName,
          sku:         item.sku,
          image:       item.image
        })),
        shipping: order.shipping ? {
          method:            order.shipping.method,
          cost:              order.shipping.cost,
          shippingAddress:   shippingAddress,
          estimatedDelivery: order.shipping.estimatedDelivery?.toISOString() || '',
          tracking:          order.shipping.tracking ? {
            number:          order.shipping.tracking.number,
            carrier:         order.shipping.tracking.carrier,
            status:          order.shipping.tracking.status,
            currentLocation: order.shipping.tracking.currentLocation,
            history:         order.shipping.tracking.history ? order.shipping.tracking.history.map(event => ({
              date:        event.date.toISOString(),
              time:        event.time.toISOString(),
              location:    event.location,
              status:      event.status,
              description: event.description
            })) : [],
            coordinates: undefined // Add if needed
          } : undefined
        } : undefined,
        payment: payment
      };
    });

    callback(null, {
      orders: ordersWithDetails
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    callback({
      code:    Status.INTERNAL,
      message: 'Failed to fetch orders'
    });
  }
} 