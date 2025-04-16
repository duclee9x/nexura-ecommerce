import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// const exporter = new PrometheusExporter({ port: 9464 }, () => {
//   console.log('✅ Prometheus scrape endpoint: http://localhost:9464/metrics');
// });

const sdk = new NodeSDK({
//   metricReader: exporter,

  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();