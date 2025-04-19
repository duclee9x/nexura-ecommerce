import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCategoryGateway, getUserGateway, listProductsGateway, getCartGateway, addItemGateway, updateItemGateway, removeItemGateway, clearCartGateway, getVariantsForCartGateway, getAddressesGateway } from "@/gateway/gateway"
import { Product, User } from "@/protos/nexura"
import { useRouter } from "next/navigation"
import { getCountries, getProvincesByCountry, getDistrictsByProvince, getWardsByDistrict } from "@/actions/address"
import { Address, Country, Province, District, Ward } from "@/protos/nexura"

interface QueryConfig {
  retry?: number
  refetchOnWindowFocus?: boolean
}

const defaultConfig: QueryConfig = {
  retry: 1,
  refetchOnWindowFocus: false
}

export const useUserSession = (config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["userSession"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (!response.ok) {
          throw new Error("Failed to fetch session")
        }
        const data = await response.json()
        const user = await getUserGateway(data.user.id)
        return user.user as User
      } catch (error) {
        console.error("Error fetching session:", error)
        return null
      }
    },
    ...defaultConfig,
    ...config
  })
}

export const useSessionActions = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to login")
      }

      await queryClient.invalidateQueries({ queryKey: ["userSession"] })
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      await queryClient.invalidateQueries({ queryKey: ["userSession"] })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["userSession"] })
  }

  return {
    login,
    logout,
    refresh
  }
}

export const useProducts = (config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["productsCatalog"],
    queryFn: async () => {
      try {
        const res = await listProductsGateway()
        return res.products
      } catch (error) {
        console.error("Error fetching products:", error)
        throw new Error("Failed to load products. Please try again later.")
      }
    },
    ...defaultConfig,
    ...config
  })
}

export const useCategories = (config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await getAllCategoryGateway()
        return res.categories
      } catch (error) {
        console.error("Error fetching categories:", error)
        throw new Error("Failed to load categories. Please try again later.")
      }
    },
    ...defaultConfig,
    ...config
  })
}

export const useFilteredProducts = (
  products: Product[] | undefined,
  filters: {
    searchQuery: string
    categories: string[]
    colors: string[]
    features: string[]
    priceRange: [number, number]
  }
) => {
  return products?.filter((product) => {
    // Search filter
    if (
      filters.searchQuery &&
      !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !product.sku.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (filters.categories.length > 0) {
      const hasMatchingCategory = product.categories.some((category) =>
        filters.categories.includes(category)
      )
      if (!hasMatchingCategory) return false
    }

    // Color filter
    if (filters.colors.length > 0) {
      const hasMatchingColor = product.variants.some((variant) => {
        const colorAttribute = variant.attributes.find(
          (attr) => attr.name.toLowerCase() === "color"
        )
        return colorAttribute?.extraValue && filters.colors.includes(colorAttribute.extraValue)
      })
      if (!hasMatchingColor) return false
    }

    // Feature filter
    if (filters.features.includes("featured") && !product.featured) {
      return false
    }

    // Price range filter
    const minPrice = product.variants.reduce(
      (min, variant) => Math.min(min, variant.price),
      Infinity
    )
    const maxPrice = product.variants.reduce(
      (max, variant) => Math.max(max, variant.price),
      0
    )
    if (minPrice > filters.priceRange[1] || maxPrice < filters.priceRange[0]) {
      return false
    }

    return true
  })
}

export const useQueryUtils = () => {
  const queryClient = useQueryClient()

  const invalidateQueries = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey })
  }

  const prefetchQueries = async (queryKey: string[], queryFn: () => Promise<any>) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn
    })
  }

  return {
    invalidateQueries,
    prefetchQueries
  }
}




export const useAddresses = (userId: string, config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["addresses", userId],
    queryFn: async () => {
      try {
        const response = await getAddressesGateway(userId)
        return response
      } catch (error) {
        console.error("Error fetching addresses:", error)
        throw error
      }
    },
    ...defaultConfig,
    ...config
  })
}

export const useCountries = (config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      try {
        const response = await getCountries()
        return response
      } catch (error) {
        console.error("Error fetching countries:", error)
        throw error
      }
    },
    ...defaultConfig,
    ...config
  })
}

export const useProvinces = (countryId: string, config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["provinces", countryId],
    queryFn: async () => {
      try {
        const response = await getProvincesByCountry(countryId)
        return response
      } catch (error) {
        console.error("Error fetching provinces:", error)
        throw error
      }
    },
    enabled: !!countryId,
    ...defaultConfig,
    ...config
  })
}

export const useDistricts = (provinceId: string, config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["districts", provinceId],
    queryFn: async () => {
      try {
        const response = await getDistrictsByProvince(provinceId)
        return response
      } catch (error) {
        console.error("Error fetching districts:", error)
        throw error
      }
    },
    enabled: !!provinceId,
    ...defaultConfig,
    ...config
  })
}

export const useWards = (districtId: string, config: Partial<QueryConfig> = {}) => {
  return useQuery({
    queryKey: ["wards", districtId],
    queryFn: async () => {
      try {
        const response = await getWardsByDistrict(districtId)
        return response
      } catch (error) {
        console.error("Error fetching wards:", error)
        throw error
      }
    },
    enabled: !!districtId,
    ...defaultConfig,
    ...config
  })
}
