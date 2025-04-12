// Original file: protos/nexura.proto

import type { CartItem as _nexuraTelemetry_CartItem, CartItem__Output as _nexuraTelemetry_CartItem__Output } from '../nexuraTelemetry/CartItem';
import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';

export interface OrderItem {
  'item'?: (_nexuraTelemetry_CartItem | null);
  'cost'?: (_nexuraTelemetry_Money | null);
}

export interface OrderItem__Output {
  'item': (_nexuraTelemetry_CartItem__Output | null);
  'cost': (_nexuraTelemetry_Money__Output | null);
}
