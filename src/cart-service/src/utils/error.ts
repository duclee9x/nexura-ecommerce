import type { sendUnaryData } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'

export function handleError(error: unknown, callback: sendUnaryData<any>) {
  console.error('Error:', error)
  
  if (error instanceof Error) {
    callback({
      code: Status.INTERNAL,
      message: error.message
    })
  } else {
    callback({
      code: Status.INTERNAL,
      message: 'An unknown error occurred'
    })
  }
} 