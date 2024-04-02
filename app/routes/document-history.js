const { document, responses } = require('../models/constants')

module.exports = {
  method: 'GET',
  path: '/document/{id}/response/history',
  options: {
    handler: (request, h) => {
      const documentId = request.params.id

      return h.view('document-history', { documentId, document, responses })
    }
  }
}
