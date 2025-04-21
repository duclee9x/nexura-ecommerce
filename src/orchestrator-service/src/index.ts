import { startServer, gracefulShutdown } from '@nexura/common/utils';
import { orchestratorService } from './services/orchestrator';
import { OrchestratorServiceService } from '@nexura/common/protos';

// Start the server
const port = process.env.GRPC_PORT || '50056';

const services = [
    {
        service: OrchestratorServiceService,
        serviceHandler: orchestratorService
    }
]

const server = startServer(services, port, "ORCHESTRATOR_SERVICE");

// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.once('SIGINT', () => gracefulShutdown('SIGINT', server));


