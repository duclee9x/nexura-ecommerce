import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import {  resourceFromAttributes } from '@opentelemetry/resources'
import { PrismaClientInstrumentation } from 'opentelemetry-instrumentation-prisma-client';

import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { logger } from './logger'

export function initTracing() {
  try {
    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
      }),
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'payment-service',
      }),
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-grpc': {
            enabled: true,
            ignoreGrpcMethods: [],
          },
          '@opentelemetry/instrumentation-http': {
            enabled: true,
          },
        }),
        new PrismaClientInstrumentation(),
      ],
    })

    sdk.start()
    logger.info('Tracing initialized')

    process.on('SIGTERM', () => {
      sdk
        .shutdown()
        .then(() => logger.info('Tracing terminated'))
        .catch((error) => logger.error('Error terminating tracing', error))
        .finally(() => process.exit(0))
    })

    return sdk
  } catch (error) {
    logger.error('Failed to initialize tracing:', error)
    throw error
  }
} 