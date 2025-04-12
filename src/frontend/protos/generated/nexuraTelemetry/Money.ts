// Original file: protos/nexura.proto

import type { Long } from '@grpc/proto-loader';

export interface Money {
  'currencyCode'?: (string);
  'units'?: (number | string | Long);
  'nanos'?: (number);
}

export interface Money__Output {
  'currencyCode': (string);
  'units': (string);
  'nanos': (number);
}
