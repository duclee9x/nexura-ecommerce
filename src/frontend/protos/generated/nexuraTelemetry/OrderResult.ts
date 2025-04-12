// Original file: protos/nexura.proto

import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';
import type { Address as _nexuraTelemetry_Address, Address__Output as _nexuraTelemetry_Address__Output } from '../nexuraTelemetry/Address';
import type { OrderItem as _nexuraTelemetry_OrderItem, OrderItem__Output as _nexuraTelemetry_OrderItem__Output } from '../nexuraTelemetry/OrderItem';

export interface OrderResult {
  'orderId'?: (string);
  'shippingTrackingId'?: (string);
  'shippingCost'?: (_nexuraTelemetry_Money | null);
  'shippingAddress'?: (_nexuraTelemetry_Address | null);
  'items'?: (_nexuraTelemetry_OrderItem)[];
}

export interface OrderResult__Output {
  'orderId': (string);
  'shippingTrackingId': (string);
  'shippingCost': (_nexuraTelemetry_Money__Output | null);
  'shippingAddress': (_nexuraTelemetry_Address__Output | null);
  'items': (_nexuraTelemetry_OrderItem__Output)[];
}
