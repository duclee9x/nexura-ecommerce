FROM node:22-alpine AS build

WORKDIR /app

COPY ./package*.json ./

RUN apk add python3 make g++ && yarn 

COPY . .
RUN yarn 

# -----------------------------------------------------------------------------

FROM node:22-alpine

USER node
WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node --from=build /app/node_modules/ ./node_modules/
COPY --chown=node:node --from=build /app/dist ./dist
COPY ./protos/nexura.proto ./

EXPOSE ${USER_SERVICE_PORT}
ENTRYPOINT [ "sh", "-c", "yarn prisma:migrate:deploy && yarn start" ]
