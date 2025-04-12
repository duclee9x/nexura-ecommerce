// Original file: protos/nexura.proto

import type { CartItem as _nexuraTelemetry_CartItem, CartItem__Output as _nexuraTelemetry_CartItem__Output } from '../nexuraTelemetry/CartItem';

export interface AddItemRequest {
  'userId'?: (string);
  'item'?: (_nexuraTelemetry_CartItem | null);
}

export interface AddItemRequest__Output {
  'userId': (string);
  'item': (_nexuraTelemetry_CartItem__Output | null);
}
