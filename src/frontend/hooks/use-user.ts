import { toast } from "@/components/ui/use-toast"
import { addAddressGateway, deleteAddressGateway, forgotPasswordGateway, getAddressesGateway, getCountriesGateway, getDistrictsByProvinceGateway, getProvincesByCountryGateway, getUserGateway, getWardsByDistrictGateway, resetPasswordGateway, updateAddressGateway, updateUserGateway, validateOTPGateway } from "@nexura/grpc_gateway/gateway"
import { DeleteAddressRequest, ExtendedAddress, ResetPasswordRequest, UpdateUserRequest, User } from "@nexura/grpc_gateway/protos"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

interface QueryConfig {
    retry?: number
}

const defaultConfig: QueryConfig = {
    retry: 1,
}

export const useUserActions = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return {       
        getSession: () => useQuery({
            queryKey: ["userSession"],
            queryFn: async () => {
                try {
                    const response = await fetch("/api/auth/session")
                    if (!response.ok) {
                        throw new Error("Failed to fetch session")
                    }
                    const data = await response.json()
                    if (!data.user) {
                        return null
                    }
                    const user = await getUserGateway(data.user.id)
                    return user.user as User
                } catch (error) {
                    console.error("Error fetching session:", error)
                    return null
                }
            },
            ...defaultConfig,
        }),

        login: useMutation({
            mutationFn: async (credentials: { email: string; password: string }) => {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                })

                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error.message || "Failed to login")
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["userSession"] })
                router.push("/")
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),

        logout: useMutation({
            mutationFn: async () => {
                const response = await fetch("/api/auth/logout", {
                    method: "POST",
                })

                if (!response.ok) {
                    throw new Error("Failed to logout")
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["userSession"] })
                router.push("/")
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),

        forgotPassword: useMutation({
            mutationFn: async (email: string) => {
                return await forgotPasswordGateway({email})
            },
            onSuccess: () => {
                toast({
                    title: "SUCCESS",
                    description: "Email sent successfully",
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

        resetPassword: useMutation({
            mutationFn: async (resetPasswordRequest: ResetPasswordRequest) => {
                return await resetPasswordGateway(resetPasswordRequest)
            },
            onSuccess: () => {
                toast({
                    title: "SUCCESS",
                    description: "Password reset successfully",
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

        validateOTP: useMutation({
            mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
                return await validateOTPGateway({ email, otp })
            },
            onSuccess: () => {
                toast({
                    title: "SUCCESS",
                    description: "OTP validated successfully",
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
        getAddresses: (userId: string) => useQuery({
            queryKey: ["addresses", userId],
            queryFn: async () => {
                try {
                    const response = await getAddressesGateway({ userId })
                    return response
                } catch (error) {
                    console.error("Error fetching addresses:", error)
                    throw error
                }
            },
            enabled: !!userId,
            ...defaultConfig,
        }),

        getCountries: () => useQuery({
            queryKey: ["countries"],
            queryFn: async () => {
                try {
                    const response = await getCountriesGateway()
                    return response
                } catch (error) {
                    console.error("Error fetching countries:", error)
                    throw error
                }
            },
            ...defaultConfig,
        }),

        getProvinces: (countryId: string) => useQuery({
            queryKey: ["provinces", countryId],
            queryFn: async () => {
                try {
                    const response = await getProvincesByCountryGateway({ countryId })
                    return response
                } catch (error) {
                    console.error("Error fetching provinces:", error)
                    throw error
                }
            },
            enabled: !!countryId,
            ...defaultConfig,
        }),

        getDistricts: (provinceId: string) => useQuery({
            queryKey: ["districts", provinceId],
            queryFn: async () => {
                try {
                    const response = await getDistrictsByProvinceGateway({ provinceId })
                    return response
                } catch (error) {
                    console.error("Error fetching districts:", error)
                    throw error
                }
            },
            enabled: !!provinceId,
            ...defaultConfig,
        }),

        getWards: (districtId: string) => useQuery({
            queryKey: ["wards", districtId],
            queryFn: async () => {
                try {
                    const response = await getWardsByDistrictGateway({ districtId })
                    return response
                } catch (error) {
                    console.error("Error fetching wards:", error)
                    throw error
                }
            },
            enabled: !!districtId,
            ...defaultConfig,
        }),

        addAddress: useMutation({
            mutationFn: async ({ address, userId }: { address: ExtendedAddress; userId: string }) => {
                try {
                    return await addAddressGateway({ address, userId })
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to add address")
                }
            },
            onSuccess: () => {
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
        }),

        updateAddress: useMutation({
            mutationFn: async ({ address, userId }: { address: ExtendedAddress; userId: string }) => {
                try {
                    return await updateAddressGateway({ address, userId })
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to update address")
                }
            },
            onSuccess: () => {
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
        }),

        deleteAddress: useMutation({
            mutationFn: async (deleteAddressRequest: DeleteAddressRequest) => {
                try {
                    return await deleteAddressGateway(deleteAddressRequest)
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
        }),

        updateUser: useMutation({
            mutationFn: async (request: UpdateUserRequest) => {
                return await updateUserGateway(request)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["userSession"] })
                toast({
                    title: "SUCCESS",
                    description: "User updated successfully",
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
    }
}
