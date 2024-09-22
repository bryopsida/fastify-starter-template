'use strict'
import buildApp from './app.js'
import { runMigrations } from './db/migrations.js'
import { getLogger } from './services/logger.js'

const app = buildApp({
  loggerInstance: getLogger('app')
})

try {
  await runMigrations()
  await app.listen({ host: process.env.FASTIFY_HOST ?? '0.0.0.0', port: process.env.FASTIFY_PORT ?? 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
