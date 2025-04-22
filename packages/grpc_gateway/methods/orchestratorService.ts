import { OrchestratorServiceClient, CreateSagaOrderRequest, CreateSagaOrderResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const orchestratorConfig = createServiceConfig('OrchestratorService', 50056);
const orchestratorClient = createClient(OrchestratorServiceClient, orchestratorConfig);

export const orchestratorService = {
    createSagaOrder: async (request: CreateSagaOrderRequest): Promise<CreateSagaOrderResponse> => {
        return promisifyGrpcCall(orchestratorClient, 'createSagaOrder', request);
    },
    
}; 