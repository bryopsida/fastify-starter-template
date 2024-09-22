import userRoutes from './users/index.js'

export default (fastify, opts, done) => {
  fastify.register(userRoutes, { prefix: 'v1/users' })
  done()
}
