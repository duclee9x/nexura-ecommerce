import type { UntypedServiceImplementation } from '@grpc/grpc-js'
import { newBrand } from './brands/new-brand'
import { getAllBrand } from './brands/get-all-brand'
import { removeBrand } from './brands/remove-brand'
import { createCategory } from './categories/create-category'
import { removeCategory } from './categories/remove-category'
import { getAllCategory } from './categories/get-all-category'
import { updateCategory } from './categories/update-category'
import { getProductAttributes } from './attributes/get-product-attributes'
import { updateProductAttribute } from './attributes/update-product-attribute'
import { deleteProductAttribute } from './attributes/delete-product-attribute'
import { createProductAttribute } from './attributes/create-product-attribute'
import { createProduct } from './products/create-product'
import { updateProduct } from './products/update-product'
import { deleteProduct } from './products/delete-product'
import { getProduct } from './products/get-product'
import { listProducts } from './products/list-products'
import { getWarehouses } from './warehouses/get-warehouses'
import { getVariantsForCart } from './products/get-variants-for-cart'
import { validateAndReserve } from "./products/validate-and-reserve"
import { releaseReservation } from "./products/release-reservation"
import { commitReservation } from "./products/commit-reservation"
import { changeProductStatus } from './products/change-product-status'
import { addWishlist } from './products/add-wishlist'
import { getWishlist } from './products/get-wishlist'
import { removeWishlist } from './products/remove-wishlist'
export const productService: UntypedServiceImplementation = {
  newBrand,
  removeBrand,
  getAllBrand,

  createCategory,
  removeCategory,
  getAllCategory,
  updateCategory,

  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  getVariantsForCart,
  changeProductStatus,
  getProductAttributes,
  updateProductAttribute,
  deleteProductAttribute,
  createProductAttribute,

  // createVariant: createVariant,
  getWarehouses,
 
  validateAndReserve,
  releaseReservation,
  commitReservation,

  addWishlist,
  getWishlist,
  removeWishlist
} 