import { client } from "../client";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
        return new Response("Name is required", { status: 400 });
    }
    
    // Don't append .jpeg if the name already has an extension
    const fileName = name.includes('.') ? name : `${name}.jpeg`;
    const url = await client.presignedGetObject('avatar', fileName, 60 * 5);
    
    return new Response(JSON.stringify({ url }), { 
        headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=300" // 5 minutes cache
        } 
    });
}

