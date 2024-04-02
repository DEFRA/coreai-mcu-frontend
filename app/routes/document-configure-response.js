const { categories, document, personas, prompts, models } = require('../models/constants')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/configure',
  options: {
    handler: (request, h) => {
      const documentId = request.params.id

      return h.view('document-configure-response', { documentId, categories, document, personas, prompts, models })
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
