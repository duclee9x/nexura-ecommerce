import logger from './utils/logger';
import { initTracer } from './utils/tracing';
import defaultTracer from './utils/opentelemetry';
// Initialize tracing;
// initTracer('client');
const tracer = defaultTracer('Client');
import 'dotenv/config';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { SpanStatusCode, trace, Tracer } from '@opentelemetry/api';
import api from '@opentelemetry/api';

/**
 * Create a gRPC client for the user service
 */
function createUserServiceClient(serverAddress: string) {
	// Load proto definition
	const PROTO_PATH = path.resolve(__dirname, '../proto/nexura.proto');

	const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});

	const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
	const userService = (protoDescriptor.nexuraTelemetry as any).UserService;

	// Create client
	const client = new userService(
		serverAddress,
		grpc.credentials.createInsecure(),
		{
			'grpc.keepalive_time_ms': 120000,
			'grpc.http2.min_time_between_pings_ms': 120000,
			'grpc.keepalive_timeout_ms': 20000,
			'grpc.http2.max_pings_without_data': 0,
			'grpc.keepalive_permit_without_calls': 1,
		}
	);

	return client;
}

/**
 * Register a user via gRPC
 */

async function registerUser(client: any, userData: { name: string; email: string; password: string }) {
	return new Promise((resolve, reject) => {
		const span = tracer.startSpan('registerUserFromClient');
		api.context.with(api.trace.setSpan(api.context.active(), span), () => {
			logger.info('Registering user', { traceId: span.spanContext().traceId });
			span.setAttribute('client.request.name', userData.name);
			span.setAttribute('client.request.email', userData.email);
			client.RegisterUser(userData, (error: Error | null, response: any) => {
				if (error) {
					logger.error('Error registering user', { error: error.message });
					span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
					span.end();
					reject(error);
					return;
				}
				logger.info('User registered successfully', { userId: response.id });
				span.setStatus({ code: SpanStatusCode.OK, message: 'User registered successfully' });
				span.setAttribute('response.id', response.id);
				span.end();
				resolve(response);
			});
		});
	});
}

/**
 * Main function to run the client
 */
async function main() {
	try {
		// Connection address - should match server address
		const serverAddress = '127.0.0.1:50051';
		// Create client
		const client = createUserServiceClient(serverAddress);
		// User data for registration
		const userData = {
			name: 'Tesfgsgergst User',
			email: 'tgesgdrtg4fst@exsample.com',
			password: 'pgfagssword123'
		};
		// Register user
		const user = await registerUser(client, userData);
		console.log('User registered:', user);

		// Close the client connection
		client.close();
	} catch (error) {
		logger.error('Client error', { error });
		process.exit(1);
	}
}

// Run the client if this file is executed directly
main();

// Export functions for use in other files
export { createUserServiceClient, registerUser }; 