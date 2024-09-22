import fp from 'fastify-plugin'
import { UsersService } from '../services/users.js'
export default fp((fastify, opts, done) => {
  fastify.decorate('userService', new UsersService(fastify.sequelize))
  done()
}, {
  name: 'plugin-users',
  dependencies: ['plugin-sequelize'],
  fastify: '5.x'
})
