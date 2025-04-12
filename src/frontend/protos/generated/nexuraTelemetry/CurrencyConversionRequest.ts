// Original file: protos/nexura.proto

import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';

export interface CurrencyConversionRequest {
  'from'?: (_nexuraTelemetry_Money | null);
  'toCode'?: (string);
}

export interface CurrencyConversionRequest__Output {
  'from': (_nexuraTelemetry_Money__Output | null);
  'toCode': (string);
}
