export const errorResponseBody = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    statusCode: {
      type: 'integer'
    },
    code: {
      type: 'string'
    }
  }
}
