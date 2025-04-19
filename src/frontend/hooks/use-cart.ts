import { AddItemRequest, UpdateItemRequest, RemoveItemRequest } from "@/protos/nexura"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { addItemGateway, updateItemGateway, removeItemGateway, clearCartGateway, getCartGateway, getVariantsForCartGateway } from "@/gateway/gateway"

interface QueryConfig {
    retry?: number
    refetchOnWindowFocus?: boolean
}

const defaultConfig: QueryConfig = {
    retry: 1,
    refetchOnWindowFocus: false
}
export const useCartActions = () => {
    const queryClient = useQueryClient()
    return {
        getCart: (userId: string) => {
            return useQuery({
                queryKey: ["cart", userId],
                queryFn: async () => {
                    try {
                        const response = await getCartGateway({ userId })
                        return response.cart
                    } catch (error) {
                        throw error
                    }
                },
                ...defaultConfig,
            })
        },
        getVariantsForCart: (variantIds: string[]) => {
            return useQuery({
              queryKey: ["cartVariants", variantIds],
              queryFn: async () => {
                const response = await getVariantsForCartGateway(variantIds)
                return response.variants
              },
              ...defaultConfig,
            })
          },
        addItem: useMutation({
            mutationFn: async (item: AddItemRequest) => {
                try {
                    return await addItemGateway(item)
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to add item to cart")
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cart"] })
                toast({
                    title: "SUCCESS",
                    description: `Item added to cart`,
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),
        updateItem: useMutation({
            mutationFn: async (updateItemRequest: UpdateItemRequest) => {
                try {
                    return await updateItemGateway(updateItemRequest)
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to update cart item")
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cart"] })
                toast({
                    title: "SUCCESS",
                    description: "Update item successfully",
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),
        removeItem: useMutation({
            mutationFn: async (item: RemoveItemRequest) => {
                try {
                    return await removeItemGateway(item)
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to remove item from cart")
                }
            },
            onSuccess: () => {
                toast({
                    title: "SUCCESS",
                    description: "Remove item successfully"
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),
        clearCart: useMutation({
            mutationFn: async (userId: string) => {
                try {
                    return await clearCartGateway({ userId })
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to clear cart")
                }
            },
            onSuccess: () => {
                toast({
                    title: "SUCCESS",
                    description: "Cart cleared successfully",
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        })
    }
}