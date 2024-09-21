'use strict'
import Fastify from 'fastify'
import helmet from '@fastify/helmet'
import etag from '@fastify/etag'
import secureSession from '@fastify/secure-session'
import csrfProtection from '@fastify/csrf-protection'
import underPressure from '@fastify/under-pressure'

const fastify = Fastify({
  logger: true
})

fastify.register(helmet)
fastify.register(etag)
fastify.register(secureSession, {
  secret: 'a string which is longer than 32 characters'
})
fastify.register(csrfProtection, { sessionPlugin: '@fastify/secure-session' })
fastify.register(underPressure, {
  maxEventLoopDelay: 1000,
  maxHeapUsedBytes: 100000000,
  maxRssBytes: 100000000,
  maxEventLoopUtilization: 0.98
})

fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
