import { loadSync, ServiceDefinition } from '@grpc/proto-loader';

const userProtoDefinition = loadSync("./lib/nexura.proto", {
  keepCase: true,
  longs:    String,
  enums:    String,
  defaults: true,
  oneofs:   true,
});

const healthProtoDefinition = loadSync("./lib/health.proto", {
  keepCase: true,
  longs:    String,
  enums:    String,
  defaults: true,
  oneofs:   true,   
});

const userPackageDefinition = userProtoDefinition['nexuraTelemetry.UserService'] as ServiceDefinition;
const healthPackageDefinition = healthProtoDefinition['grpc.health.v1.Health'] as ServiceDefinition;

export { userProtoDefinition, userPackageDefinition, healthPackageDefinition };