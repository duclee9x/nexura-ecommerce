import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { GetProductResponse, GetVariantsForCartRequest, GetVariantsForCartResponse, VariantCart } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const getVariantsForCart = async (call: ServerUnaryCall<GetVariantsForCartRequest, GetVariantsForCartResponse>, callback: sendUnaryData<GetVariantsForCartResponse>) => {
  try {
    const { variantIds } = call.request
    console.log(call.request, "call.request")
    
    // Fetch variants with their associated product information
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      select: {
        id: true,
        price: true,
        imageIds: true,
        quantity: true,
        attributes: true,
        product: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
    });

    // Extract first image IDs
    const firstImageIds = variants
      .map(v => v.imageIds[0])
      .filter(Boolean); // Filter out undefined/null

    // Fetch corresponding ProductImages
    const images = await prisma.productImage.findMany({
      where: { id: { in: firstImageIds } },
      select: { id: true, url: true },
    });

    // Map imageId to URL
    const imageMap = new Map(images.map(img => [img.id, img.url]));

    // Combine results
    const response: VariantCart[] = variants.map(variant => {
      const firstImageId = variant.imageIds[0];
      return {
        id: variant.id,
        price: variant.price,
        image: imageMap.get(firstImageId) ?? "",
        quantity: variant.quantity,
        variantName: variant.attributes.map(attribute => attribute.name + ": " + attribute.value).join(", "),
        productName: variant.product.name,
        productSlug: variant.product.slug,
        attributes: variant.attributes.map(attribute => ({
          id: attribute.id,
          name: attribute.name,
          value: attribute.value,
          extraValue: attribute.extraValue ?? ""
        })),
      };
    });

    console.log(response, "response")
    callback(null, { variants: response })
  } catch (error) {
    handleError(error, callback)
  }
}