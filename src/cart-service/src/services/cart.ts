import { getCart } from "./carts/get-cart"
import { addItem } from "./carts/add-item-cart"
import { updateItem } from "./carts/update-item-cart"
import { removeItem } from "./carts/remove-item-cart"
import { clearCart } from "./carts/clear-cart"
// import { validateCart } from "./carts/validate-cart"
import { type UntypedServiceImplementation } from "@grpc/grpc-js"

export const CartService: UntypedServiceImplementation = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  // validateCart
} 