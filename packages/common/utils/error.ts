import { Status } from "@grpc/grpc-js/build/src/constants"

export function handleError(error: any, callback: any) {
  console.error("Error:", error)
   callback(
    {
      code: Status.INTERNAL,
      details: error.message,
    },
    null
  )
} 