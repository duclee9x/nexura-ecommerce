import 'dotenv/config';
import logger from './utils/logger';
import { startServer } from './server';

async function gracefulShutdown(signal: string) {
    logger.info('Received SIGTERM signal. Shutting down gracefully...');
    server.forceShutdown();
    process.kill(process.pid, signal);
}
// Start the server
const port = process.env.GRPC_PORT || '50051';

const server = startServer(port);

// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.once('SIGINT', () => gracefulShutdown('SIGINT'));


