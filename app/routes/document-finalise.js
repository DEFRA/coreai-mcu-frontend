const { admin } = require('../auth/permissions')
const { getLatestResponse, saveResponse } = require('../services/responses')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/finalise',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.id
      const response = await getLatestResponse(documentId)

      return h.view('document-finalise', { documentId, response }).code(200)
    }
  }
},
{
  method: 'POST',
  path: '/document/finalise',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.payload.documentId

      const document = {
        document_id: documentId,
        llm: 'user',
        user_prompt: '',
        citations: [],
        response: request.payload.usertext
      }
      console.log(document)

      await saveResponse(
        document
      )

      if (request.payload.action === 'save_send') {
        return h.redirect(`/document/${documentId}/notify`)
      }

      return h.redirect(`/document/${documentId}/finalise`)
    }
  }
}]
