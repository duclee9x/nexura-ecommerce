import type { ServerUnaryCall, ServerWritableStream, sendUnaryData } from '@grpc/grpc-js';
import { HealthCheckRequest, HealthCheckResponse, type HealthServiceServer } from '@nexura/grpc_gateway/protos';

export const HealthStatus = {
    SERVING: 1,
    NOT_SERVING: 2,
    SERVICE_UNKNOWN: 3,
} as const;

export type HealthStatusType = typeof HealthStatus[keyof typeof HealthStatus];

export class HealthServiceImpl implements HealthServiceServer {
    private status: HealthStatusType = HealthStatus.SERVING;
    [key: string]: any; // Required by HealthServiceServer interface

    setStatus(status: HealthStatusType): void {
        this.status = status;
    }

    check(
        call: ServerUnaryCall<HealthCheckRequest, HealthCheckResponse>,
        callback: sendUnaryData<HealthCheckResponse>
    ): void {
        const service = call.request.service;

        if (!service) {
            // If no service is specified, return overall health
            callback(null, { status: this.status });
            return;
        }

        try {
            // Check if the requested service is known
            if (service.toUpperCase() === 'CART_SERVICE') {
                callback(null, { status: this.status });
            } else {
                callback(null, { status: HealthStatus.SERVICE_UNKNOWN });
            }
        } catch (error) {
            callback(null, { status: HealthStatus.SERVICE_UNKNOWN });
        }
    }

    watch(
        call: ServerWritableStream<HealthCheckRequest, HealthCheckResponse>
    ): void {
        const checkHealth = () => {
            try {
                const interval = setInterval(() => {
                    if (call.destroyed) {
                        clearInterval(interval);
                        return;
                    }

                    this.check(
                        call as ServerUnaryCall<HealthCheckRequest, HealthCheckResponse>,
                        (error, response) => {
                            if (error || !response || call.destroyed) {
                                clearInterval(interval);
                                call.destroy();
                                return;
                            }
                            call.write(response);
                        }
                    );
                }, 1000); // Check every second

                // Clean up interval when stream ends
                call.on('end', () => clearInterval(interval));
                call.on('error', () => clearInterval(interval));
            } catch (error) {
                call.destroy();
            }
        };

        checkHealth();
    }
} 