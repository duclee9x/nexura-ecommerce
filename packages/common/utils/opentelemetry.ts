import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { Resource } from "@opentelemetry/resources";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
} from "@opentelemetry/sdk-trace-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { GrpcInstrumentation } from "@opentelemetry/instrumentation-grpc";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { WinstonInstrumentation } from "@opentelemetry/instrumentation-winston";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import type { Span, Tracer } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";

// export const defaultTracer = (serviceName: string) => {
//   const exporter = new OTLPTraceExporter({
//     url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   // const exporter = new ConsoleSpanExporter();

//   const provider = new NodeTracerProvider({
//     resource: new Resource({
//       [ATTR_SERVICE_NAME]: serviceName,
//     }),
//   });
//   provider.register();

//   registerInstrumentations({
//     instrumentations: [
//       getNodeAutoInstrumentations(),
//       new GrpcInstrumentation(),
//       new PrismaInstrumentation(),
//       new WinstonInstrumentation(),
//     ],
//   });

//   return trace.getTracer('user-microservice');
// }

export const tracerInstrumentation = (serviceName: string) => {
  const exporter = new OTLPTraceExporter({
    url:     process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
    headers: {
      'Content-Type': 'application/json',
    },
  });
    // const exporter = new ConsoleSpanExporter();

  const sdk = new NodeSDK({
    resource: new Resource({
      [ATTR_SERVICE_NAME]: serviceName,
    }),
    traceExporter:    exporter,
    instrumentations: [
      getNodeAutoInstrumentations(),
      new GrpcInstrumentation(),
      new PrismaInstrumentation(),
      new WinstonInstrumentation(),
    ],
  });
  sdk.start();
}

type TracingFunction<T> = (span: Span) => Promise<T>;

export const withTracing = async <T>(
  tracer: Tracer,
  spanName: string,
  fn: TracingFunction<T>,
  parentSpan?: Span
): Promise<T> => {
  const span = tracer.startSpan(spanName);
  try {
    const result = await fn(span);
    return result;
  } catch (error) {
    span.setStatus({
      code:    SpanStatusCode.ERROR,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  } finally {
    span.end();
  }
};

export type { Span, Tracer } from "@opentelemetry/api";
export { SpanStatusCode, trace } from "@opentelemetry/api";
export { api } from "@opentelemetry/sdk-node";
