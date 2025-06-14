import { Status } from "@grpc/grpc-js/build/src/constants"
import { status } from '@grpc/grpc-js';
import type {ServiceError} from '@grpc/grpc-js'
export function isServiceError(error: unknown): error is ServiceError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as any).code === 'number' &&
    'details' in error &&
    typeof (error as any).details === 'string' &&
    Object.values(status).includes((error as any).code)
  );
}
export function handleError(error: ServiceError, callback: any) {
  callback(
    {
      code:    Status.INTERNAL,
      details: error.message,
    },
    null
  )
}   