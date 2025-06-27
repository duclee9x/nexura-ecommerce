import { NextResponse } from "next/server"
import { createOrderWorkflowGateway } from "@nexura/grpc_gateway/gateway"
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await createOrderWorkflowGateway(body)
    
    return NextResponse.json({success:true, data:response})
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({success:false, error: "Internal server error" }, { status: 500 })
  }
}

