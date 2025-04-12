// Original file: protos/nexura.proto

import type { Address as _nexuraTelemetry_Address, Address__Output as _nexuraTelemetry_Address__Output } from '../nexuraTelemetry/Address';
import type { CartItem as _nexuraTelemetry_CartItem, CartItem__Output as _nexuraTelemetry_CartItem__Output } from '../nexuraTelemetry/CartItem';

export interface GetQuoteRequest {
  'address'?: (_nexuraTelemetry_Address | null);
  'items'?: (_nexuraTelemetry_CartItem)[];
}

export interface GetQuoteRequest__Output {
  'address': (_nexuraTelemetry_Address__Output | null);
  'items': (_nexuraTelemetry_CartItem__Output)[];
}
