import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrderStatusGateway,
  getOrderGateway,
  cancelOrderGateway,
  updateOrderStatusGateway,
  createSagaOrderGateway,
  listOrdersGateway,
  addOrderNoteGateway,
  deleteOrderNoteGateway,
  updateTrackingNumberGateway,
  listAllOrdersGateway,
} from "@nexura/grpc_gateway/gateway";
import { toast } from "@/components/ui/use-toast";
// import type { OrderStatus as OrderStatusType, CreateSagaOrderRequest } from "@nexura/grpc_gateway/protos"
import {
  AddOrderNoteRequest,
  DeleteOrderNoteRequest,
  OrderStatus,
} from "@nexura/grpc_gateway/protos";
import { CreateSagaOrderRequest } from "@nexura/grpc_gateway/protos";
interface QueryConfig {
  retry?: number;
}

const defaultConfig: QueryConfig = {
  retry: 1,
};

export default function OrderHooks() {
  const queryClient = useQueryClient();
  return {
    useGetOrder: (orderId: string | null) => {
      return useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
          if (!orderId) {
            throw new Error("Order ID is required");
          }
          const response = await getOrderGateway(orderId);
          return response.order;
        },
        enabled: !!orderId,
        ...defaultConfig,
      });
    },

    useListOrders: (userId: string) => {
      return useQuery({
        queryKey: ["orders", userId],
        queryFn: async () => {
          try {
            const response = await listOrdersGateway({ userId });
            return response.orders;
          } catch (error) {
            throw error;
          }
        },
        enabled: !!userId,
        ...defaultConfig,
      });
    },

    useListAllOrders: () => {
      return useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
          const response = await listAllOrdersGateway();
          return response.orders;
        },
        ...defaultConfig,
      });
    },

    useGetOrderStatus: (orderId: string) => {
      return useQuery({
        queryKey: ["orderStatus", orderId],
        queryFn: async () => {
          try {
            const response = await getOrderStatusGateway(orderId);
            return response.status;
          } catch (error) {
            throw error;
          }
        },
        ...defaultConfig,
      });
    },

    useCreateSagaOrder: useMutation({
      mutationFn: async (order: CreateSagaOrderRequest) => {
        try {
          const response = await createSagaOrderGateway(order);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast({
          title: "Order created",
          description: "Order created successfully",
        });
      },
      onError: (error) => {
        throw error;
      },
      ...defaultConfig,
    }),

    useAddOrderNote: useMutation({
      mutationFn: async (orderNote: AddOrderNoteRequest) => {
        try {
          const response = await addOrderNoteGateway(orderNote);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
        toast({
          title: "Order note added",
          description: "Order note added successfully",
        });
      },
    }),

    useUpdateOrderStatus: useMutation({
      mutationFn: async ({
        orderId,
        status,
      }: {
        orderId: string;
        status: OrderStatus;
      }) => {
        try {
          const response = await updateOrderStatusGateway(orderId, status);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
        toast({
          title: "Order status updated",
          description: "Order status updated successfully",
        });
      },
      onError: (error) => {
        throw error;
      },
      ...defaultConfig,
    }),

    useUpdateTrackingNumber: useMutation({
      mutationFn: async ({
        orderId,
        trackingNumber,
      }: {
        orderId: string;
        trackingNumber: string;
      }) => {
        try {
          const response = await updateTrackingNumberGateway({
            orderId,
            trackingNumber,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
        toast({
          title: "Tracking number updated",
          description: "Tracking number updated successfully",
        });
      },
      onError: (error) => {
        throw error;
      },
    }),

    useDeleteOrderNote: useMutation({
      mutationFn: async (orderNote: DeleteOrderNoteRequest) => {
        try {
          const response = await deleteOrderNoteGateway(orderNote);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
        toast({
          title: "Order note deleted",
          description: "Order note deleted successfully",
        });
      },
    }),
    
    useCancelOrder: useMutation({
      mutationFn: async (orderId: string) => {
        try {
          const response = await cancelOrderGateway(orderId);
          return response;
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order"] });
        toast({
          title: "Order cancelled",
          description: "Order cancelled successfully",
        });
      },
      onError: (error) => {
        throw error;
      },
      ...defaultConfig,
    }),
  };
}
