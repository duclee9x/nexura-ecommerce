import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { GetProductByIdRequest, GetProductResponse } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const getProductById = async (call: ServerUnaryCall<GetProductByIdRequest, GetProductResponse>, callback: sendUnaryData<GetProductResponse>) => {
  try {
    const { id } = call.request
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
        attributes: true,
        sizeCharts: {
          include: {
            columns: true,
            rows: true,
            images: true,
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
            warehouse: true,
          }
        },
        dimensions: true,
        seo: true,
      }
    })

    if (!product) {
      throw new Error("Product not found")
    }

    const response: GetProductResponse = {
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        costPrice: product.costPrice,
        basePrice: product.basePrice,
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
        sku: product.sku,
        barcode: product.barcode || "",
        brandId: product.brandId || "",
        featured: product.featured,
        status: product.status,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        seo: product.seo ? {
          title: product.seo.title,
          description: product.seo.description,
          keywords: product.seo.keywords,
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
        images: product.images.map(img => ({
          id: img.id,
          url: img.url,
          isMain: img.isMain,
          blurhash: img.blurhash,
        })),
        attributes: product.attributes.map(attr => ({
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
        variants: product.variants.map(variant => ({
          id: variant.id,
          sku: variant.sku,
          price: variant.price,
          quantity: variant.quantity,
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
        dimensions: product.dimensions ? {
          length: product.dimensions.length,
          width: product.dimensions.width,
          height: product.dimensions.height,
          weight: product.dimensions.weight,
        } : undefined,
      },
    }
    console.log(response, "response")
    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}