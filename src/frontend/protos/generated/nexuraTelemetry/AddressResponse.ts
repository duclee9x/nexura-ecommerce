// Original file: protos/nexura.proto

import type { Address as _nexuraTelemetry_Address, Address__Output as _nexuraTelemetry_Address__Output } from '../nexuraTelemetry/Address';

export interface AddressResponse {
  'success'?: (boolean);
  'message'?: (string);
  'address'?: (_nexuraTelemetry_Address | null);
}

export interface AddressResponse__Output {
  'success': (boolean);
  'message': (string);
  'address': (_nexuraTelemetry_Address__Output | null);
}
