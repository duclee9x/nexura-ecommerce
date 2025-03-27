FROM node:22-alpine AS build

WORKDIR /usr/src/app/

COPY ./src/user-service/package*.json ./

RUN apk add --no-cache python3 make g++ && yarn install

COPY ./src/user-service/ ./
RUN yarn build

# -----------------------------------------------------------------------------

FROM node:22-alpine

USER node
WORKDIR /usr/src/app/
ENV NODE_ENV=production

COPY --chown=node:node --from=build /usr/src/app/node_modules/ ./node_modules/
COPY --chown=node:node --from=build /usr/src/app/dist/ ./dist/
COPY ./proto/nexura.proto ./

EXPOSE ${USER_SERVICE_PORT}
ENTRYPOINT [ "npm", "run", "start" ]
