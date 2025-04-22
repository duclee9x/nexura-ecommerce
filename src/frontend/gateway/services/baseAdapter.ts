import { credentials, Client, ClientUnaryCall, Metadata, ChannelCredentials } from '@grpc/grpc-js';

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

type GrpcMethodCallback<T> = (error: Error | null, response: T) => void;

export const promisifyGrpcCall = <T>(
    client: Client,
    method: string,
    request: unknown
): Promise<T> => {
    return new Promise((resolve, reject) => {
        const callback: GrpcMethodCallback<T> = (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        };
        (client[method as keyof Client] as Function)(request, callback);
    });
};

export const createClient = <T extends Client>(
    ClientClass: new (address: string, credentials: ChannelCredentials, options: typeof defaultGrpcOptions) => T,
    config: ServiceConfig
): T => {
    return new ClientClass(
        config.endpoint,
        credentials.createInsecure(),
        config.options
    );
};