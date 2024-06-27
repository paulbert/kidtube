FROM node:22-alpine as builder
RUN apk add g++ make py3-pip
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npx nx reset
RUN npm run build

FROM node:22-alpine as runner

COPY --from=builder /usr/src/app/dist/apps /app
WORKDIR /app/server
COPY --from=builder /usr/src/app/libs/db-migrations/prisma/schema.prisma .
RUN npm ci \
  && npx prisma generate \
  # Prune non-used files
  && npm prune --production \
  # Clean Prisma non-used files https://github.com/prisma/prisma/issues/11577
  && rm -rf node_modules/.cache/ \
  && rm -rf node_modules/@prisma/engines/ \
  && rm -rf node_modules/@prisma/engines-version \
  && rm -rf node_modules/prisma \
  # Remove cache
  && rm -rf /root/.cache/ \
  && rm -rf /root/.npm/