const Joi = require('joi')
const { getAllResponses } = require('../services/responses')

module.exports = {
  method: 'GET',
  path: '/document/{id}/response/history',
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().uuid().required()
      })
    },
    handler: async (request, h) => {
      const documentId = request.params.id

      const responses = await getAllResponses(documentId)

      return h.view('document-history', { responses, documentId })
    }
  }
}
