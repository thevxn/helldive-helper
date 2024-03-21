FROM cypress/included:cypress-12.7.0-node-18.14.1-chrome-110.0.5481.96-1-ff-109.0-edge-110.0.1587.41-1

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN mkdir /e2e

WORKDIR /e2e

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . ./

ENTRYPOINT ["cypress", "run"]