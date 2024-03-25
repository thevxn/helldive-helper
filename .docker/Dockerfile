#
# hdlt-fe Dockerfile
# stage 1 --- build static files
#

FROM node:18.15.0-bullseye-slim@sha256:575f8d9e973760ffa0f13791959f4cda1c7d4ff00a07cc1766931ddbfe21e010 AS build

ARG BASE_URL
ENV BASE_URL=${BASE_URL}

WORKDIR /opt/hdlt-fe
COPY . /opt/hdlt-fe

# creates static files in dist/ folder
RUN npm ci
RUN npm run build

#
# stage 2 --- nginx container
#

FROM nginx:1.23.2-alpine@sha256:0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f

ARG BASE_URL
ENV BASE_URL=${BASE_URL}

COPY --from=build /opt/hdlt-fe/dist /var/www/html
COPY .docker/nginx-default.conf /etc/nginx/conf.d/default.conf

ARG DOCKER_INTERNAL_PORT
ENV DOCKER_INTERNAL_PORT ${DOCKER_INTERNAL_PORT}

EXPOSE ${DOCKER_INTERNAL_PORT}
