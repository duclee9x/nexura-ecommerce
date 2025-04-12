// Original file: protos/nexura.proto

import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';

export interface Variant {
  'id'?: (string);
  'name'?: (string);
  'description'?: (string);
  'picture'?: (string);
  'priceUsd'?: (_nexuraTelemetry_Money | null);
}

export interface Variant__Output {
  'id': (string);
  'name': (string);
  'description': (string);
  'picture': (string);
  'priceUsd': (_nexuraTelemetry_Money__Output | null);
}
