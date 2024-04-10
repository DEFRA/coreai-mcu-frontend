
const { admin } = require('../auth/permissions')
const { getDocumentsData, getDocumentContent } = require('../services/documents')

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

      return h.view('document-queue', { documents }).code(201)
    }
  }
}