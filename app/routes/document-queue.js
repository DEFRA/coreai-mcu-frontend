const { admin } = require('../auth/permissions')
const { getDocumentsData, getDocumentContent } = require('../services/documents')
const { getMessageSession, setMessageSession } = require('../session/mcu/message')

module.exports = {
  method: 'GET',
  path: '/documents/queue',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documents = await getDocumentsData()

      for (let i = 0; i < documents.length; i++) {
        documents[i].contents = await getDocumentContent(documents[i].documentId)
      }

      const message = getMessageSession(request)
      if (message && message !== '') {
        setMessageSession(request, null)
      }

      return h.view('document-queue', { documents, message }).code(201)
    }
  }
}
