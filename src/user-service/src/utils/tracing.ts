// import { ConsoleSpanExporter, NodeTracerProvider, SimpleSpanProcessor, SpanExporter } from '@opentelemetry/sdk-trace-node';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
// import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// import { Span, SpanStatusCode, trace, Tracer } from "@opentelemetry/api"
// import { Resource } from '@opentelemetry/resources';
// import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
// import { LoggerProvider, SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
// import {logs} from '@opentelemetry/api-logs';
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// // Export initialization function for tracing1
// export function initTracer(serviceName: string) {
//     const exporter = new OTLPTraceExporter({
//         url: 'http://172.19.0.5:4318/v1/traces',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     // const exporter = new ConsoleSpanExporter();
//     const resource = new Resource({
//         'service.name': serviceName,
//         'service.version': '1.0.0',
//     });
    
//     const tracerProvider = new NodeTracerProvider({
//         spanProcessors: [new SimpleSpanProcessor(exporter)],
//         resource: resource
//     });

//     const loggerProvider = new LoggerProvider();
//     loggerProvider.addLogRecordProcessor(
//         new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
//     );
//     logs.setGlobalLoggerProvider(loggerProvider);
    

//     registerInstrumentations({
//         tracerProvider: tracerProvider,
//         instrumentations: [
//             getNodeAutoInstrumentations(),
//             new WinstonInstrumentation(),
//             new GrpcInstrumentation(),
//         ],
//     }); 
//     // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
//     tracerProvider.register();
// }

