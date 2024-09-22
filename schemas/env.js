export default {
  type: 'object',
  required: ['FASTIFY_PORT', 'FASTIFY_HOST'],
  properties: {
    FASTIFY_PORT: {
      type: 'string',
      default: 3000
    },
    FASTIFY_HOST: {
      type: 'string',
      default: '0.0.0.0'
    }
  }
}
