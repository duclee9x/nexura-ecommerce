import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import * as gateway from "@/gateway/gateway"
import { CreateProductRequest, DeleteAddressRequest, DeleteProductRequest, Product, ProductVariant, RemoveItemRequest, UpdateItemRequest, UpdateProductRequest } from "@/protos/nexura"
import { addAddress, updateAddress, deleteAddress } from "@/actions/address"
import { Address, ExtendedAddress } from "@/protos/nexura"
interface MutationConfig {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
}

import { AddItemRequest } from "@/protos/nexura"






export const useCreateProduct = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (product: CreateProductRequest) => {
      try {
        return await gateway.createProductGateway(product)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to create product")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
      toast({
        title: "SUCCESS",
        description: "Product created successfully",
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

export const useUpdateProduct = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (product: UpdateProductRequest) => {
      try {
        return await gateway.updateProductGateway(product as unknown as Product)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update product")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
      queryClient.invalidateQueries({ queryKey: ["product"] })
      toast({
        title: "SUCCESS",
        description: "Product updated successfully",
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

export const useDeleteProduct = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productId: string) => {
      try {
        return await gateway.deleteProductGateway(productId)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to delete product")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
      toast({
        title: "SUCCESS",
        description: "Product deleted successfully",
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

export const useAddAddress = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ address, userId }: { address: ExtendedAddress; userId: string }) => {
      try {
        return await addAddress(address, userId)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to add address")
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast({
        title: "SUCCESS",
        description: "Address added successfully",
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

export const useUpdateAddress = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()

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
        title: "SUCCESS",
        description: "Address updated successfully",
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

export const useDeleteAddress = (config: Partial<MutationConfig> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ deleteAddressRequest }: { deleteAddressRequest: DeleteAddressRequest }) => {
      try {
        return await deleteAddress(deleteAddressRequest)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to delete address")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] })
      toast({
        title: "SUCCESS",
        description: "Address deleted successfully",
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
