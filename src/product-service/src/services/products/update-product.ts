import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { UpdateProductRequest, UpdateProductResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const updateProduct = async (call: ServerUnaryCall<UpdateProductRequest, UpdateProductResponse>, callback: sendUnaryData<UpdateProductResponse>) => {
  try {
    const request = call.request
    if (!request.product) {
      throw new Error("Product is required")
    }

    const product = request.product

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
    await prisma.$transaction(async (tx) => {
      if (request.relatedProductIds && request.relatedProductIds.length > 0) {
        // First, delete existing related products
        await tx.relatedProduct.deleteMany({
          where: {
            fromProductId: product.id
          }
        })

        // Then create new related product relationships
        const relatedProducts = request.relatedProductIds.map((id) => ({
          fromProductId: product.id,
          toProductId: id
        }))

        await prisma.relatedProduct.createMany({
          data: relatedProducts
        })
      }
      // Update product with all related data
      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          costPrice: product.costPrice,
          basePrice: product.basePrice,
          sku: product.sku,
          barcode: product.barcode,
          brandId: product.brandId,
          featured: product.featured,
          status: product.status,
          taxable: product.taxable,
          shippable: product.shippable,
          categories: product.categories,
          images: {
            deleteMany: {
              id: {
                notIn: product.images?.map(img => img.id) || []
              }
            },
            upsert: product.images?.map((img) => ({
              where: { id: img.id },
              create: {
                id: img.id,
                url: img.url,
                blurhash: img.blurhash,
                isMain: img.isMain,
              },
              update: {
                url: img.url,
                blurhash: img.blurhash,
                isMain: img.isMain,
              }
            })) || [],
          },
          attributes: {
            deleteMany: {},
            create: product.attributes?.map((attr) => ({
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
            create: product.variants?.map((variant) => ({
              sku: variant.sku,
              price: variant.price,
              lowStockThreshold: variant.lowStockThreshold,
              imageIds: variant.imageIds,
              attributes: {
                create: variant.attributes?.map((attr) => ({
                  name: attr.name,
                  value: attr.value,
                  extraValue: attr.extraValue || "",
                })) || [],
              },
              warehouseId: variant.warehouseId || defaultWarehouse.id,
              stock: {
                create: {
                  quantity: variant.stock?.quantity ?? undefined,
                  reserved: variant.stock?.reserved ?? undefined
                }
              }
            })) || [],
          },
          productTags: {
            deleteMany: {},
            create: product.productTags?.map(productTag => {
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
          dimensions: product.dimensions ? {
            upsert: {
              create: {
                length: product.dimensions.length || 0,
                width: product.dimensions.width || 0,
                height: product.dimensions.height || 0,
                weight: product.dimensions.weight || 0,
              },
              update: {
                length: product.dimensions.length || 0,
                width: product.dimensions.width || 0,
                height: product.dimensions.height || 0,
                weight: product.dimensions.weight || 0,
              }
            }
          } : undefined,
          seo: product.seo ? {
            upsert: {
              create: {
                title: product.seo.title,
                description: product.seo.description,
                keywords: product.seo.keywords,
              },
              update: {
                title: product.seo.title,
                description: product.seo.description,
                keywords: product.seo.keywords,
              }
            }
          } : undefined,
        },
        include: {
          images: true,
          attributes: true,
          variants: {
            include: {
              attributes: true,
              warehouse: true,
              stock: true
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
    })

    const response: UpdateProductResponse = {
      success: true
    }
    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}