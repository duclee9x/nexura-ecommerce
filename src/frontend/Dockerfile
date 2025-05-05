FROM oven/bun:1.2.11-alpine AS builder

WORKDIR /app

COPY package.json bun.lockb ./
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/common/package.json ./packages/common/
COPY packages/grpc_gateway/package.json ./packages/grpc_gateway/

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "run","build"]

FROM oven/bun:1.2.11-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist

CMD ["bun", "run", "dist/index.js"]
