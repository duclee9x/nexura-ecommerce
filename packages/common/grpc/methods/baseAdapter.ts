import { credentials } from '@grpc/grpc-js';

export const defaultGrpcOptions = {
    'grpc.keepalive_time_ms': 120000,
    'grpc.http2.min_time_between_pings_ms': 120000,
    'grpc.keepalive_timeout_ms': 20000,
    'grpc.http2.max_pings_without_data': 0,
    'grpc.keepalive_permit_without_calls': 1,
} as const;

export type ServiceConfig = {
    name: string;
    endpoint: string;
    options: typeof defaultGrpcOptions;
};

export const createServiceConfig = (
    name: string,
    defaultPort: number,
    customOptions: Partial<typeof defaultGrpcOptions> = {}
): ServiceConfig => {
    const envVarName = `${name.toUpperCase()}_SERVICE_URL`;
    const envVarOptions = `${name.toUpperCase()}_SERVICE_OPTIONS`;
    return {
        name,
        endpoint: process.env[envVarName] || `localhost:${defaultPort}`,
        options: {
            ...defaultGrpcOptions,
            ...(process.env[envVarOptions] 
                ? JSON.parse(process.env[envVarOptions] as string) 
                : {}),
            ...customOptions
        }
    };
};

export const promisifyGrpcCall = <T>(client: any, method: string, request: any): Promise<T> => {
    return new Promise((resolve, reject) => {
        client[method](request, (error: Error | null, response: T) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

export const createClient = (ClientClass: any, config: ServiceConfig) => {
    return new ClientClass(
        config.endpoint,
        credentials.createInsecure(),
        config.options
    );
};