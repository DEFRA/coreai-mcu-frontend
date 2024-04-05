const { sendGenerationRequest } = require('../messaging/outbound/generation-request')
const { getLatestResponse } = require('../services/responses')
const { getDocumentData } = require('../services/documents')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/response',
  options: {
    handler: async (request, h) => {
      const documentId = request.params.id

      const document = await getDocumentData(documentId)
      const response = await getLatestResponse(documentId)

      for (const citation of response.citations) {
        const locations = citation.content.reduce((acc, content) => {
          const location = content.loc
          acc.push({ ...location })
          return acc
        }, [])
        citation.locations = locations.sort((a, b) => a.lines.from - b.lines.from)
      }
      console.dir(response, { depth: null })
      
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
