import fp from 'fastify-plugin'
export default fp(async (fastify, opts) => {
  fastify.decorate('verifySession', async function (request, reply) {
    if (!request.session.get('user')) {
      reply.code(401).send({ error: 'Unauthorized' })
    }
  })
})
