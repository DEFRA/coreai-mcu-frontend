const Joi = require('joi')
const { admin } = require('../auth/permissions')
const { getAllResponses } = require('../services/responses')
const { getDocumentContent } = require('../services/documents')

module.exports = {
  method: 'GET',
  path: '/document/{id}/response/history',
  options: {
    auth: { scope: [admin] },
    validate: {
      params: Joi.object({
        id: Joi.string().uuid().required()
      })
    },
    handler: async (request, h) => {
      const documentId = request.params.id

      const contents = await getDocumentContent(documentId)
      const responses = await getAllResponses(documentId)

      return h.view('document-history', { documentId, contents, responses })
    }
  }
}
