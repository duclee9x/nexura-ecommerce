import { PrismaClient } from '@nexura/product-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { GetProductRequest, GetProductResponse, Product } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const getProduct = async (call: ServerUnaryCall<GetProductRequest, GetProductResponse>, callback: sendUnaryData<GetProductResponse>) => {
  try {
    const { data, type } = call.request
    const whereClause = type === 'id'
      ? { id: data }
      : { slug: data };

    // Run queries concurrently in a transaction
    const [ product, relatedProducts ] = await prisma.$transaction(async (tx) => {
      const productPromise = tx.product.findUnique({
        where:   whereClause,
        include: {
          images:     true,
          attributes: true,
          sizeCharts: {
            include: {
              columns: true,
              rows:    true,
              images:  true,
            },
          },
          productTags: {
            include: {
              tag: true,
            },
          },
          variants: {
            include: {
              attributes: true,
              warehouse:  true,
              stock:      true,
            }
          },
          dimensions: true,
          seo:        true,
        }
      })

      // Get the product first to ensure we have the ID
      const product = await productPromise
      if (!product) {
        return [ null, [] ]
      }

      const relatedProductsPromise = tx.relatedProduct.findMany({
        where: {
          fromProductId: product.id, // Use the actual product ID
        },
        include: {
          toProduct: {
            include: {
              images:     true,
              attributes: true,
              variants:   {
                include: {
                  stock:      true,
                  attributes: true,
                }
              },
              dimensions:  true,
              seo:         true,
              productTags: {
                include: {
                  tag: true,
                }
              },
              sizeCharts: {
                include: {
                  columns: true,
                  rows:    true,
                  images:  true,
                }
              }
            }
          }
        }
      })

      return [ product, await relatedProductsPromise ]
    })

    if (!product) {
      throw new Error("Product not found")
    }

    // Map related products to the expected format
    const mappedRelatedProducts = relatedProducts.map((relation) => {
      const relatedProduct = relation.toProduct
      return {
        id:          relatedProduct.id,
        name:        relatedProduct.name,
        slug:        relatedProduct.slug,
        description: relatedProduct.description,
        costPrice:   relatedProduct.costPrice,
        basePrice:   relatedProduct.basePrice,
        sku:         relatedProduct.sku,
        barcode:     relatedProduct.barcode || "",
        brandId:     relatedProduct.brandId || "",
        featured:    relatedProduct.featured,
        status:      relatedProduct.status,
        createdAt:   relatedProduct.createdAt.toISOString(),
        updatedAt:   relatedProduct.updatedAt.toISOString(),
        seo:         relatedProduct.seo ? {
          title:       relatedProduct.seo.title,
          description: relatedProduct.seo.description,
          keywords:    relatedProduct.seo.keywords,
        } : undefined,
        taxable:     relatedProduct.taxable,
        shippable:   relatedProduct.shippable,
        categories:  relatedProduct.categories,
        productTags: relatedProduct.productTags.map(pt => ({
          id:  pt.id,
          tag: {
            id:        pt.tag.id,
            name:      pt.tag.name,
            createdAt: pt.tag.createdAt.toISOString(),
            updatedAt: pt.tag.updatedAt.toISOString()
          },
          productId: relatedProduct.id
        })),
        sizeCharts: relatedProduct.sizeCharts.map(sizeChart => ({
          id:          sizeChart.id,
          name:        sizeChart.name,
          description: sizeChart.description || "",
          category:    sizeChart.category,
          productId:   sizeChart.productId,
          createdAt:   sizeChart.createdAt.toISOString(),
          updatedAt:   sizeChart.updatedAt.toISOString(),
          columns:     sizeChart.columns.map(column => ({
            id:          column.id,
            name:        column.name,
            type:        column.type,
            unit:        column.unit || "",
            sizeChartId: column.sizeChartId,
            createdAt:   column.createdAt.toISOString(),
          })),
          images: sizeChart.images.map(image => ({
            id:          image.id,
            name:        image.name,
            createdAt:   image.createdAt.toISOString(),
            url:         image.url,
            sizeChartId: image.sizeChartId,
          })),
          rows: sizeChart.rows.map(row => ({
            id:          row.id,
            name:        row.name,
            values:      row.values,
            sizeChartId: row.sizeChartId,
            createdAt:   row.createdAt.toISOString(),
            cells:       []
          })),
        })),
        images: relatedProduct.images.map(img => ({
          id:       img.id,
          url:      img.url,
          isMain:   img.isMain,
          blurhash: img.blurhash,
        })),
        attributes: relatedProduct.attributes.map(attr => ({
          id:           attr.id,
          name:         attr.name,
          required:     attr.required,
          visible:      attr.visible,
          values:       attr.values,
          variantable:  attr.variantable,
          filterable:   attr.filterable,
          searchable:   attr.searchable,
          displayOrder: attr.displayOrder,
          productId:    relatedProduct.id,
        })),
        variants: relatedProduct.variants.map(variant => ({
          id:    variant.id,
          sku:   variant.sku,
          price: variant.price,
          name:  variant.name,
          stock: variant.stock ? {
            quantity: variant.stock.quantity,
            reserved: variant.stock.reserved,
          } : undefined,
          lowStockThreshold: variant.lowStockThreshold,
          warehouseId:       variant.warehouseId,
          imageIds:          variant.imageIds,
          attributes:        variant.attributes.map(attr => ({
            id:         attr.id,
            name:       attr.name,
            value:      attr.value,
            extraValue: attr.extraValue || "",
          })),
        })),
        dimensions: relatedProduct.dimensions ? {
          length: relatedProduct.dimensions.length,
          width:  relatedProduct.dimensions.width,
          height: relatedProduct.dimensions.height,
          weight: relatedProduct.dimensions.weight,
        } : undefined,
        relatedProducts: [], // Related products of related products are not included to avoid circular references
      } as Product
    })

    const response: GetProductResponse = {
      product: {
        id:          product.id,
        name:        product.name,
        slug:        product.slug,
        description: product.description,
        costPrice:   product.costPrice,
        basePrice:   product.basePrice,
        sizeCharts:  product.sizeCharts.map(sizeChart => ({
          id:          sizeChart.id,
          name:        sizeChart.name,
          description: sizeChart.description || "",
          category:    sizeChart.category,
          productId:   sizeChart.productId,
          createdAt:   sizeChart.createdAt.toISOString(),
          updatedAt:   sizeChart.updatedAt.toISOString(),
          columns:     sizeChart.columns.map(column => ({
            id:          column.id,
            name:        column.name,
            type:        column.type,
            unit:        column.unit || "",
            sizeChartId: column.sizeChartId,
            createdAt:   column.createdAt.toISOString(),
          })),
          images: sizeChart.images.map(image => ({
            id:          image.id,
            name:        image.name,
            createdAt:   image.createdAt.toISOString(),
            url:         image.url,
            sizeChartId: image.sizeChartId,
          })),
          rows: sizeChart.rows.map(row => ({
            id:          row.id,
            name:        row.name,
            values:      row.values,
            sizeChartId: row.sizeChartId,
            createdAt:   row.createdAt.toISOString(),
            cells:       []
          })),
        })),
        sku:       product.sku,
        barcode:   product.barcode || "",
        brandId:   product.brandId || "",
        featured:  product.featured,
        status:    product.status,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        seo:       product.seo ? {
          title:       product.seo.title,
          description: product.seo.description,
          keywords:    product.seo.keywords,
        } : undefined,
        taxable:     product.taxable,
        shippable:   product.shippable,
        categories:  product.categories,
        productTags: product.productTags.map(pt => ({
          id:  pt.id,
          tag: {
            id:        pt.tag.id,
            name:      pt.tag.name,
            createdAt: pt.tag.createdAt.toISOString(),
            updatedAt: pt.tag.updatedAt.toISOString()
          },
          productId: product.id
        })),
        images: product.images.map(img => ({
          id:       img.id,
          url:      img.url,
          isMain:   img.isMain,
          blurhash: img.blurhash,
        })),
        attributes: product.attributes.map(attr => ({
          id:           attr.id,
          name:         attr.name,
          required:     attr.required,
          visible:      attr.visible,
          values:       attr.values,
          variantable:  attr.variantable,
          filterable:   attr.filterable,
          searchable:   attr.searchable,
          displayOrder: attr.displayOrder,
          productId:    product.id,
        })),
        variants: product.variants.map(variant => ({
          id:    variant.id,
          name:  variant.name,
          sku:   variant.sku,
          price: variant.price,
          stock: variant.stock ? {
            quantity: variant.stock.quantity,
            reserved: variant.stock.reserved,
          } : undefined,
          lowStockThreshold: variant.lowStockThreshold,
          warehouseId:       variant.warehouseId,
          imageIds:          variant.imageIds,
          attributes:        variant.attributes.map(attr => ({
            id:         attr.id,
            name:       attr.name,
            value:      attr.value,
            extraValue: attr.extraValue || "",
          })),
        })),
        dimensions: product.dimensions ? {
          length: product.dimensions.length,
          width:  product.dimensions.width,
          height: product.dimensions.height,
          weight: product.dimensions.weight,
        } : undefined,
        relatedProducts: mappedRelatedProducts
      },
    }
    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}