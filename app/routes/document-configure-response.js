const { categories, document, personas, prompts, models } = require('../models/constants')

module.exports = {
  method: 'GET',
  path: '/document-configure-response',
  options: {
    handler: (request, h) => {
      const documentId = request.query.documentId

      return h.view('document-configure-response', { documentId, categories, document, personas, prompts, models })
    }
  }
}
