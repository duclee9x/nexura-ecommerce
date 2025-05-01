import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { ListProductsResponse, ListProductsRequest, Product } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const listProducts = async (call: ServerUnaryCall<ListProductsRequest, ListProductsResponse>, callback: sendUnaryData<ListProductsResponse>) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        relatedFrom: {
          include: {
            toProduct: {
              include: {
                images: true,
                attributes: true,
                variants: {
                  include: {
                    stock: true,
                    attributes: true,
                  }
                },
                dimensions: true,
                seo: true,
                productTags: {
                  include: {
                    tag: true,
                  }
                },
                sizeCharts: {
                  include: {
                    columns: true,
                    rows: true,
                    images: true,
                  }
                }
              }
            },
          },
        },
        images: true,
        attributes: true,
        productTags: {
          include: {
            tag: true,
          },
        },
        sizeCharts: {
          include: {
            columns: true,
            rows: true,
            images: true,
          },
        },
        variants: {
          include: {
            attributes: true,
            warehouse: true,
            stock: true
          }
        },
        dimensions: true,
        seo: true,
      }
    })

    if (!products) {
      throw new Error("Products not found")
    }

    const response: ListProductsResponse = {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        costPrice: product.costPrice,
        slug: product.slug,
        basePrice: product.basePrice,
        sku: product.sku,
        sizeCharts: product.sizeCharts.map((sizeChart) => ({
          id: sizeChart.id,
          name: sizeChart.name,
          description: sizeChart.description || "",
          category: sizeChart.category,
          productId: sizeChart.productId,
          createdAt: sizeChart.createdAt.toISOString(),
          updatedAt: sizeChart.updatedAt.toISOString(),
          columns: sizeChart.columns.map((column) => ({
            id: column.id,
            name: column.name,
            type: column.type,
            unit: column.unit || "",
            sizeChartId: column.sizeChartId,
            createdAt: column.createdAt.toISOString(),
          })),
          images: sizeChart.images.map((image) => ({
            id: image.id,
            name: image.name,
            createdAt: image.createdAt.toISOString(),
            url: image.url,
            sizeChartId: image.sizeChartId,
          })),
          rows: sizeChart.rows.map((row) => ({
            id: row.id,
            name: row.name,
            values: row.values,
            sizeChartId: row.sizeChartId,
            createdAt: row.createdAt.toISOString(),
            cells: []
          })),
        })),
        barcode: product.barcode || "",
        brandId: product.brandId || "",
        featured: product.featured,
        status: product.status,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        seo: product.seo ? {
          title: product.seo.title || "",
          description: product.seo.description || "",
          keywords: product.seo.keywords || "",
        } : undefined,
        taxable: product.taxable,
        shippable: product.shippable,
        categories: product.categories,
        productTags: product.productTags.map((pt) => ({
          id: pt.id,
          tag: {
            id: pt.tag.id,
            name: pt.tag.name,
            createdAt: pt.tag.createdAt.toISOString(),
            updatedAt: pt.tag.updatedAt.toISOString()
          },
          productId: product.id
        })),
        variants: product.variants.map(variant => ({
          id: variant.id,
          name: variant.name || "",
          sku: variant.sku,
          lowStockThreshold: variant.lowStockThreshold,
          stock: variant.stock ? {
            quantity: variant.stock.quantity,
            reserved: variant.stock.reserved,
          } : {
            quantity: 0,
            reserved: 0
          },
          colorValue: variant.colorValue || "",
          colorName: variant.colorName || "",
          price: variant.price,
          imageIds: variant.imageIds,
          attributes: variant.attributes.map(attribute => ({
            id: attribute.id,
            name: attribute.name || "",
            value: attribute.value || "",
            extraValue: attribute.extraValue || "",
          })),
          warehouseId: variant.warehouseId,
          warehouse: variant.warehouse ? {
            id: variant.warehouse.id,
            name: variant.warehouse.name,
            status: variant.warehouse.status,
          } : undefined,
        })),
        dimensions: product.dimensions ? {
          length: product.dimensions.length,
          width: product.dimensions.width,
          height: product.dimensions.height,
          weight: product.dimensions.weight,
        } : undefined,
        images: product.images.map(image => ({
          id: image.id,
          url: image.url,
          isMain: image.isMain,
          blurhash: image.blurhash,
        })),
        attributes: product.attributes.map(attribute => ({
          id: attribute.id,
          name: attribute.name,
          required: attribute.required,
          searchable: attribute.searchable,
          displayOrder: attribute.displayOrder,
          visible: attribute.visible,
          values: attribute.values,
          productId: attribute.productId,
          variantable: attribute.variantable,
          filterable: attribute.filterable,
        })),
        relatedProducts: product.relatedFrom.map(relation => {
          const relatedProduct = relation.toProduct
          return {
            id: relatedProduct.id,
            name: relatedProduct.name,
            slug: relatedProduct.slug,
            description: relatedProduct.description,
            costPrice: relatedProduct.costPrice,
            basePrice: relatedProduct.basePrice,
            sku: relatedProduct.sku,
            barcode: relatedProduct.barcode || "",
            brandId: relatedProduct.brandId || "",
            featured: relatedProduct.featured,
            status: relatedProduct.status,
            createdAt: relatedProduct.createdAt.toISOString(),
            updatedAt: relatedProduct.updatedAt.toISOString(),
            seo: relatedProduct.seo ? {
              title: relatedProduct.seo.title,
              description: relatedProduct.seo.description,
              keywords: relatedProduct.seo.keywords,
            } : undefined,
            taxable: relatedProduct.taxable,
            shippable: relatedProduct.shippable,
            categories: relatedProduct.categories,
            productTags: relatedProduct.productTags.map((pt) => ({
              id: pt.id,
              tag: {
                id: pt.tag.id,
                name: pt.tag.name,
                createdAt: pt.tag.createdAt.toISOString(),
                updatedAt: pt.tag.updatedAt.toISOString()
              },
              productId: relatedProduct.id
            })),
            sizeCharts: relatedProduct.sizeCharts.map((sizeChart) => ({
              id: sizeChart.id,
              name: sizeChart.name,
              description: sizeChart.description || "",
              category: sizeChart.category,
              productId: sizeChart.productId,
              createdAt: sizeChart.createdAt.toISOString(),
              updatedAt: sizeChart.updatedAt.toISOString(),
              columns: sizeChart.columns.map((column) => ({
                id: column.id,
                name: column.name,
                type: column.type,
                unit: column.unit || "",
                sizeChartId: column.sizeChartId,
                createdAt: column.createdAt.toISOString(),
              })),
              images: sizeChart.images.map((image) => ({
                id: image.id,
                name: image.name,
                createdAt: image.createdAt.toISOString(),
                url: image.url,
                sizeChartId: image.sizeChartId,
              })),
              rows: sizeChart.rows.map((row) => ({
                id: row.id,
                name: row.name,
                values: row.values,
                sizeChartId: row.sizeChartId,
                createdAt: row.createdAt.toISOString(),
                cells: []
              })),
            })),
            images: relatedProduct.images.map(img => ({
              id: img.id,
              url: img.url,
              isMain: img.isMain,
              blurhash: img.blurhash,
            })),
            attributes: relatedProduct.attributes.map(attr => ({
              id: attr.id,
              name: attr.name,
              required: attr.required,
              visible: attr.visible,
              values: attr.values,
              variantable: attr.variantable,
              filterable: attr.filterable,
              searchable: attr.searchable,
              displayOrder: attr.displayOrder,
              productId: relatedProduct.id,
            })),
            variants: relatedProduct.variants.map(variant => ({
              id: variant.id,
              name: variant.name,
              sku: variant.sku,
              price: variant.price,
              stock: variant.stock ? {
                quantity: variant.stock.quantity,
                reserved: variant.stock.reserved,
              } : undefined,
              lowStockThreshold: variant.lowStockThreshold,
              warehouseId: variant.warehouseId,
              imageIds: variant.imageIds,
              attributes: variant.attributes.map(attr => ({
                id: attr.id,
                name: attr.name,
                value: attr.value,
                extraValue: attr.extraValue || "",
              })),
            })),
            dimensions: relatedProduct.dimensions ? {
              length: relatedProduct.dimensions.length,
              width: relatedProduct.dimensions.width,
              height: relatedProduct.dimensions.height,
              weight: relatedProduct.dimensions.weight,
            } : undefined,
            relatedProducts: [], // Related products of related products are not included to avoid circular references
          } as Product
        })
      }))
    }
    
    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}