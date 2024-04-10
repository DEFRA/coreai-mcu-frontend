const { getLatestResponse } = require('../services/responses')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/finalise',
  options: {
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
    handler: async (request, h) => {
      const documentId = request.payload.documentId
      console.log(request.payload)
      if (request.payload.action === 'save_send') {
        return h.redirect(`/document/${documentId}/notify`)
      }

      return h.redirect(`/document/${documentId}/finalise`)
    }
  }
}]