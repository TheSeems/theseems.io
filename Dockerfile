# Static build served by unprivileged nginx (port 8080). Deployed to the cluster by Flux.
FROM node:24.22.1-slim AS build
WORKDIR /src
RUN npm install -g pnpm@12.15.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG GIT_SHA=dev
# version.json lets CI confirm which commit theseems.io is serving
RUN pnpm build && printf '{"sha":"%s"}\n' "$GIT_SHA" > dist/version.json

FROM nginxinc/nginx-unprivileged:1.30.6-alpine
# Cache headers for Cloudflare and browsers
COPY nginx-site.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
# A broken config fails the build, not the rollout
RUN nginx -t
