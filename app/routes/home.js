const { getDocumentsData, getDocumentContent } = require('../services/documents')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (request, h) => {
      const documents = await getDocumentsData()

      for (let i = 0; i < documents.length; i++) {
        documents[i].contents = await getDocumentContent(documents[i].documentId)
      }

      return h.view('home', { documents }).code(201)
    }
  }
}
