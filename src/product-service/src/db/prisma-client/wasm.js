
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  costPrice: 'costPrice',
  basePrice: 'basePrice',
  sku: 'sku',
  barcode: 'barcode',
  featured: 'featured',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  taxable: 'taxable',
  shippable: 'shippable',
  categories: 'categories',
  categoryIds: 'categoryIds',
  brandId: 'brandId'
};

exports.Prisma.RelatedProductScalarFieldEnum = {
  id: 'id',
  fromProductId: 'fromProductId',
  toProductId: 'toProductId'
};

exports.Prisma.ProductImageScalarFieldEnum = {
  id: 'id',
  url: 'url',
  blurhash: 'blurhash',
  isMain: 'isMain',
  productId: 'productId',
  createdAt: 'createdAt'
};

exports.Prisma.WishlistScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StockScalarFieldEnum = {
  id: 'id',
  quantity: 'quantity',
  reserved: 'reserved',
  variantId: 'variantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReservationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReservationItemScalarFieldEnum = {
  id: 'id',
  quantity: 'quantity',
  variantId: 'variantId',
  reservationId: 'reservationId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductVariantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sku: 'sku',
  price: 'price',
  lowStockThreshold: 'lowStockThreshold',
  colorValue: 'colorValue',
  colorName: 'colorName',
  attributesIds: 'attributesIds',
  imageIds: 'imageIds',
  productId: 'productId',
  warehouseId: 'warehouseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VariantAttributeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  extraValue: 'extraValue',
  variantId: 'variantId'
};

exports.Prisma.ProductAttributeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  required: 'required',
  visible: 'visible',
  variantable: 'variantable',
  filterable: 'filterable',
  searchable: 'searchable',
  displayOrder: 'displayOrder',
  values: 'values',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SizeChartScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  description: 'description',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SizeChartColumnScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  unit: 'unit',
  sizeChartId: 'sizeChartId',
  createdAt: 'createdAt'
};

exports.Prisma.SizeChartRowScalarFieldEnum = {
  id: 'id',
  name: 'name',
  values: 'values',
  sizeChartId: 'sizeChartId',
  createdAt: 'createdAt'
};

exports.Prisma.SizeChartImageScalarFieldEnum = {
  id: 'id',
  url: 'url',
  name: 'name',
  sizeChartId: 'sizeChartId',
  createdAt: 'createdAt'
};

exports.Prisma.ProductDimensionScalarFieldEnum = {
  id: 'id',
  length: 'length',
  width: 'width',
  height: 'height',
  weight: 'weight',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductSEOScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  keywords: 'keywords',
  productId: 'productId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  parentId: 'parentId',
  productIds: 'productIds',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductTagScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  tagId: 'tagId',
  createdAt: 'createdAt'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  name: 'name',
  logo: 'logo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WarehouseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  location: 'location',
  address: 'address',
  manager: 'manager',
  contact: 'contact',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  Product: 'Product',
  RelatedProduct: 'RelatedProduct',
  ProductImage: 'ProductImage',
  Wishlist: 'Wishlist',
  Stock: 'Stock',
  Reservation: 'Reservation',
  ReservationItem: 'ReservationItem',
  ProductVariant: 'ProductVariant',
  VariantAttribute: 'VariantAttribute',
  ProductAttribute: 'ProductAttribute',
  SizeChart: 'SizeChart',
  SizeChartColumn: 'SizeChartColumn',
  SizeChartRow: 'SizeChartRow',
  SizeChartImage: 'SizeChartImage',
  ProductDimension: 'ProductDimension',
  ProductSEO: 'ProductSEO',
  Category: 'Category',
  Tag: 'Tag',
  ProductTag: 'ProductTag',
  Brand: 'Brand',
  Warehouse: 'Warehouse'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
