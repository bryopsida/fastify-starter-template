import SQLite from 'sqlite3'
import { getQueryLogger } from '../../services/logger.js'

const logger = getQueryLogger('sequelize')

export default {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || 'data/db.sqlite',
  migrationStorageTableName: 'db_migration_history',
  seederStorageTableName: 'db_seed_history',
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX
  },
  logging: (msg) => logger.info(msg)
}
