import { startServer,gracefulShutdown  } from "@nexura/grpc_gateway/server";
import { productService } from './services/product.service';
import type { ServiceDefinition } from '@nexura/grpc_gateway/server';
import { ProductCatalogServiceService } from '@nexura/grpc_gateway/protos';
// Start the server
const port = process.env.PRODUCT_SERVICE_PORT || '50053';

const services: ServiceDefinition[] = [
    {
        service: ProductCatalogServiceService,
        serviceHandler: productService
    },
];

const server = startServer(services, port, "PRODUCT_CATALOG_SERVICE");


// Handle graceful shutdown
process.once('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.once('SIGINT', () => gracefulShutdown('SIGINT', server));


