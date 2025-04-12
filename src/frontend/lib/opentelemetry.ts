import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { envDetector, hostDetector, osDetector, processDetector, Resource } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { ConsoleSpanExporter, NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { Span, Tracer, SpanStatusCode, trace } from '@opentelemetry/api';
// const sdk = new NodeSDK({
//   resource: new Resource({
//     [ATTR_SERVICE_NAME]: 'user-microservice',
//   }),
//   traceExporter: new OTLPTraceExporter({
//     url: 'http://localhost:4318/v1/traces',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }),
//   // traceExporter: new ConsoleSpanExporter(),
//   // metricReader: new PeriodicExportingMetricReader({
//   //   exporter: new ConsoleMetricExporter(),
//   // }),
//   logRecordProcessors: [new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())],
//   instrumentations: [getNodeAutoInstrumentations(), new GrpcInstrumentation(), new PrismaInstrumentation(), new WinstonInstrumentation()],
//   resourceDetectors: [
//     envDetector,
//     hostDetector,
//     osDetector,
//     processDetector,
//   ],
// })

// sdk.start();

export const defaultTracer = (serviceName: string) => {
  // const exporter = new OTLPTraceExporter({
  //   url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // // const exporter = new ConsoleSpanExporter();

  // const provider = new NodeTracerProvider({
  //   resource: new Resource({
  //     [ATTR_SERVICE_NAME]: serviceName,
  //   }),
  //   spanProcessors: [new SimpleSpanProcessor(exporter)],
  // });
  // provider.register();

  // registerInstrumentations({
  //   instrumentations: [
  //     getNodeAutoInstrumentations(),
  //     new GrpcInstrumentation(),
  //     new PrismaInstrumentation(),
  //     new WinstonInstrumentation(),
  //   ],
  // });

  return trace.getTracer('frontend');
}


type TracingFunction<T> = (span: Span) => Promise<T>

export const withTracing = async <T>(
    tracer: Tracer,
    spanName: string,
    fn: TracingFunction<T>,
    parentSpan?: Span
): Promise<T> => {
    const span = tracer.startSpan(spanName)
    try {
        const result = await fn(span)
        return result
    } catch (error) {
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error instanceof Error ? error.message : 'Unknown error'
        })
        throw error
    } finally {
        span.end()
    }
}