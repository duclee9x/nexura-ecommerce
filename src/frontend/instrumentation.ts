import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";

export function register() {
  // Register the OpenTelemetry.
        ({
        serviceName: "frontend",
        traceExporter: new OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT_GRPC,
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    });
}