// Original file: protos/nexura.proto

import type { CartItem as _nexuraTelemetry_CartItem, CartItem__Output as _nexuraTelemetry_CartItem__Output } from '../nexuraTelemetry/CartItem';

export interface Cart {
  'userId'?: (string);
  'items'?: (_nexuraTelemetry_CartItem)[];
}

export interface Cart__Output {
  'userId': (string);
  'items': (_nexuraTelemetry_CartItem__Output)[];
}
