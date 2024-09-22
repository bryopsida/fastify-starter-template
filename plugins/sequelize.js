import fp from 'fastify-plugin'
import db from '../db/index.js'
export default fp((fastify, opts, done) => {
  fastify.decorate('sequelize', db)
  fastify.addHook('onClose', async () => {
    await db.sequelize.close()
  })
  done()
}, {
  name: 'plugin-sequelize',
  dependencies: [],
  fastify: '5.x'
})
