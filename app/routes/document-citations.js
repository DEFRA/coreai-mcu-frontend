const { admin } = require('../auth/permissions')
const { getResponses } = require('../api/responses')

module.exports = {
  method: 'GET',
  path: '/document/{docId}/response/citations',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const docId = request.params.docId
      const responses = await getResponses(docId)
      responses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      const citations = responses[0].citations
      return h.view('document-citations', { docId, citations }).code(201)
    }
  }
}
