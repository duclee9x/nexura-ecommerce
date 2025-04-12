// Original file: protos/nexura.proto

import type { ExtendedAddress as _nexuraTelemetry_ExtendedAddress, ExtendedAddress__Output as _nexuraTelemetry_ExtendedAddress__Output } from '../nexuraTelemetry/ExtendedAddress';

export interface UpdateAddressRequest {
  'userId'?: (string);
  'address'?: (_nexuraTelemetry_ExtendedAddress | null);
}

export interface UpdateAddressRequest__Output {
  'userId': (string);
  'address': (_nexuraTelemetry_ExtendedAddress__Output | null);
}
