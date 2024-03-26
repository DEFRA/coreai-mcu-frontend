const { document, responses } = require('../models/constants')


module.exports = {
  method: 'GET',
  path: '/document-history',
  options: {
    handler: (request, h) => {
      const documentId = request.query.documentId

      return h.view('document-history', { documentId, document, responses })
    }
  }
}
