import fp from 'fastify-plugin'
export default fp(async (fastify, opts) => {
  fastify.decorate('verifySession', function (request, reply, done) {
    if (!request.session.get('user')) {
      done(new Error('Unauthorized'))
    } else {
      done()
    }
  })
})
