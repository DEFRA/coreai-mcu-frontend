const Joi = require('joi')
const { getDocumentResponsesHistoryData } = require('../services/responses')

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
      try {
        const responses = await getDocumentResponsesHistoryData(
          request.params.id
        )

        const documentId = request.params.id

        return h.view('document-history', { responses, documentId })

      } catch(error) {
        console.log('ERROR:', error)
        return h.view('document-history', { error })
      }
    }
  }
}
