const DocumentsService = require('../services/documents')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (request, h) => {
      const documentsService = new DocumentsService()
      const documents = await documentsService.getDocumentsData()

      return h.view('home', { documents }).code(201)
    }
  }
}
