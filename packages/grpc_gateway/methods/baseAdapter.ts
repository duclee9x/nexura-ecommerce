import { credentials, Client, ChannelCredentials } from '@grpc/grpc-js';

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

// Type for gRPC client methods
type GrpcClientMethod<TRequest, TResponse> = (
    request: TRequest,
    callback: GrpcMethodCallback<TResponse>
) => void;

// Type for gRPC client with dynamic methods
type GrpcClientWithMethods<T extends Client> = T & {
    [K in keyof T]: T[K] extends GrpcClientMethod<infer TRequest, infer TResponse> 
        ? GrpcClientMethod<TRequest, TResponse> 
        : T[K];
};

export const promisifyGrpcCall = <TResponse, TClient extends Client>(
    client: GrpcClientWithMethods<TClient>,
    method: keyof TClient,
    request: unknown
): Promise<TResponse> => {
    return new Promise((resolve, reject) => {
        const callback: GrpcMethodCallback<TResponse> = (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        };

        const clientMethod = client[method];
        if (!clientMethod || typeof clientMethod !== 'function') {
            reject(new Error(`Method ${String(method)} not found on client`));
            return;
        }

        try {
            // Bind the method to the client to ensure proper 'this' context
            const boundMethod = clientMethod.bind(client);
            boundMethod(request, callback);
        } catch (error) {
            reject(error);
        }
    });
};

export const createClient = <T extends Client>(
    ClientClass: new (address: string, credentials: ChannelCredentials, options: typeof defaultGrpcOptions) => T,
    config: ServiceConfig
): GrpcClientWithMethods<T> => {
    return new ClientClass(
        config.endpoint,
        credentials.createInsecure(),
        config.options
    ) as GrpcClientWithMethods<T>;
};