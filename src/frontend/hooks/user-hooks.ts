import {
  addAddressGateway,
  deleteAddressGateway,
  registerUserForAdminGateway,
  forgotPasswordGateway,
  getAddressesGateway,
  getAllUsersGateway,
  getCountriesGateway,
  getDistrictsByProvinceGateway,
  getProvincesByCountryGateway,
  getUserGateway,
  getWardsByDistrictGateway,
  resetPasswordGateway,
  updateAddressGateway,
  updateUserGateway,
  validateOTPGateway,
  deleteUserGateway,
  registerUserGateway,
  verifyAccountGateway,
} from "@nexura/grpc_gateway/gateway";
import {
  DeleteAddressRequest,
  ResetPasswordRequest,
  RegisterUserForAdminRequest,
  UpdateUserRequest,
  User,
  DeleteUserRequest,
  AddAddressRequest,
  UpdateAddressRequest,
  RegisterUserRequest,
  VerifyAccountRequest,
} from "@nexura/grpc_gateway/protos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface QueryConfig {
  retry?: number;
}

const defaultConfig: QueryConfig = {
  retry: 1,
};

export default function UserHooks() {
  const queryClient = useQueryClient();
  return {
    useGetSession: () =>
      useQuery({
        queryKey: ["userSession"],
        queryFn:  async () => {
          const response = await fetch("/api/auth/session");
          if (!response.ok) {
            throw new Error("Failed to fetch session");
          }
          const data = await response.json();
          if (!data.user) {
            return null
          }
          return data.user
        },
        refetchOnWindowFocus: false,
        staleTime:            1000 * 60 * 5,
        
      }),
    useVerifyAccount: useMutation({
      mutationFn: (request: VerifyAccountRequest) => {
        return verifyAccountGateway(request).catch((error) => {
          throw new Error("Failed to verify account");
        });
      },
    }),
    useRegisterUserForAdmin: useMutation({
      mutationFn: async (request: RegisterUserForAdminRequest) => {
        return registerUserForAdminGateway(request).catch((error) => {
          throw new Error("Failed to register user for admin");
        });
      },
    }),
    useRegisterUser: useMutation({
      mutationFn: async (request: RegisterUserRequest) => {
        return await registerUserGateway(request).catch((error) => {
          throw new Error("Failed to register user");
        });
      },
    }),
    useGetAllUsers: () =>
      useQuery({
        queryKey: ["allUsers"],
        queryFn:  async () => {
          return await getAllUsersGateway().then(res => res.users).catch((error) => {
            throw error;
          });
        },
        ...defaultConfig,
      }),
    useLogin: useMutation({
      mutationFn: async (credentials: { email: string; password: string }) => {
        const response = await fetch("/api/auth/login", {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const error = await response.json();
          return { success: false, message: error.message };
        }
        const data = await response.json();
        return { success: true, user: data.user };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userSession"] });
      },
    }),

    useLogout: useMutation({
      mutationFn: async () => {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to logout");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userSession"] });
      },
    }),

    useForgotPassword: useMutation({
      mutationFn: async (email: string) => {
        return await forgotPasswordGateway({ email }).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
    }),

    useResetPassword: useMutation({
      mutationFn: async (resetPasswordRequest: ResetPasswordRequest) => {
        return await resetPasswordGateway(resetPasswordRequest).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
    }),

    useValidateOTP: useMutation({
      mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
        return await validateOTPGateway({ email, otp }).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
    }),
    useGetAddresses: (userId: string | null) =>
      useQuery({
        queryKey: [ "addresses", userId ],
        queryFn:  async () => {
          if (!userId) {
            throw new Error("User ID is required");
          }
          const response = await getAddressesGateway({ userId }).catch((error) => {
            throw new Error("Server has encountered an error");
          });
          return response;
        },
        enabled: !!userId,
        ...defaultConfig,
      }),

    useGetCountries: () =>
      useQuery({
        queryKey: ["countries"],
        queryFn:  async () => {
          return await getCountriesGateway().catch((error) => {
            throw new Error("Server has encountered an error");
          });
        },
        ...defaultConfig,
      }),

    useGetProvinces: (countryId: string) =>
      useQuery({
        queryKey: [ "provinces", countryId ],
        queryFn:  async () => {
          return await getProvincesByCountryGateway({ countryId }).catch((error) => {
            throw new Error("Server has encountered an error");
          });
        },
        enabled: !!countryId,
        ...defaultConfig,
      }),

    useGetDistricts: (provinceId: string) =>
      useQuery({
        queryKey: [ "districts", provinceId ],
        queryFn:  async () => {
          return await getDistrictsByProvinceGateway({
            provinceId,
          }).catch((error) => {
            throw new Error("Server has encountered an error");
          });
        },
        enabled: !!provinceId,
        ...defaultConfig,
      }),

    useGetWards: (districtId: string) =>
      useQuery({
        queryKey: [ "wards", districtId ],
        queryFn:  async () => {
          return await getWardsByDistrictGateway({ districtId }).catch((error) => {
            throw new Error("Server has encountered an error");
          });
        },
        enabled: !!districtId,
        ...defaultConfig,
      }),

    useAddAddress: useMutation({
      mutationFn: async (request: AddAddressRequest) => {
        return await addAddressGateway(request).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
    }),
    useUpdateAddress: useMutation({
      mutationFn: async (request: UpdateAddressRequest) => {
        return await updateAddressGateway(request).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
    }),

    useDeleteAddress: useMutation({
      mutationFn: async (request: DeleteAddressRequest) => {
        return await deleteAddressGateway(request).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
    }),

    useUpdateUser: useMutation({
      mutationFn: async (request: UpdateUserRequest) => {
        return await updateUserGateway(request).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userSession"] });

      },
    }),

    useDeleteUser: useMutation({
      mutationFn: async (request: DeleteUserRequest) => {
        return await deleteUserGateway(request).catch((error) => {
          throw new Error("Server has encountered an error");
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      },
    }),
  };
}
