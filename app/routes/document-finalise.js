const { admin } = require('../auth/permissions')
const { getDocumentData } = require('../services/documents')
const { getFinalResponse } = require('../services/responses')
const { setMessageSession } = require('../session/mcu/message')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/finalise',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.id

      const response = await getFinalResponse('mcu', documentId)

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
      const { documentId } = request.payload

      if (request.payload.action === 'save_send') {
        return h.redirect(`/document/${documentId}/notify`)
      }

      const document = await getDocumentData(documentId)
      setMessageSession(request, `Document ${document.metadata.fileName} has been completed.`)

      return h.redirect('/documents/queue')
    }
  }
}]
