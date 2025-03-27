import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

const PROTO_DIR = path.resolve(__dirname, '../proto');
const OUTPUT_DIR = path.resolve(__dirname, '../src/generated');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate TypeScript types from proto files
const protoFiles = [
  path.join(PROTO_DIR, 'user.proto'),
  path.join(PROTO_DIR, 'health/v1/health.proto'),
];

protoFiles.forEach(protoFile => {
  console.log(`Generating types for ${protoFile}...`);
  execSync(`protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --ts_out=${OUTPUT_DIR} --proto_path=${PROTO_DIR} ${protoFile}`, {
    stdio: 'inherit',
  });
});

console.log('Proto type generation completed!'); 