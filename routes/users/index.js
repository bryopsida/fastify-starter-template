import { toDTO } from '../../dtos/user.js'
import { errorResponseBody } from '../../schemas/commonResponses.js'

const userJsonSchema = {
  type: 'object',
  required: ['username', 'email'],
  properties: {
    id: { type: 'integer' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    username: { type: 'string' },
    role: { type: 'string' },
    email: { type: 'string' }
  }
}

export default (fastify, opts, done) => {
  fastify.addHook('preHandler', fastify.auth([
    fastify.verifySession,
    fastify.verifyJWT
  ]))
  fastify.get('/', async (request, reply) => {
    const users = await fastify.userService.getUsers()
    return { users }
  })
  fastify.get('/:username', {
    schema: {
      params: {
        type: 'object',
        properties: {
          username: { type: 'string' }
        }
      },
      response: {
        200: userJsonSchema,
        401: errorResponseBody
      }
    }
  }, async (request, reply) => {
    const user = await fastify.userService.getUserByUsername(request.params.username)
    return toDTO(user)
  })
  done()
}
