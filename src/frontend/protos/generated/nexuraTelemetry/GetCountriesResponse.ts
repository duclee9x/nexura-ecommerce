// Original file: protos/nexura.proto

import type { Country as _nexuraTelemetry_Country, Country__Output as _nexuraTelemetry_Country__Output } from '../nexuraTelemetry/Country';

export interface GetCountriesResponse {
  'success'?: (boolean);
  'message'?: (string);
  'countries'?: (_nexuraTelemetry_Country)[];
}

export interface GetCountriesResponse__Output {
  'success': (boolean);
  'message': (string);
  'countries': (_nexuraTelemetry_Country__Output)[];
}
