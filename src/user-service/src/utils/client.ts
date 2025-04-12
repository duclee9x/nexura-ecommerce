import 'dotenv/config';
import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import path from 'path';
import { loadSync } from '@grpc/proto-loader';


function createGRPCClient(serverAddress: string, serviceName: string) {
	const PROTO_PATH = path.resolve(__dirname, '../proto/nexura.proto');

	const packageDefinition = loadSync(PROTO_PATH, {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});

	const protoDescriptor = loadPackageDefinition(packageDefinition);
	const service = (protoDescriptor.nexuraTelemetry as any)[serviceName];

	const client = new service(
		serverAddress,
		credentials.createInsecure()
	);
	return client;
}

export const createEmailServiceClient = () => {
	return createGRPCClient(process.env.EMAIL_SERVICE_ADDRESS || "localhost:50052", 'EmailService');
};


// Export functions for use in other files
export { createGRPCClient }; 