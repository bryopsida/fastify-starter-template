import userRoutes from './users/index.js'
import authRoutes from './auth/index.js'

export default (fastify, opts, done) => {
  fastify.register(authRoutes, { prefix: 'v1/auth' })
  fastify.register(userRoutes, { prefix: 'v1/users' })
  done()
}
