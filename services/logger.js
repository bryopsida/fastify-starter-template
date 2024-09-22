import pino from 'pino'

const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { destination: 1 }
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: './logs/error.log', mkdir: true }
      },
      {
        target: 'pino/file',
        options: { destination: './logs/combined.log', mkdir: true }
      }
    ]
  },
  timestamp: pino.stdTimeFunctions.isoTime
})

const healthCheckLogger = pino({
  level: 'error',
  transport: {
    target: 'pino/file',
    options: { destination: './logs/healthcheck.log', mkdir: true }
  },
  timestamp: pino.stdTimeFunctions.isoTime
})
const auditLogger = pino({
  level: 'trace',
  transport: {
    target: 'pino/file',
    options: { destination: './logs/audit.log', mkdir: true }
  },
  timestamp: pino.stdTimeFunctions.isoTime
})

const queryLogger = pino({
  level: 'trace',
  transport: {
    target: 'pino/file',
    options: { destination: './logs/query.log', mkdir: true }
  },
  timestamp: pino.stdTimeFunctions.isoTime
})

function buildChildLogger (loggerNameOrMeta, loggerInstance) {
  let meta = {}
  if (typeof loggerNameOrMeta === 'string') {
    meta.logger = loggerNameOrMeta
  } else {
    meta = {
      ...loggerNameOrMeta
    }
  }
  return loggerInstance.child(meta)
}

export function getLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, logger)
}

export function getHealthCheckLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, healthCheckLogger)
}

export function getAuditLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, auditLogger)
}

export function getQueryLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, queryLogger)
}
