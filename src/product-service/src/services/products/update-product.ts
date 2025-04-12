import { PrismaClient, Prisma } from '@prisma/client'
import { handleError } from '../../utils/error'
import { ServerUnaryCall } from '@grpc/grpc-js'
import { UpdateProductRequest, UpdateProductResponse } from '@/src/proto/nexura'
import { sendUnaryData } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const updateProduct = async (call: ServerUnaryCall<UpdateProductRequest, UpdateProductResponse>, callback: sendUnaryData<UpdateProductResponse>) => {
  try {
    const request = call.request
    if (request.product == undefined) {
      throw new Error("Product is required")
    }
    console.log(request.product, "request")
    // Find or create default warehouse
    const defaultWarehouse = await prisma.warehouse.upsert({
      where: {
        code: "WH-DEFAULT"
      },
      update: {},
      create: {
        name: "Default Warehouse",
        code: "WH-DEFAULT",
        status: "active",
        address: "Default Location",
        manager: "System",
        contact: "system@nexura.com"
      }
    })

    // Update product with all related data
    const updatedProduct = await prisma.product.update({
      where: {
        id: request.product.id,
      },
      data: {
        name: request.product.name,
        slug: request.product.slug,
        description: request.product.description,
        costPrice: request.product.costPrice,
        basePrice: request.product.basePrice,
        sku: request.product.sku,
        barcode: request.product.barcode,
        brandId: request.product.brandId,
        featured: request.product.featured,
        status: request.product.status,
        taxable: request.product.taxable,
        shippable: request.product.shippable,
        categories: request.product.categories,
        images: {
          deleteMany: {},
          create: request.product.images?.map((img) => ({
            url: img.url,
            blurhash: img.blurhash,
            isMain: img.isMain,
          })) || [],
        },
        attributes: {
          deleteMany: {},
          create: request.product.attributes?.map((attr) => ({
            name: attr.name,
            required: attr.required,
            visible: attr.visible,
            values: attr.values,
            variantable: attr.variantable,
            filterable: attr.filterable,
            searchable: attr.searchable,
            displayOrder: attr.displayOrder,
          })) || [],
        },
        variants: {
          deleteMany: {},
          create: request.product.variants?.map((variant) => ({
            sku: variant.sku,
            price: variant.price,
            quantity: variant.quantity,
            lowStockThreshold: variant.lowStockThreshold,
            images: {
              create: variant.images?.map((img) => ({
                url: img.url,
                blurhash: img.blurhash,
                isMain: img.isMain,
              })) || [],
            },
            attributes: {
              create: variant.attributes?.map((attr) => ({
                name: attr.name,
                value: attr.value,
                extraValue: attr.extraValue || "",
              })) || [],
            },
            warehouseId: variant.warehouseId || defaultWarehouse.id
          })) || [],
        },
        productTags: {
          deleteMany: {},
          create: request.product.productTags?.map(productTag => {
            if (!productTag?.tag?.name) {
              throw new Error("Tag name is required");
            }
            return {
              tag: {
                connectOrCreate: {
                  where: { name: productTag.tag.name },
                  create: { name: productTag.tag.name }
                }
              }
            };
          }) || []
        },
        dimensions: request.product.dimensions ? {
          upsert: {
            create: {
              length: request.product.dimensions.length || 0,
              width: request.product.dimensions.width || 0,
              height: request.product.dimensions.height || 0,
              weight: request.product.dimensions.weight || 0,
            },
            update: {
              length: request.product.dimensions.length || 0,
              width: request.product.dimensions.width || 0,
              height: request.product.dimensions.height || 0,
              weight: request.product.dimensions.weight || 0,
            }
          }
        } : undefined,
        seo: request.product.seo ? {
          upsert: {
            create: {
              title: request.product.seo.title,
              description: request.product.seo.description,
              keywords: request.product.seo.keywords,
            },
            update: {
              title: request.product.seo.title,
              description: request.product.seo.description,
              keywords: request.product.seo.keywords,
            }
          }
        } : undefined,
      },
      include: {
        images: true,
        attributes: true,
        variants: {
          include: {
            images: true,
            attributes: true,
            warehouse: true,
          }
        },
        sizeCharts: {
          include: {
            columns: true,
            rows: true,
            images: true,
          }
        },
        productTags: {
          include: {
            tag: true
          }
        },
        dimensions: true,
        seo: true
      }
    })

    const response: UpdateProductResponse = {
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        description: updatedProduct.description,
        costPrice: updatedProduct.costPrice,
        basePrice: updatedProduct.basePrice,
        sizeCharts: updatedProduct.sizeCharts.map((sizeChart) => ({
          id: sizeChart.id,
          name: sizeChart.name,
          description: sizeChart.description || "",
          columns: sizeChart.columns.map((column) => ({
            id: column.id,
            name: column.name,
            type: column.type,
            unit: column.unit || "",
            sizeChartId: column.sizeChartId,
            createdAt: column.createdAt.toISOString(),
          })),
          rows: sizeChart.rows.map((row) => ({
            id: row.id,
            name: row.name,
            values: row.values,
            sizeChartId: row.sizeChartId,
            createdAt: row.createdAt.toISOString(),
            cells: []
          })),
          images: sizeChart.images.map((image) => ({
            id: image.id,
            name: image.name,
            createdAt: image.createdAt.toISOString(),
            url: image.url,
            sizeChartId: image.sizeChartId,
          })),
          category: sizeChart.category,
          createdAt: sizeChart.createdAt.toISOString(),
          updatedAt: sizeChart.updatedAt.toISOString(),
          productId: sizeChart.productId,
        })),
        sku: updatedProduct.sku,
        barcode: updatedProduct.barcode || "",
        categories: updatedProduct.categories,
        productTags: updatedProduct.productTags.map((pt) => ({
          id: pt.id,
          tag: {
            id: pt.tag.id,
            name: pt.tag.name,
            createdAt: pt.tag.createdAt.toISOString(),
            updatedAt: pt.tag.updatedAt.toISOString()
          },
          productId: updatedProduct.id
        })),
        images: updatedProduct.images.map((img) => ({
          id: img.id,
          blurhash: img.blurhash,
          url: img.url,
          isMain: img.isMain,
        })),
        attributes: updatedProduct.attributes.map((attr) => ({
          id: attr.id,
          name: attr.name,
          required: attr.required,
          visible: attr.visible,
          values: attr.values,
          variantable: attr.variantable,
          filterable: attr.filterable,
          searchable: attr.searchable,
          displayOrder: attr.displayOrder,
          productId: updatedProduct.id,
        })),
        variants: updatedProduct.variants.map((variant) => ({
          id: variant.id,
          sku: variant.sku,
          price: variant.price,
          quantity: variant.quantity,
          lowStockThreshold: variant.lowStockThreshold,
          warehouseId: variant.warehouseId,
          images: variant.images.map((img) => ({
            id: img.id,
            url: img.url,
            blurhash: img.blurhash,
            isMain: img.isMain,
          })),
          attributes: variant.attributes.map((attr) => ({
            id: attr.id,
            name: attr.name,
            value: attr.value,
            extraValue: attr.extraValue || "",
          })),
        })),
        brandId: updatedProduct.brandId || "",
        featured: updatedProduct.featured,
        status: updatedProduct.status,
        dimensions: updatedProduct.dimensions ? {
          length: updatedProduct.dimensions.length || 0,
          width: updatedProduct.dimensions.width || 0,
          height: updatedProduct.dimensions.height || 0,
          weight: updatedProduct.dimensions.weight || 0,
        } : undefined,
        seo: updatedProduct.seo ? {
          title: updatedProduct.seo.title,
          description: updatedProduct.seo.description,
          keywords: updatedProduct.seo.keywords,
        } : undefined,
        taxable: updatedProduct.taxable,
        shippable: updatedProduct.shippable,
        createdAt: updatedProduct.createdAt.toISOString(),
        updatedAt: updatedProduct.updatedAt.toISOString(),
      }
    }
    console.log(response, "response update")
    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}