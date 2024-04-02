const { sendGenerationRequest } = require('../messaging/outbound/generation-request')
const { getLatestResponse } = require('../services/responses')
const { document } = require('../models/constants')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/response',
  options: {
    handler: async (request, h) => {
      const documentId = request.params.id

      const response = await getLatestResponse(documentId)

      return h.view('document-response', { document, response })
    }
  }
},
{
  method: 'POST',
  path: '/document/response',
  options: {
    handler: async (request, h) => {
      const documentId = request.payload.documentId

      if (request.payload.action === 'start_over') {
        return h.redirect(`/document/${documentId}/configure`)
      }

      await sendGenerationRequest({
        documentId,
        userPrompt: request.payload.usertext,
        knowledge: []
      })

      return h.redirect(`/document/${documentId}/response`)
    }
  }
}]
