// import type { ServiceError } from '@grpc/grpc-js';
// import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
// import { api, SpanStatusCode, defaultTracer, logger } from '../utils';
// import { protoDefinition } from '../protos/load-proto';

// const tracer = defaultTracer('GRPCWrapper');

// export interface GRPCClientOptions {
//   serverAddress: string;
//   timeout?: number;
//   keepAlive?: boolean;
// }

// export class GRPCWrapper {
//   private client: any;
//   private options: GRPCClientOptions;

//   constructor(options: GRPCClientOptions) {
//     this.options = options;
//     this.client = this.createClient();
//   }

//   private createClient() {
//     ;
//     const options = this.options.keepAlive
//       ? {
//         'grpc.keepalive_time_ms': 120000,
//         'grpc.http2.min_time_between_pings_ms': 120000,
//         'grpc.keepalive_timeout_ms': 20000,
//         'grpc.http2.max_pings_without_data': 0,
//         'grpc.keepalive_permit_without_calls': 1,
//       }
//       : {};

//     const protoDescriptor = loadPackageDefinition(protoDefinition);
//     const userService = (protoDescriptor.nexuraTelemetry as any).UserService;

//     return new userService(
//       this.options.serverAddress,
//       credentials.createInsecure(),
//       options
//     );
//   }

//   private async makeRequest<T>(
//     methodName: string,
//     request: any,
//     spanName: string
//   ): Promise<T> {
//     return new Promise((resolve, reject) => {
//       const span = tracer.startSpan(spanName);
//       api.context.with(api.trace.setSpan(api.context.active(), span), () => {
//         logger.info(`Making ${methodName} request`, {
//           traceId: span.spanContext().traceId,
//           request,
//         });

//         // Set timeout if specified
//         const deadline = this.options.timeout
//           ? new Date(Date.now() + this.options.timeout)
//           : undefined;

//         this.client[methodName](
//           request,
//           { deadline },
//           (error: ServiceError | null, response: T) => {
//             if (error) {
//               logger.error(`Error in ${methodName}`, {
//                 error: error.message,
//                 code: error.code,
//               });
//               span.setStatus({
//                 code: SpanStatusCode.ERROR,
//                 message: error.message,
//               });
//               span.end();
//               reject(error);
//               return;
//             }

//             logger.info(`${methodName} successful`, {
//               response,
//               traceId: span.spanContext().traceId,
//             });
//             span.setStatus({
//               code: SpanStatusCode.OK,
//               message: `${methodName} successful`,
//             });
//             span.end();
//             resolve(response);
//           }
//         );
//       });
//     });
//   }

//   // User Service Methods
//   async registerUser(request: {
//     name: string;
//     email: string;
//     password: string;
//   }) {
//     return this.makeRequest('RegisterUser', request, 'registerUser');
//   }

//   async loginUser(request: { email: string; password: string }) {
//     return this.makeRequest('LoginUser', request, 'loginUser');
//   }

//   async getUser(request: { id: number }) {
//     return this.makeRequest('GetUser', request, 'getUser');
//   }

//   async updateUser(request: { id: number; email: string }) {
//     return this.makeRequest('UpdateUser', request, 'updateUser');
//   }

//   async deleteUser(request: { id: number }) {
//     return this.makeRequest('DeleteUser', request, 'deleteUser');
//   }

//   async forgotPassword(request: { email: string }) {
//     return this.makeRequest('ForgotPassword', request, 'forgotPassword');
//   }

//   async validateOTP(request: { email: string; otp: string }) {
//     return this.makeRequest('ValidateOTP', request, 'validateOTP');
//   }

//   async resetPassword(request: { email: string; new_password: string }) {
//     return this.makeRequest('ResetPassword', request, 'resetPassword');
//   }

//   close() {
//     this.client.close();
//   }
// }

// // Example usage:
// /*
// const grpcClient = new GRPCWrapper({
//   serverAddress: '127.0.0.1:50051',
//   timeout: 5000, // 5 seconds
//   keepAlive: true
// });

// try {
//   const user = await grpcClient.registerUser({
//     name: 'Test User',
//     email: 'test@example.com',
//     password: 'password123'
//   });
//   console.log('User registered:', user);
// } catch (error) {
//   console.error('Error:', error);
// } finally {
//   grpcClient.close();
// }
// */ 