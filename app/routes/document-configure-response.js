const { admin } = require('../auth/permissions')
const { categories, document, personas, prompts } = require('../models/constants')
const { getDocumentContent } = require('../services/documents')
const { getAllModels } = require('../services/models')
const { getAllKnowledge } = require('../services/knowledge')
const { setKnowledgeSession } = require('../session/mcu/knowledge')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/configure',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.id
      const contents = await getDocumentContent(documentId)
      const models = await getAllModels(request)
      const knowledge = await getAllKnowledge()

      return h.view('document-configure-response', { documentId, contents, categories, document, models, personas, prompts, knowledge })
    }
  }
},
{
  method: 'POST',
  path: '/document/configure',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.payload.documentId
      let knowledge = request.payload.knowledge
      if (!Array.isArray(knowledge)) {
        knowledge = [knowledge]
      }

      setKnowledgeSession(request, knowledge)

      return h.redirect(`/document/${documentId}/response`)
    }
  }
}]
