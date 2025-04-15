import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { GetProductResponse, GetVariantsForCartRequest, GetVariantsForCartResponse, VariantCart } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const getVariantsForCart= async (call: ServerUnaryCall<GetVariantsForCartRequest, GetVariantsForCartResponse>, callback: sendUnaryData<GetVariantsForCartResponse>) => {
  try {
    const { variantIds } = call.request
    console.log(call.request, "call.request")
    const variants = await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        select: {
          id: true,
          price: true,
          imageIds: true,
          quantity: true,
        },
      });
    
      // 2. Extract first image IDs
      const firstImageIds = variants
        .map(v => v.imageIds[0])
        .filter(Boolean); // Filter out undefined/null
    
      // 3. Fetch corresponding ProductImages
      const images = await prisma.productImage.findMany({
        where: { id: { in: firstImageIds } },
        select: { id: true, url: true },
      });
    
      // 4. Map imageId to URL
      const imageMap = new Map(images.map(img => [img.id, img.url]));
    
      // 5. Combine results
      const response: VariantCart[] = variants.map(variant => {
        const firstImageId = variant.imageIds[0];
        return {
          id: variant.id,
          price: variant.price,
          image: imageMap.get(firstImageId) ?? "",
          quantity: variant.quantity,
        };
      });

    console.log(response, "response")
    callback(null, { variants: response })
  } catch (error) {
    handleError(error, callback)
  }
}