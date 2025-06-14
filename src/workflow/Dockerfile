FROM oven/bun:1.2.11-alpine AS base

FROM base as deps

WORKDIR /app

# Copy package.json and package-lock.json

ARG SERVICE_NAME
COPY package.json ./
COPY ./src/${SERVICE_NAME}/package.json ./src/${SERVICE_NAME}/
COPY packages/common/package.json ./packages/common/
COPY packages/grpc_gateway/package.json ./packages/grpc_gateway/

# Install dependencies
RUN bun install --frozen-lockfile
WORKDIR /app/src/${SERVICE_NAME}

FROM base AS builder
ARG SERVICE_NAME
WORKDIR /app
COPY --from=deps /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY packages/ ./packages/
COPY ./src/${SERVICE_NAME} ./src/${SERVICE_NAME}
WORKDIR /app/src/${SERVICE_NAME}

RUN bun run build

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S bun_runner
RUN adduser -S nexura -u 1001 
ARG SERVICE_NAME
COPY --from=builder --chown=nexura:bun_runner /app/src/${SERVICE_NAME}/dist .
COPY --from=builder /app/src/${SERVICE_NAME}/src/db/ ./src/db/

ENV NODE_ENV=production
USER nexura
CMD ["tail","-f","/dev/null"]

# CMD ["bun", "index.js"]
