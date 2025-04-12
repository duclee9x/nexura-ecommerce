import { client } from "../client";

const ALLOWED_BUCKETS = ['products', 'variants', 'size-charts', 'brands'] as const;
type BucketName = typeof ALLOWED_BUCKETS[number];

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const names = searchParams.getAll("name");
    const bucket = searchParams.get("bucket") as BucketName;

    if (!names.length) {
        return new Response("Name is required", { status: 400 });
    }

    if (!bucket || !ALLOWED_BUCKETS.includes(bucket)) {
        return new Response("Invalid or missing bucket name", { status: 400 });
    }

    try {
        const urls = await Promise.all(
            names.map(name => client.presignedPutObject(bucket, name, 60 * 5))
        );

        return new Response(JSON.stringify({ urls }), { 
            headers: { "Content-Type": "application/json" } 
        });
    } catch (error) {
        return new Response("Failed to generate presigned URLs", { status: 500 });
    }
}

