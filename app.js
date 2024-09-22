'use strict'
import { randomBytes } from 'node:crypto'
import { totalmem } from 'node:os'

import 'dotenv/config'
import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import etag from '@fastify/etag'
import secureSession from '@fastify/secure-session'
import csrfProtection from '@fastify/csrf-protection'
import underPressure from '@fastify/under-pressure'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default function builder (opts) {
  const totalMemory = totalmem()
  const ninetyFivePercentMemory = totalMemory * 0.95

  const app = Fastify(opts)
  app.register(helmet)
  app.register(etag)
  app.register(secureSession, {
    secret: process.env.FASTIFY_SESSION_SECRET ?? randomBytes(64)
  })
  app.register(csrfProtection, { sessionPlugin: '@fastify/secure-session' })
  app.register(underPressure, {
    maxEventLoopDelay: process.env.FASTIFY_UNDER_PRESSURE_MAX_LOOP_DELAY ?? 1000,
    maxHeapUsedBytes: process.env.FASTIFY_UNDER_PRESSURE_MAX_HEAP_USED_BYTES ?? ninetyFivePercentMemory,
    maxRssBytes: process.env.FASTIFY_UNDER_PRESSURE_MAX_RSS_BYTES ?? ninetyFivePercentMemory,
    maxEventLoopUtilization: process.env.FASTIFY_UNDER_PRESSURE_MAX_LOOP_UTIL ?? 0.98,
    exposeStatusRoute: true
  })
  app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Fastify Starter template',
        description: 'A starter template for a fastify service',
        version: '0.1.0'
      },
      servers: [],
      tags: [],
      components: {},
      externalDocs: {
        url: 'https://github.com/bryopsida/fastify-starter-template#README',
        description: 'Find more info here'
      }
    }
  })
  app.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

  if (!process.env.FASTIFY_SESSION_SECRET) {
    app.log.warn('No FASTIFY_SESSION_SECRET environment variable set, using random secret')
  }
  return app
}
