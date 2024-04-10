const { admin } = require('../auth/permissions')
const { getLatestResponse } = require('../services/responses')

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
      console.log(request.payload)
      if (request.payload.action === 'save_send') {
        return h.redirect(`/document/${documentId}/notify`)
      }

      return h.redirect(`/document/${documentId}/finalise`)
    }
  }
}]