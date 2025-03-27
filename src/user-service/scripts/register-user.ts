import 'dotenv/config';
import { createUserServiceClient, registerUser } from '../src/client';
import logger from '../src/utils/logger';
import { initTracer } from '../src/utils/tracing';

// Initialize tracing
const tracer = initTracer('register-user');

/**
 * Test script to register a user via gRPC
 */
async function main() {
  try {
    tracer.startActiveSpan('register-user', async (span) => {
      // Get server address from env or use default
      const serverAddress = 'localhost:50051';
      
      // Create user service client
      const client = createUserServiceClient(serverAddress);
        
      // User data to register
      const userData = {
        name: process.env.TEST_USER_NAME || 'Test User',
        email: process.env.TEST_USER_EMAIL || 'test@example.com',
        password: process.env.TEST_USER_PASSWORD || 'password123',
      };
      
      logger.info('Starting user registration test', { serverAddress });
      
      // Register the user
      const result = await registerUser(client, userData);
      
      // Log the result
      logger.info('Registration successful', { result });
      console.log('User registered:', JSON.stringify(result, null, 2));
      
      // Close the client connection
      client.close();
      span.end();
    })
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error in registration test', { 
        error: error.message,
        stack: error.stack
      });
    } else {
      logger.error('Unknown error in registration test', { error });
    }
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
}); 