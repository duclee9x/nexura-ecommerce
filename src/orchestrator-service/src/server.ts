import { Server, ServerCredentials } from '@grpc/grpc-js';
import { PrismaClient } from '@prisma/client';
import { OrderServiceService } from './proto/order_grpc_pb';
import { OrderServiceImpl } from './services/order_service';

const prisma = new PrismaClient();
const server = new Server();

const orderService = new OrderServiceImpl(prisma);
server.addService(OrderServiceService, orderService);

const port = process.env.PORT || '50053';
const address = `0.0.0.0:${port}`;

server.bindAsync(
  address,
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`Failed to bind server: ${err}`);
      process.exit(1);
    }
    console.log(`Server running at ${address}`);
    server.start();
  }
);

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.forceShutdown();
  process.exit(0);
}); 