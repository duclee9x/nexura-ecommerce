import { credentials, Client, ChannelCredentials, Metadata } from '@grpc/grpc-js';

export const defaultGrpcOptions = {
  'grpc.keepalive_time_ms':               120000,
  'grpc.http2.min_time_between_pings_ms': 120000,
  'grpc.keepalive_timeout_ms':            20000,
  'grpc.http2.max_pings_without_data':    0,
  'grpc.keepalive_permit_without_calls':  1,
} as const;

export type ServiceConfig = {
  name:          string;
  endpoint:      string;
  options:       typeof defaultGrpcOptions;
  daprEndpoint?: string;
};

export const createServiceConfig = (
  name: string,
  defaultPort: string,
  daprPort?: number,
  customOptions: Partial<typeof defaultGrpcOptions> = {},
): ServiceConfig => {
  const envVarName = `${name.toUpperCase()}_URL`;
  const envVarOptions = `${name.toUpperCase()}_OPTIONS`;
  return {
    name,
    endpoint:     process.env[envVarName] || `localhost:${defaultPort}`,
    daprEndpoint: daprPort ? `http://localhost:${daprPort}` : undefined,
    options:      {
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
  metadata: Metadata,
  callback: GrpcMethodCallback<TResponse>
) => void;

// Type for gRPC client with dynamic methods
type GrpcClientWithMethods<T extends Client> = T & {
  [K in keyof T]: T[K] extends GrpcClientMethod<infer TRequest, infer TResponse> 
    ? GrpcClientMethod<TRequest, TResponse> 
    : T[K];
} & {
  __config: ServiceConfig;
};

export const createDaprMetadata = (appId: string): Metadata => {
  const metadata = new Metadata();
  const daprName = appId.toLowerCase().replace("service","");
  metadata.add('dapr-app-id', daprName)
  return metadata;
};

export const promisifyGrpcCall = <TResponse, TClient extends Client>(
  client: GrpcClientWithMethods<TClient>,
  method: keyof TClient,
  request: unknown,
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
      const boundMethod = clientMethod.bind(client);
      const serviceMetadata = createDaprMetadata(client.__config.name)
      console.log(`request service address: ${JSON.stringify(serviceMetadata)} `)
      console.log(`request ${JSON.stringify(request)}`)
      console.log(`request ${JSON.stringify(client)}`)
      boundMethod(request, serviceMetadata, callback);
    } catch (error) {
      reject(error);
    }
  });
};

export const createClient = <T extends Client>(
  ClientClass: new (address: string, credentials: ChannelCredentials, options: typeof defaultGrpcOptions) => T,
  config: ServiceConfig
): GrpcClientWithMethods<T> => {
  const client = new ClientClass(
    config.endpoint,
    credentials.createInsecure(),
    config.options
  ) as GrpcClientWithMethods<T>;

  // Store config information in the client instance
  client.__config = config;

  return client;
};