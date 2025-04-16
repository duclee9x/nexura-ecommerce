import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import * as gateway from "@/gateway/gateway"
import { ProductVariant } from "@/protos/nexura"
import { addAddress, updateAddress, deleteAddress } from "@/actions/address"
import { Address, ExtendedAddress } from "@/protos/nexura"

interface MutationConfig {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
}

const defaultConfig: MutationConfig = {
  onSuccess: () => {},
  onError: (error) => {
    console.error("Mutation error:", error)
  },
  successMessage: "Operation completed successfully",
  errorMessage: "An error occurred. Please try again."
}

export const useAddToCart = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async (item: {
      productId: string
      variantId: string
      userId: string
      quantity: number
      image?: string
      currencyCode: string
    }) => {
      try {
        return await gateway.addItemGateway({userId: item.userId, productId: item.productId, variantId: item.variantId, quantity: item.quantity, image: item.image || "", currencyCode: item.currencyCode})
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to add item to cart")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useUpdateCartItem = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async (item: {
      productId: string
      quantity: number
      image?: string
      variantId: string
      currencyCode: string
      userId: string
    }) => {
      try {
        return await gateway.updateItemGateway({userId: item.userId, productId: item.productId, variantId: item.variantId, quantity: item.quantity, image: item.image || ""})
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update cart item")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useRemoveCartItem = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async (item: { productId: string, variantId: string, userId: string }) => {
      try {
        return await gateway.removeItemGateway({userId: item.userId, productId: item.productId, variantId: item.variantId})
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to remove item from cart")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useClearCart = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async ({userId}: {userId: string}) => {
      try {
        return await gateway.clearCartGateway({userId})
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to clear cart")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useCreateProduct = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async (product: any) => {
      try {
        return await gateway.createProductGateway(product)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to create product")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useUpdateProduct = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async (product: any) => {
      try {
        return await gateway.updateProductGateway(product)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update product")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
      queryClient.invalidateQueries({ queryKey: ["product"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useDeleteProduct = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        return await gateway.deleteProductGateway(id)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to delete product")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useAddAddress = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async ({ address, userId }: { address: Address; userId: string }) => {
      try {
        return await addAddress(address, userId)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to add address")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useUpdateAddress = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async ({ address, userId }: { address: Address; userId: string }) => {
      try {
        return await updateAddress(address as ExtendedAddress, userId)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update address")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}

export const useDeleteAddress = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()
  const finalConfig = { ...defaultConfig, ...config }

  return useMutation({
    mutationFn: async ({ addressId, userId }: { addressId: string; userId: string }) => {
      try {
        return await deleteAddress(addressId, userId)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to delete address")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast({
        title: "Success",
        description: finalConfig.successMessage,
      })
      finalConfig.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || finalConfig.errorMessage,
        variant: "destructive",
      })
      finalConfig.onError?.(error)
    },
  })
}
