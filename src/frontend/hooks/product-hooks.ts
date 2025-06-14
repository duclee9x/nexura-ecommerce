import {
  addWishlistGateway,
  changeProductStatusGateway,
  createBrandGateway,
  createCategoryGateway,
  createProductGateway,
  deleteProductGateway,
  getAllBrandGateway,
  getAllCategoryGateway,
  getProductGateway,
  getWarehousesGateway,
  getWishlistGateway,
  listProductsGateway,
  removeWishlistGateway,
  updateCategoryGateway,
  updateProductGateway,
} from "@nexura/grpc_gateway/gateway";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBrandRequest,
  RemoveWishlistRequest,
  CreateCategoryRequest,
  CreateProductRequest,
  Product,
  UpdateCategoryRequest,
  UpdateProductRequest,
  ChangeProductStatusRequest,
  AddWishlistRequest,
} from "@nexura/grpc_gateway/protos";
import { toast } from "@/components/ui/use-toast";

export default function ProductHooks() {
  const queryClient = useQueryClient();
  return {
    useListProducts: () =>
      useQuery({
        queryKey: ["inventory"],
        queryFn:  async () =>
          await listProductsGateway().then(response => response.products),
        staleTime: 1000 * 5,
        gcTime:    1000 * 60,
      }),
    useGetFilteredProducts: (
      products: Product[] | undefined,
      filters: {
        searchQuery: string;
        categories:  string[];
        colors:      string[];
        features:    string[];
        priceRange:  [number, number];
      },
    ) => {
      return products?.filter((product) => {
        // Search filter
        if (
          filters.searchQuery &&
          product.name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) &&
            product.sku.toLowerCase().includes(filters.searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category filter
        if (filters.categories.length > 0) {
          const hasMatchingCategory = product.categories.some(category =>
            filters.categories.includes(category),
          );
          if (!hasMatchingCategory) return false;
        }

        // Color filter
        if (filters.colors.length > 0) {
          const hasMatchingColor = product.variants.some((variant) => {
            const colorAttribute = variant.attributes.find(
              attr => attr.name.toLowerCase() === "color",
            );
            return (
              colorAttribute?.extraValue &&
              filters.colors.includes(colorAttribute.extraValue)
            );
          });
          if (!hasMatchingColor) return false;
        }

        // Feature filter
        if (filters.features.includes("featured") && !product.featured) {
          return false;
        }

        // Price range filter
        const minPrice = product.variants.reduce(
          (min, variant) => Math.min(min, variant.price),
          Infinity,
        );
        const maxPrice = product.variants.reduce(
          (max, variant) => Math.max(max, variant.price),
          0,
        );
        if (
          minPrice > filters.priceRange[1] ||
          maxPrice < filters.priceRange[0]
        ) {
          return false;
        }

        return true;
      });
    },

    useGetProduct: (data: string, type: string) =>
      useQuery({
        queryKey: [ "product", data ],
        queryFn:  async () =>
          await getProductGateway({ data, type }).then(
            response => response.product,
          ).catch((error) => {
            throw error;
          }),
        enabled: !!data,
      }),

    useGetCategories: () =>
      useQuery({
        queryKey: ["categories"],
        queryFn:  async () =>
          await getAllCategoryGateway().then(response => response.categories).catch((error) => {
            throw error;
          }),
      }),

    useGetBrands: () =>
      useQuery({
        queryKey: ["brands"],
        queryFn:  async () =>
          await getAllBrandGateway().then(response => response.brands).catch((error) => {
            throw error;
          }),
      }),

    useGetWarehouses: () =>
      useQuery({
        queryKey: ["warehouses"],
        queryFn:  async () =>
          await getWarehousesGateway().then(response => response.warehouses).catch((error) => {
            throw error;
          }),
      }),

    useGetWishlist: (userId: string) =>
      useQuery({
        queryKey: [ "wishlist", userId ],
        queryFn:  async () =>
          await getWishlistGateway({ userId }).then(
            response => response.wishlistItems,
          ).catch((error) => {
            throw error;
          }),
        refetchOnWindowFocus: false,
        staleTime:            1000 * 60 * 5,
      }),

    useCreateProduct: useMutation({
      mutationFn: async (request: CreateProductRequest) =>
        await createProductGateway(request).then(
          response => response.product,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inventory"] });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        toast({
          title:       "Success",
          description: "Product created successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useCreateCategory: useMutation({
      mutationFn: async (category: CreateCategoryRequest) =>
        await createCategoryGateway(category).then(
          response => response.category,
        ).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast({
          title:       "Success",
          description: "Category created successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useCreateBrand: useMutation({
      mutationFn: async (brand: CreateBrandRequest) =>
        await createBrandGateway(brand).then(response => response.brand).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["brands"] });
        toast({
          title:       "Success",
          description: "Brand created successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useAddWishlist: useMutation({
      mutationFn: async (request: AddWishlistRequest) =>
        await addWishlistGateway(request).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        toast({
          title:       "Success",
          description: "Product added to wishlist successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useUpdateProductStatus: useMutation({
      mutationFn: async (request: ChangeProductStatusRequest) =>
        await changeProductStatusGateway(request).catch((error) => {
          throw error;
        }),
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["inventory"] });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        toast({
          title:       "Success",
          description: "Product status updated successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useUpdateProduct: useMutation({
      mutationFn: async (request: UpdateProductRequest) =>
        await updateProductGateway(request).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inventory"] });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        toast({
          title:       "Success",
          description: "Product updated successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useUpdateCategory: useMutation({
      mutationFn: async (category: UpdateCategoryRequest) =>
        await updateCategoryGateway(category).then(response => response.category).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast({
          title:       "Success",
          description: "Category updated successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useDeleteProduct: useMutation({
      mutationFn: async (productId: string) =>
        await deleteProductGateway({ id: productId }).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["inventory"] });
        queryClient.invalidateQueries({ queryKey: ["product"] });
        toast({
          title:       "Success",
          description: "Product deleted successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),

    useRemoveWishlist: useMutation({
      mutationFn: async (request: RemoveWishlistRequest) =>
        await removeWishlistGateway(request).catch((error) => {
          throw error;
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        toast({
          title:       "Success",
          description: "Product removed from wishlist successfully",
        });
      },
      onError: (error) => {
        console.log("error", error);
        throw error;
      },
    }),
  };
}
