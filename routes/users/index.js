export default (fastify, opts, done) => {
  fastify.get('/', { preHandler: fastify.auth([fastify.verifySession, fastify.verifyJWT]) }, async (request, reply) => {
    const users = await fastify.userService.getUsers()
    return { users }
  })
  done()
}
