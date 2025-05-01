import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { CreateProductRequest, CreateProductResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const createProduct = async (call: ServerUnaryCall<CreateProductRequest, CreateProductResponse>, callback: sendUnaryData<CreateProductResponse>) => {
  try {
    const productData = call.request.product
    if (productData == undefined) {
      throw new Error("Product data is required")
    }

    // Validate required fields
    if (!productData.name) throw new Error("Product name is required")
    if (!productData.slug) throw new Error("Product slug is required")
    if (!productData.sku) throw new Error("Product SKU is required")
    if (!productData.variants?.length) throw new Error("At least one variant is required")

    // Check for existing SKUs first
    const variantSkus = productData.variants?.map(variant => variant.sku) || []
    const existingVariants = await prisma.productVariant.findMany({
      where: {
        sku: {
          in: variantSkus
        }
      },
      select: {
        sku: true
      }
    })

    if (existingVariants.length > 0) {
      throw new Error(`The following SKUs already exist: ${existingVariants.map(v => v.sku).join(', ')}`)
    }

    const images = productData.images?.map((image) => ({
      url: image.url,
      isMain: image.isMain,
      blurhash: image.blurhash,
    })) || []

    const attributes = productData.attributes?.map((attribute) => ({
      name: attribute.name,
      required: attribute.required,
      visible: attribute.visible,
      values: attribute.values,
      variantable: attribute.variantable,
      filterable: attribute.filterable,
      searchable: attribute.searchable,
      displayOrder: attribute.displayOrder,
    })) || []

    const variants = productData.variants?.map((variant) => ({
      name: variant.name,
      sku: variant.sku,
      price: variant.price,
      lowStockThreshold: variant.lowStockThreshold,
      imageIds: variant.imageIds || [],
      attributes: {
        create: variant.attributes?.map((attr) => ({
          name: attr.name,
          value: attr.value,
          extraValue: attr.extraValue || "",
        })) || [],
      },
      warehouse: {
        connect: {
          id: variant.warehouseId
        }
      },
      stock: {
        create: {
          quantity: variant.stock?.quantity || 0,
          reserved: variant.stock?.reserved || 0
        }
      }
    })) || []

    // Execute all database operations in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find or create default warehouse
      // const defaultWarehouse = await tx.warehouse.upsert({
      //   where: {
      //     code: "WH-DEFAULT"
      //   },
      //   update: {},
      //   create: {
      //     name: "Default Warehouse",
      //     code: "WH-DEFAULT",
      //     status: "active",
      //     address: "Default Location",
      //     manager: "System",
      //     contact: "system@nexura.com"
      //   }
      // })

      // Create the product
      const product = await tx.product.create({
        data: {
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          costPrice: productData.costPrice,
          basePrice: productData.basePrice,
          sku: productData.sku,
          barcode: productData.barcode,
          categories: productData.categories,
          images: {
            create: images,
          },
          attributes: {
            create: attributes,
          },
          variants: {
            create: variants,
          },
          productTags: {
            create: productData.productTags?.map(productTag => {
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
          brandId: productData.brandId,
          featured: productData.featured,
          status: productData.status,
          dimensions: productData.dimensions ? {
            create: {
              length: productData.dimensions.length,
              width: productData.dimensions.width,
              height: productData.dimensions.height,
              weight: productData.dimensions.weight,
            }
          } : undefined,
          seo: productData.seo ? {
            create: {
              title: productData.seo.title,
              description: productData.seo.description,
              keywords: productData.seo.keywords,
            }
          } : undefined,
          taxable: productData.taxable,
          shippable: productData.shippable,
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
              images: true,
              columns: true,
              rows: true
            }
          },
          dimensions: true,
          seo: true,
          productTags: {
            include: {
              tag: true
            }
          }
        }
      })

      // Create related products if they exist
      if (productData.relatedProducts?.length) {
        await tx.relatedProduct.createMany({
          data: productData.relatedProducts.map(relatedProduct => ({
            fromProductId: product.id,
            toProductId: relatedProduct.id
          }))
        })
      }

      // Fetch the created product with all relations
      const productWithRelations = await tx.product.findUnique({
        where: { id: product.id },
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
              images: true,
              columns: true,
              rows: true
            }
          },
          dimensions: true,
          seo: true,
          productTags: {
            include: {
              tag: true
            }
          },
          relatedTo: {
            include: {
              toProduct: {
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
                      images: true,
                      columns: true,
                      rows: true
                    }
                  },
                  dimensions: true,
                  seo: true,
                  productTags: {
                    include: {
                      tag: true
                    }
                  }
                }
              }
            }
          }
        }
      })

      if (!productWithRelations) {
        throw new Error("Failed to fetch created product with relations")
      }

      return productWithRelations
    })

    const response: CreateProductResponse = {
      product: {
        id: result.id,
        name: result.name,
        slug: result.slug,
        description: result.description,
        costPrice: result.costPrice,
        basePrice: result.basePrice,
        sku: result.sku,
        barcode: result.barcode || "",
        categories: result.categories,
        productTags: result.productTags.map((pt) => ({
          id: pt.id,
          tag: {
            id: pt.tag.id,
            name: pt.tag.name,
            createdAt: pt.tag.createdAt.toISOString(),
            updatedAt: pt.tag.updatedAt.toISOString()
          },
          productId: result.id
        })),
        images: result.images.map((img) => ({
          id: img.id,
          url: img.url,
          isMain: img.isMain,
          blurhash: img.blurhash,
        })),
        relatedProducts: result.relatedTo.map(rp => ({
          id: rp.toProduct.id,
          name: rp.toProduct.name,
          slug: rp.toProduct.slug,
          description: rp.toProduct.description,
          costPrice: rp.toProduct.costPrice,
          basePrice: rp.toProduct.basePrice,
          sku: rp.toProduct.sku,
          barcode: rp.toProduct.barcode || "",
          categories: rp.toProduct.categories,
          images: rp.toProduct.images.map(img => ({
            id: img.id,
            url: img.url,
            isMain: img.isMain,
            blurhash: img.blurhash,
          })),
          attributes: rp.toProduct.attributes.map(attr => ({
            id: attr.id,
            name: attr.name,
            required: attr.required,
            visible: attr.visible,
            values: attr.values,
            variantable: attr.variantable,
            filterable: attr.filterable,
            searchable: attr.searchable,
            displayOrder: attr.displayOrder,
            productId: rp.toProduct.id,
          })),
          variants: rp.toProduct.variants.map(variant => ({
            id: variant.id,
            sku: variant.sku,
            name: variant.name,
            price: variant.price,
            lowStockThreshold: variant.lowStockThreshold,
            warehouseId: variant.warehouseId,
            imageIds: variant.imageIds,
            attributes: variant.attributes.map(attr => ({
              id: attr.id,
              name: attr.name,
              value: attr.value,
              extraValue: attr.extraValue || "",
              variantId: variant.id,
            })),
            stock: variant.stock ? {
              quantity: variant.stock.quantity,
              reserved: variant.stock.reserved
            } : {
              quantity: 0,
              reserved: 0
            }
          })),
          productTags: rp.toProduct.productTags.map(pt => ({
            id: pt.id,
            tag: {
              id: pt.tag.id,
              name: pt.tag.name,
              createdAt: pt.tag.createdAt.toISOString(),
              updatedAt: pt.tag.updatedAt.toISOString()
            },
            productId: rp.toProduct.id
          })),
          sizeCharts: rp.toProduct.sizeCharts.map(sizeChart => ({
            id: sizeChart.id,
            name: sizeChart.name,
            description: sizeChart.description || "",
            category: sizeChart.category,
            productId: sizeChart.productId,
            images: sizeChart.images.map(img => ({
              id: img.id,
              url: img.url,
              name: img.name,
              sizeChartId: img.sizeChartId,
              createdAt: img.createdAt.toISOString(),
            })),
            createdAt: sizeChart.createdAt.toISOString(),
            updatedAt: sizeChart.updatedAt.toISOString(),
            columns: sizeChart.columns.map(column => ({
              id: column.id,
              name: column.name,
              type: column.type,
              unit: column.unit || "",
              sizeChartId: column.sizeChartId,
              createdAt: column.createdAt.toISOString(),
            })),
            rows: sizeChart.rows.map(row => ({
              id: row.id,
              name: row.name,
              cells: row.values as any,
              sizeChartId: row.sizeChartId,
              createdAt: row.createdAt.toISOString(),
            })),
          })),
          relatedProducts: [], // Related products of related products are not included
          brandId: rp.toProduct.brandId || "",
          featured: rp.toProduct.featured,
          status: rp.toProduct.status,
          dimensions: rp.toProduct.dimensions ? {
            length: rp.toProduct.dimensions.length,
            width: rp.toProduct.dimensions.width,
            height: rp.toProduct.dimensions.height,
            weight: rp.toProduct.dimensions.weight,
          } : undefined,
          seo: rp.toProduct.seo ? {
            title: rp.toProduct.seo.title,
            description: rp.toProduct.seo.description,
            keywords: rp.toProduct.seo.keywords,
          } : undefined,
          taxable: rp.toProduct.taxable,
          shippable: rp.toProduct.shippable,
          createdAt: rp.toProduct.createdAt.toISOString(),
          updatedAt: rp.toProduct.updatedAt.toISOString(),
        })),
        sizeCharts: result.sizeCharts.map((sizeChart) => ({
          id: sizeChart.id,
          name: sizeChart.name,
          description: sizeChart.description || "",
          category: sizeChart.category,
          productId: sizeChart.productId,
          images: sizeChart.images.map((img) => ({
            id: img.id,
            url: img.url,
            name: img.name,
            sizeChartId: img.sizeChartId,
            createdAt: img.createdAt.toISOString(),
          })),
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
          rows: sizeChart.rows.map((row) => ({
            id: row.id,
            name: row.name,
            cells: row.values as any,
            sizeChartId: row.sizeChartId,
            createdAt: row.createdAt.toISOString(),
          })),
        })),
        attributes: result.attributes.map((attr) => ({
          id: attr.id,
          name: attr.name,
          required: attr.required,
          visible: attr.visible,
          values: attr.values,
          variantable: attr.variantable,
          filterable: attr.filterable,
          searchable: attr.searchable,
          displayOrder: attr.displayOrder,
          productId: result.id,
        })),
        variants: result.variants.map((variant) => ({
          id: variant.id,
          sku: variant.sku,
          name: variant.name,
          price: variant.price,
          lowStockThreshold: variant.lowStockThreshold,
          warehouseId: variant.warehouseId,
          imageIds: variant.imageIds,
          attributes: variant.attributes.map((attr) => ({
            id: attr.id,
            name: attr.name,
            value: attr.value,
            extraValue: attr.extraValue || "",
            variantId: variant.id,
          })),
          stock: variant.stock ? {
            quantity: variant.stock.quantity,
            reserved: variant.stock.reserved
          } : {
            quantity: 0,
            reserved: 0
          }
        })),
        brandId: result.brandId || "",
        featured: result.featured,
        status: result.status,
        dimensions: result.dimensions ? {
          length: result.dimensions.length,
          width: result.dimensions.width,
          height: result.dimensions.height,
          weight: result.dimensions.weight,
        } : undefined,
        seo: result.seo ? {
          title: result.seo.title,
          description: result.seo.description,
          keywords: result.seo.keywords,
        } : undefined,
        taxable: result.taxable,
        shippable: result.shippable,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
      }
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}