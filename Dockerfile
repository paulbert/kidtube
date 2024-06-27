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
RUN npm install