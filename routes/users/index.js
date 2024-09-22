export default (fastify, opts, done) => {
  fastify.get('/', async (request, reply) => {
    const users = await fastify.userService.getUsers()
    return { users }
  })
  done()
}
