import { Umzug, SequelizeStorage } from 'umzug'
import { getQueryLogger } from '../services/logger.js'

import db from './models/index.js'

const logger = getQueryLogger('umzug')

const umzug = new Umzug({
  migrations: {
    glob: './db/migrations/*.js',
    resolve: ({ name, path, context }) => {
      return {
        name,
        path,
        up: async () => {
          const migration = await import(path)
          return migration.up(context, db.Sequelize)
        },
        down: async () => {
          const migration = await import(path)
          return migration.up(context, db.Sequelize)
        }
      }
    }
  },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: db.sequelize }),
  logger
})

export async function runMigrations () {
  await umzug.up()
}
