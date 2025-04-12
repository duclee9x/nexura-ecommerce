import { UntypedServiceImplementation } from '@grpc/grpc-js'
import { newBrand } from './brands/new-brand'
import { getAllBrand } from './brands/get-all-brand'
import { deleteBrand } from './brands/delete-brand'
import { createCategory } from './categories/create-category'
import { deleteCategory } from './categories/delete-category'
import { getAllCategory } from './categories/get-all-category'
import { updateCategory } from './categories/update-category'
import { getProductAttributes } from './attributes/get-product-attributes'
import { updateProductAttribute } from './attributes/update-product-attribute'
import { deleteProductAttribute } from './attributes/delete-product-attribute'
import { createProductAttribute } from './attributes/create-product-attribute'
import { createProduct } from './products/create-product'
import { updateProduct } from './products/update-product'
import { deleteProduct } from './products/delete-product'
import { getProduct } from './products/get-products'
import { listProducts } from './products/list-products'
import { getWarehouses } from './warehouses/get-warehouses'
// import { createVariant } from './variants/create-variant'
export const productService: UntypedServiceImplementation = {
  newBrand: newBrand,
  removeBrand: deleteBrand,
  getAllBrand: getAllBrand,

  createCategory: createCategory,
  removeCategory: deleteCategory,
  getAllCategory: getAllCategory,
  updateCategory: updateCategory,

  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getProduct: getProduct,
  listProducts: listProducts,

  getProductAttributes: getProductAttributes,
  updateProductAttribute: updateProductAttribute,
  deleteProductAttribute: deleteProductAttribute,
  createProductAttribute: createProductAttribute,

  // createVariant: createVariant,
  getWarehouses: getWarehouses,
  
} 