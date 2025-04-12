// Original file: protos/nexura.proto

import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';
import type { CreditCardInfo as _nexuraTelemetry_CreditCardInfo, CreditCardInfo__Output as _nexuraTelemetry_CreditCardInfo__Output } from '../nexuraTelemetry/CreditCardInfo';

export interface ChargeRequest {
  'amount'?: (_nexuraTelemetry_Money | null);
  'creditCard'?: (_nexuraTelemetry_CreditCardInfo | null);
}

export interface ChargeRequest__Output {
  'amount': (_nexuraTelemetry_Money__Output | null);
  'creditCard': (_nexuraTelemetry_CreditCardInfo__Output | null);
}
