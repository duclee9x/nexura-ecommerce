// Original file: protos/nexura.proto

import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';

export interface Product {
  'id'?: (string);
  'name'?: (string);
  'description'?: (string);
  'picture'?: (string);
  'priceUsd'?: (_nexuraTelemetry_Money | null);
  'categories'?: (string)[];
}

export interface Product__Output {
  'id': (string);
  'name': (string);
  'description': (string);
  'picture': (string);
  'priceUsd': (_nexuraTelemetry_Money__Output | null);
  'categories': (string)[];
}
