ARG ALPINE_VERSION=3.22
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build-base
RUN apk add --no-cache \
    bash \
    g++ \
    gcc \
    make \
    py3-setuptools \
    python3 \
    && python3 -m venv /opt/venv \
    && . /opt/venv/bin/activate \
    && pip install --no-cache --upgrade pip setuptools 
FROM build-base AS builder
WORKDIR /build-stage
COPY package*.json ./
RUN npm ci
# Copy the the files you need
COPY . ./
RUN npm run build

FROM build-base AS libraries
RUN npm install -g husky
WORKDIR /build-stage
COPY package*.json ./
RUN npm ci --omit=dev


FROM alpine:${ALPINE_VERSION}
ARG UID=10000
ARG GID=10000
ARG USER=node
ARG GROUP=node

# Create app directory
WORKDIR /usr/src/app
# Add required binaries
RUN apk add --no-cache libstdc++ dumb-init \
  && addgroup -S -g ${GID} ${USER} \
  && adduser -u ${UID} -G ${GROUP} -s /bin/sh -D ${USER} \
  && chown ${USER}:${GROUP} ./
COPY --from=builder /usr/local/bin/node /usr/local/bin/
COPY --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
ENV NODE_ENV=production
USER node
RUN mkdir -p /usr/src/app/logs /usr/src/app/data 
VOLUME [ "/usr/src/app/logs", "/usr/src/app/data" ]
ENV FASTIFY_HOST=0.0.0.0
ENV FASTIFY_PORT=3000
EXPOSE 3000
# Update the following COPY lines based on your codebase
COPY --from=libraries /build-stage/node_modules ./node_modules
COPY --from=builder /build-stage/dist ./
HEALTHCHECK --interval=10s --timeout=2s --start-period=15s CMD ["/usr/src/app/healthcheck.js"]
# Run with dumb-init to not start node with PID=1, since Node.js was not designed to run as PID 1
CMD ["dumb-init", "node", "./server.js"]
