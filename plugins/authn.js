import fp from 'fastify-plugin'
import { AuthNService } from '../services/authn.js'
export default fp((fastify, opts, done) => {
  if (fastify.userService === undefined) {
    done(new Error('userService should be defined'))
    return
  }
  fastify.decorate('authnService', new AuthNService(fastify.userService))
  done()
}, {
  name: 'plugin-authn',
  dependencies: ['plugin-users'],
  fastify: '5.x'
})
