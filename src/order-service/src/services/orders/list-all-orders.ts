import { PrismaClient } from '../../db/prisma-client';
import { Empty, ListAllOrdersResponse, OrderStatus } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData, ServiceError } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { getBatchUsersGateway, getBatchAddressesGateway, getBatchPaymentsGateway } from '@nexura/grpc_gateway/gateway';
import { User, Payment, ExtendedAddress } from '@nexura/grpc_gateway/protos';

const prisma = new PrismaClient();

export async function listAllOrders(call: ServerUnaryCall<Empty, ListAllOrdersResponse>, callback: sendUnaryData<ListAllOrdersResponse>) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
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
        notes: true
      }
    });
    if (!orders) {
      callback(null, {
        orders: []
      });
      return;
    }
    
    // Collect unique IDs for batch requests
    const userIds = [...new Set(orders.map(order => order.userId))];
    const addressIds = [...new Set(orders.map(order => order.shippingAddressId))];
    const paymentIds = orders.map(order => order.paymentId).filter(Boolean) as string[];

    // Execute batch requests
    const results = await Promise.allSettled([
      getBatchUsersGateway(userIds).then(response => response.users).catch(() => {
        return new Error('Getting order failed with connection error getting user');
      }),
      getBatchAddressesGateway({ addressIds }).then(response => response.addresses).catch(() => {
        return new Error('Getting order failed with connection error getting address');
      }),
      paymentIds.length > 0 
        ? getBatchPaymentsGateway({ paymentIds }).then(response => response.payments).catch(() => {
            return new Error('Getting order failed with connection error getting payment');
          })
        : Promise.resolve([])
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
    const [users, addresses, payments] = results.map(result => {
      if (result.status === 'fulfilled' && !(result.value instanceof Error)) {
        return result.value as User[] | ExtendedAddress[] | Payment[];
      }
      return [];
    }) as [User[], ExtendedAddress[], Payment[]];

    // Create lookup maps for faster access
    const usersMap = new Map(users.map(user => [user.id, user]));
    const addressesMap = new Map(addresses.map(address => [address.id, address]));
    const paymentsMap = new Map(payments.map(payment => [payment.id, payment]));

    // Process orders with the fetched data
    const ordersWithDetails = orders.map(order => {
      const user = usersMap.get(order.userId);
      const shippingAddress = addressesMap.get(order.shippingAddressId);
      const payment = order.paymentId ? paymentsMap.get(order.paymentId) : undefined;

      // Add error flags if data is missing
      const hasUserError = !user && userIds.includes(order.userId);
      const hasAddressError = !shippingAddress && addressIds.includes(order.shippingAddressId);
      const hasPaymentError = !payment && order.paymentId && paymentIds.includes(order.paymentId);

      return {
        id: order.id,
        user: user,
        totalAmount: order.totalAmount,
        shippingAddress: shippingAddress,
        paymentId: order.paymentId || '',
        notes: order.notes ? order.notes.map((note: any) => ({
          id: note.id,
          orderId: note.orderId,
          note: note.note,
          createdAt: note.createdAt.toISOString()
        })) : [],
        status: order.status as OrderStatus,
        statusHistory: order.statusHistory
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((status: any) => ({
            id: status.id,
            status: status.status as OrderStatus,
            createdAt: status.createdAt.toISOString(),
            description: status.description || ''
          })),
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item: any) => ({
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
            history: order.shipping.tracking.history ? order.shipping.tracking.history.map((event: any) => ({
              date: event.date.toISOString(),
              time: event.time.toISOString(),
              location: event.location,
              status: event.status,
              description: event.description
            })) : [],
            coordinates: undefined // Add if needed
          } : undefined
        } : undefined,
        payment: payment,
        _errors: {
          user: hasUserError,
          address: hasAddressError,
          payment: hasPaymentError
        }
      };
    });

    callback(null, {
      orders: ordersWithDetails
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    callback({
      code: Status.INTERNAL,
      message: 'Failed to fetch orders'
    });
  }
} 