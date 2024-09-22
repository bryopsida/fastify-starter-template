#!/usr/bin/env node
import http from 'http'
import { getLogger } from './services/logger.js'

const logger = getLogger('healthcheck')

const options = {
  host: '127.0.0.1',
  port: process.env.FASTIFY_PORT || 3000,
  timeout: 2000,
  path: '/status',
  method: 'HEAD',
  headers: {
    'User-Agent': 'HealthCheckScript/1.0'
  }
}

const healthCheck = http.request(options, (res) => {
  logger.info(`HEALTHCHECK STATUS: ${res.statusCode}`)
  if (res.statusCode === 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

healthCheck.on('error', function (err) {
  logger.error({
    err: {
      message: err.message,
      stack: err.stack
    }
  }, 'ERROR')
  process.exit(1)
})

healthCheck.end()
