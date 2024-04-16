const { admin } = require('../auth/permissions')
const { sendGenerationRequest } = require('../messaging/outbound/generation-request')
const { getLatestResponse } = require('../services/responses')
const { getDocumentData, getDocumentContent } = require('../services/documents')
const { registerClient } = require('../sse')
const { getFromSession } = require('../session')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/response',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.id
      const knowledge = getFromSession(request, 'knowledge')

      const document = await getDocumentData(documentId)
      const contents = await getDocumentContent(documentId)
      const response = await getLatestResponse(documentId)

      return h.view('document-response', { document, contents, response })
    }
  }
},
{
  method: 'GET',
  path: '/document/{id}/response/events',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const res = h.event({ data: 'open' })

      registerClient(request.params.id, h)

      return res
    }
  }
},
{
  method: 'POST',
  path: '/document/response',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.payload.documentId

      if (request.payload.action === 'start_over') {
        return h.redirect(`/document/${documentId}/configure`)
      }

      const knowledge = getFromSession(request, 'knowledge')

      await sendGenerationRequest({
        documentId,
        userPrompt: request.payload.usertext,
        knowledge
      })

      return h.redirect(`/document/${documentId}/response`)
    }
  }
}]
