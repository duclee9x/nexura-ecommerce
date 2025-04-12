// Original file: protos/nexura.proto

import type { Address as _nexuraTelemetry_Address, Address__Output as _nexuraTelemetry_Address__Output } from '../nexuraTelemetry/Address';
import type { CreditCardInfo as _nexuraTelemetry_CreditCardInfo, CreditCardInfo__Output as _nexuraTelemetry_CreditCardInfo__Output } from '../nexuraTelemetry/CreditCardInfo';

export interface PlaceOrderRequest {
  'userId'?: (string);
  'userCurrency'?: (string);
  'address'?: (_nexuraTelemetry_Address | null);
  'email'?: (string);
  'creditCard'?: (_nexuraTelemetry_CreditCardInfo | null);
}

export interface PlaceOrderRequest__Output {
  'userId': (string);
  'userCurrency': (string);
  'address': (_nexuraTelemetry_Address__Output | null);
  'email': (string);
  'creditCard': (_nexuraTelemetry_CreditCardInfo__Output | null);
}
