'use strict'
import { randomBytes } from 'node:crypto'

import 'dotenv/config'
import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import etag from '@fastify/etag'
import secureSession from '@fastify/secure-session'
import csrfProtection from '@fastify/csrf-protection'
import underPressure from '@fastify/under-pressure'

export default function builder (opts) {
  const app = Fastify(opts)
  app.register(helmet)
  app.register(etag)
  app.register(secureSession, {
    secret: process.env.FASTIFY_SESSION_SECRET ?? randomBytes(64)
  })
  app.register(csrfProtection, { sessionPlugin: '@fastify/secure-session' })
  app.register(underPressure, {
    maxEventLoopDelay: process.env.FASTIFY_UNDER_PRESSURE_MAX_LOOP_DELAY ?? 1000,
    maxHeapUsedBytes: process.env.FASTIFY_UNDER_PRESSURE_MAX_HEAP_USED_BYTES ?? 100000000,
    maxRssBytes: process.env.FASTIFY_UNDER_PRESSURE_MAX_RSS_BYTES ?? 100000000,
    maxEventLoopUtilization: process.env.FASTIFY_UNDER_PRESSURE_MAX_LOOP_UTIL ?? 0.98
  })

  if (!process.env.FASTIFY_SESSION_SECRET) {
    app.log.warn('No FASTIFY_SESSION_SECRET environment variable set, using random secret')
  }
  return app
}
