import fp from 'fastify-plugin'

export default fp((fastify, opts, done) => {
  fastify.decorate('verifyJWT', async function (request, reply, done) {
    try {
      await request.jwtVerify()
      done()
    } catch (err) {
      done(err)
    }
  })
  done()
})
