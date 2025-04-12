// Original file: protos/nexura.proto

import type { ExtendedAddress as _nexuraTelemetry_ExtendedAddress, ExtendedAddress__Output as _nexuraTelemetry_ExtendedAddress__Output } from '../nexuraTelemetry/ExtendedAddress';

export interface GetAddressesResponse {
  'success'?: (boolean);
  'message'?: (string);
  'addresses'?: (_nexuraTelemetry_ExtendedAddress)[];
}

export interface GetAddressesResponse__Output {
  'success': (boolean);
  'message': (string);
  'addresses': (_nexuraTelemetry_ExtendedAddress__Output)[];
}
