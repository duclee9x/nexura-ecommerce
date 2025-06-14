import { GetCartRequest, GetCartResponse } from "@nexura/grpc_gateway/protos";
import type {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
} from "@grpc/grpc-js";
import { PrismaClient } from "@nexura/cart-service/src/db/prisma-client";
import { handleError } from "@nexura/common/utils";

// Create a single Prisma client instance
const prisma = new PrismaClient({
  log: [
    "query", "error", "warn"
  ],
});

export const getCart = async (
  call: ServerUnaryCall<GetCartRequest, GetCartResponse>,
  callback: sendUnaryData<GetCartResponse>
) => { try {
  const { userId } = call.request;
  console.log("userId", userId);
  if (!userId) { throw new Error("User ID is required"); }

  const cart = await prisma.cart.findUnique({
    where:   { userId },
    include: {
      items: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!cart) {
    callback(null, {
      cart: {
        id:           "",
        userId:       "",
        createdAt:    "",
        updatedAt:    "",
        currencyCode: "",
        items:        [],
      },
    });
    return;
  }

  const response: GetCartResponse = {
    cart: {
      id:           cart.id,
      userId:       cart.userId,
      createdAt:    cart.createdAt.toISOString(),
      updatedAt:    cart.updatedAt.toISOString(),
      currencyCode: cart.currencyCode,
      items:        cart.items.map(item => ({
        id:        item.id,
        productId: item.productId,
        variantId: item.variantId,
        image:     item.image ?? "",
        quantity:  item.quantity,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
    },
  };

  callback(null, response);
  return;
} catch (error) { handleError(error as ServiceError, callback); } finally {
  // Ensure proper cleanup
  await prisma.$disconnect(); } };
