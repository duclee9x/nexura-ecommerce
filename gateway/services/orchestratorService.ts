import { Order, OrchestratorServiceClient, CreateSagaOrderRequest } from '@nexura/grpc_gateway/protos';
import { DefaultResponse } from '@/lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const orchestratorConfig = createServiceConfig('OrchestratorService', 50056);
const orchestratorClient = createClient(OrchestratorServiceClient, orchestratorConfig);

export const orchestratorService = {
    createSagaOrder: async (request: CreateSagaOrderRequest): Promise<DefaultResponse & { orderId: string; status: number }> => {
        return promisifyGrpcCall(orchestratorClient, 'createSagaOrder', request);
    },
    
}; 