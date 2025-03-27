FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat protobuf-dev protoc

COPY ./src/user-service/package*.json ./

COPY ./src/user-service/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./proto ./

