#!/bin/sh

# At runtime, regenerate Prisma Client with the actual DATABASE_URL
if [ -n "$DATABASE_URL" ]; then
  bun dist/index.js
else
  echo "Warning: DATABASE_URL not set; skipping Prisma Client generation"
  echo "Stopping container"
  exit 1
fi

