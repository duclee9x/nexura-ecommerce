FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat protobuf-dev protoc

COPY ./package*.json ./

COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./proto ./

