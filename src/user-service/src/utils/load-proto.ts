import path from 'path';
import { loadSync, ServiceDefinition } from '@grpc/proto-loader';
const USER_PROTO_PATH = path.resolve(__dirname, '../../proto/nexura.proto');
const HEALTH_PROTO_PATH = path.resolve(__dirname, '../../proto/health.proto');

const userProtoDefinition = loadSync(USER_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const healthProtoDefinition = loadSync(HEALTH_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});


const userPackageDefinition = userProtoDefinition['nexuraTelemetry.UserService'] as ServiceDefinition;
const healthPackageDefinition = healthProtoDefinition['grpc.health.v1.Health'] as ServiceDefinition;

export { userProtoDefinition, userPackageDefinition, healthPackageDefinition };