import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { CreateProductRequest, CreateProductResponse } from '@nexura/grpc_gateway/protos'

const prisma = new PrismaClient()

export const createProduct = async (call: ServerUnaryCall<CreateProductRequest, CreateProductResponse>, callback: sendUnaryData<CreateProductResponse>) => {
  try {
    console.log("Creating product", call.request)
    const productData = call.request.product
    if (productData == undefined) {
      throw new Error("Product data is required")
    }

    // Validate required fields
    if (!productData.name) throw new Error("Product name is required")
    if (!productData.slug) throw new Error("Product slug is required")
    if (!productData.sku) throw new Error("Product SKU is required")
    if (!productData.variants?.length) throw new Error("At least one variant is required")

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

    // Check for existing SKUs first
    const existingSkus = await Promise.all(
      productData.variants?.map(async (variant) => {
        const existingVariant = await prisma.productVariant.findUnique({
          where: { sku: variant.sku }
        })
        return existingVariant ? variant.sku : null
      }) || []
    )

    const duplicateSkus = existingSkus.filter(sku => sku !== null)
    if (duplicateSkus.length > 0) {
      throw new Error(`The following SKUs already exist: ${duplicateSkus.join(', ')}`)
    }

    const variants = productData.variants?.map((variant) => {
      // Create a new variant object without the ID if it's a generated one
      const variantData = {
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
            id: variant.warehouseId || defaultWarehouse.id
          }
        },
        stock: {
          create: {
            quantity: variant.stock?.quantity || 0,
            reserved: variant.stock?.reserved || 0
          }
        }
      }

      return variantData
    }) || []

    const product = await prisma.product.create({
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

    const response: CreateProductResponse = {
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        costPrice: product.costPrice,
        basePrice: product.basePrice,
        sku: product.sku,
        barcode: product.barcode || "",
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
        images: product.images.map((img) => ({
          id: img.id,
          url: img.url,
          isMain: img.isMain,
          blurhash: img.blurhash,
        })),
        sizeCharts: product.sizeCharts.map((sizeChart) => ({
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
        attributes: product.attributes.map((attr) => ({
          id: attr.id,
          name: attr.name,
          required: attr.required,
          visible: attr.visible,
          values: attr.values,
          variantable: attr.variantable,
          filterable: attr.filterable,
          searchable: attr.searchable,
          displayOrder: attr.displayOrder,
          productId: product.id,
        })),
        variants: product.variants.map((variant) => ({
          id: variant.id,
          sku: variant.sku,
          price: variant.price,
          lowStockThreshold: variant.lowStockThreshold,
          warehouseId: variant.warehouseId,
          imageIds: variant.imageIds,
          attributes: variant.attributes.map((attr) => ({
            id: attr.id,
            name: attr.name,
            value: attr.value,
            extraValue: attr.extraValue || "",
          })),
          stock: variant.stock ? {
            quantity: variant.stock.quantity,
            reserved: variant.stock.reserved
          } : {
            quantity: 0,
            reserved: 0
          }
        })),
        brandId: product.brandId || "",
        featured: product.featured,
        status: product.status,
        dimensions: product.dimensions ? {
          length: product.dimensions.length,
          width: product.dimensions.width,
          height: product.dimensions.height,
          weight: product.dimensions.weight,
        } : undefined,
        seo: product.seo ? {
          title: product.seo.title,
          description: product.seo.description,
          keywords: product.seo.keywords,
        } : undefined,
        taxable: product.taxable,
        shippable: product.shippable,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      }
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}