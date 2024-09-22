'use strict'
import buildApp from './app.js'

const app = buildApp({
  logger: true
})

try {
  await app.listen({ host: process.env.FASTIFY_HOST ?? '0.0.0.0', port: process.env.FASTIFY_PORT ?? 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
