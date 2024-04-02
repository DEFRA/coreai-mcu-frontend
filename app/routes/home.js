const { getDocumentsData } = require('../services/documents')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (request, h) => {
      const documents = await getDocumentsData()

      return h.view('home', { documents }).code(201)
    }
  }
}
