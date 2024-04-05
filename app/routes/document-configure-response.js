const { categories, document, personas, prompts, models } = require('../models/constants')
const { getDocumentContent } = require('../services/documents')
const { getAllKnowledge } = require('../services/knowledge')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/configure',
  options: {
    handler: async (request, h) => {
      const documentId = request.params.id
      const contents = await getDocumentContent(documentId)
      const knowledge = await getAllKnowledge('')

      return h.view('document-configure-response', { documentId, contents, categories, document, personas, prompts, models, knowledge })
    }
  }
},
{
  method: 'POST',
  path: '/document/configure',
  options: {
    handler: async (request, h) => {
      const documentId = request.payload.documentId
      return h.redirect(`/document/${documentId}/response`)
    }
  }
}]
