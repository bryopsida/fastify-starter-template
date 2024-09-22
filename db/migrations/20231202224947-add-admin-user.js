'use strict'
import { getLogger, getAuditLogger } from '../../services/logger.js'
import { randomBytes } from 'crypto'
import { hash } from 'argon2'

const loggerName = 'adminSeed'
const auditLogger = getAuditLogger(loggerName)
const logger = getLogger(loggerName)

function dualLog (msg) {
  logger.warn(msg)
  auditLogger.warn(msg)
}

export async function up (queryInterface, Sequelize) {
  let password = process.env.ADMIN_PASSWORD
  if (password == null) {
    password = randomBytes(16).toString('hex')
    dualLog(`Generated a random admin password ${password}, change it ASAP!`)
  }
  await queryInterface.bulkInsert('Users', [
    {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@localhost',
      username: 'admin',
      roleId: 0,
      password: await hash(password),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
}

export async function down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', { username: 'admin' })
}
