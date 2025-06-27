import { AddItemRequest, AddItemResponse } from "@nexura/grpc_gateway/protos";
import type {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
} from "@grpc/grpc-js";

import { PrismaClient } from "../../db/prisma-client";

import { handleError } from "@nexura/common/utils";

const prisma = new PrismaClient();

export const addItem = async (
  call: ServerUnaryCall<AddItemRequest, AddItemResponse>,
  callback: sendUnaryData<AddItemResponse>
) => { try {
  const { userId, productId, variantId, quantity, image, currencyCode } =
      call.request;

  if (!userId || !productId || !variantId || !quantity) { throw new Error("Missing required fields"); }

  let cart = await prisma.cart.findUnique({
    where:   { userId },
    include: { items: true },
  });

  if (!cart) { cart = await prisma.cart.create({
    data: {
      userId,
      currencyCode: currencyCode || "USD",
    },
    include: { items: true },
  }); }

  const existingItem = cart.items.find(
    item => item.productId === productId && item.variantId === variantId
  );

  if (existingItem) { await prisma.cartItem.update({
    where: { id: existingItem.id },
    data:  {
      quantity: existingItem.quantity + quantity,
      image:    image || existingItem.image,
    },
  }); } else { await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      variantId,
      quantity,
      image,
    },
  }); }

  const updatedCart = await prisma.cart.findUnique({
    where:   { id: cart.id },
    include: { items: true },
  });

  if (!updatedCart) { throw new Error("Failed to update cart"); }

  callback(null, {
    cart: {
      id:           updatedCart.id,
      userId:       updatedCart.userId,
      createdAt:    updatedCart.createdAt.toISOString(),
      updatedAt:    updatedCart.updatedAt.toISOString(),
      currencyCode: updatedCart.currencyCode,
      items:        updatedCart.items.map(item => ({
        id:        item.id,
        productId: item.productId,
        variantId: item.variantId,
        image:     item.image ?? "",
        quantity:  item.quantity,
        createdAt: item.createdAt.toString(),
        updatedAt: item.updatedAt.toString(),
      })),
    },
  });
} catch (error) { handleError(error as ServiceError, callback); } };
