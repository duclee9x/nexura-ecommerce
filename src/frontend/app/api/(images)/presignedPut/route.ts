import { client } from "../client";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
        return new Response("Name is required", { status: 400 });
    }
    const url = await client.presignedPutObject('avatar', name, 60 * 5)
    return new Response(JSON.stringify({ url }), { headers: { "Content-Type": "application/json" } });
}

