// Original file: protos/nexura.proto

import type { OrderResult as _nexuraTelemetry_OrderResult, OrderResult__Output as _nexuraTelemetry_OrderResult__Output } from '../nexuraTelemetry/OrderResult';

export interface SendOrderConfirmationRequest {
  'email'?: (string);
  'order'?: (_nexuraTelemetry_OrderResult | null);
}

export interface SendOrderConfirmationRequest__Output {
  'email': (string);
  'order': (_nexuraTelemetry_OrderResult__Output | null);
}
