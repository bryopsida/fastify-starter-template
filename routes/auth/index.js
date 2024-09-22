const loginBodyJsonSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  }
}

const refreshJwtBodyJsonSchema = {
  type: 'object',
  required: ['refresh_token'],
  properties: {
    refresh_token: { type: 'string' }
  }
}
export default (fastify, opts, done) => {
  fastify.post('/login', {
    schema: {
      body: loginBodyJsonSchema
    }
  }, async (request, reply) => {
    const { username, password } = request.body
    const user = await fastify.authnService.verifyUser(username, password)
    request.session.set('user', user)
    reply.send({ message: 'Logged in' })
  })

  fastify.post('/jwt', {
    schema: {
      body: loginBodyJsonSchema
    }
  }, async (request, reply) => {
    const { username, password } = request.body
    const user = await fastify.authnService.verifyUser(username, password)
    const token = fastify.jwt.sign({ user })
    reply.send({ token })
  })

  fastify.post('/refresh-jwt', {
    schema: {
      body: refreshJwtBodyJsonSchema
    }
  }, async (request, reply) => {
    throw new Error('Not implemented')
  })

  fastify.post('/logout', {
    preHandler: fastify.auth([fastify.verifySession, fastify.verifyJWT])
  }, async (request, reply) => {
    request.session.delete()
    reply.send({ message: 'Logged out' })
  })

  fastify.get('/profile', {
    preHandler: fastify.auth([fastify.verifySession, fastify.verifyJWT])
  }, async (request, reply) => {
    reply.send(request.session.get('user'))
  })

  done()
}
