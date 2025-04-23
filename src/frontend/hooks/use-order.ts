import { CreateOrderRequest, CreateSagaOrderRequest, OrderStatus } from "@nexura/grpc_gateway/protos"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getOrderStatusGateway, getOrderGateway, cancelOrderGateway, updateOrderStatusGateway, createSagaOrderGateway } from "@nexura/grpc_gateway/gateway"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface QueryConfig {
    retry?: number
}

const defaultConfig: QueryConfig = {
    retry: 1,
}

export const useOrderActions = () => {
    const router = useRouter()
    
    const createSagaOrderMutation = useMutation({
        mutationFn: async (order: CreateSagaOrderRequest) => {
            try {
                const response = await createSagaOrderGateway(order)
                return response
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            toast({
                title: "Order created",
                description: "Order created successfully",
            })
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Order creation failed",
            })
        },
        ...defaultConfig,
    })

    return {
        createSagaOrder: (order: CreateSagaOrderRequest) => {
            return createSagaOrderMutation.mutateAsync(order)
        },

        getOrderStatus: (orderId: string) => {
            return useQuery({
                queryKey: ["orderStatus", orderId],
                queryFn: async () => {
                    const response = await getOrderStatusGateway(orderId)
                    return response.status
                },
                ...defaultConfig,
            })
        },

        getOrder: (orderId: string) => {
            return useQuery({
                queryKey: ["order", orderId],
                queryFn: async () => {
                    const response = await getOrderGateway(orderId)
                    return response.order
                },
                ...defaultConfig,
            })
        },

        cancelOrder: (orderId: string) => {
            return useMutation({
                mutationFn: async () => {
                    const response = await cancelOrderGateway(orderId)
                    return response
                },
                ...defaultConfig,
            })
        },

        updateOrderStatus: (orderId: string, status: OrderStatus) => {
            return useMutation({
                mutationFn: async () => {
                    const response = await updateOrderStatusGateway(orderId, status)
                    return response
                },
                ...defaultConfig,
            })
        },
    }
}
