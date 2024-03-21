#
# kpu-fe Dockerfile
# stage 1 --- build static files
#

FROM node:18.15.0-bullseye-slim@sha256:575f8d9e973760ffa0f13791959f4cda1c7d4ff00a07cc1766931ddbfe21e010 AS base

ARG VITE_VAPID_KEY
ENV VITE_VAPID_KEY=${VITE_VAPID_KEY}

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /opt/kpu-fe
COPY . /opt/kpu-fe

# creates static files in dist/ folder

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build


#
# stage 2 --- nginx container
#

FROM nginx:1.23.2-alpine@sha256:0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f

COPY --from=build /opt/kpu-fe/dist /var/www/html
COPY .docker/nginx-default.conf /etc/nginx/conf.d/default.conf

ARG DOCKER_INTERNAL_PORT
ENV DOCKER_INTERNAL_PORT ${DOCKER_INTERNAL_PORT}

EXPOSE ${DOCKER_INTERNAL_PORT}
