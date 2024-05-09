const { admin } = require('../auth/permissions')
const { categories } = require('../models/constants')
const { getDocumentData, getDocumentContent } = require('../services/documents')
const { getModels } = require('../services/models')
const { getPrompts } = require('../services/prompts')
const { getAllKnowledge } = require('../services/knowledge')
const { getModelSession, setModelSession } = require('../session/mcu/models')
const { setPromptSession } = require('../session/mcu/prompts')
const { setKnowledgeSession } = require('../session/mcu/knowledge')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/configure',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.id
      const document = await getDocumentData(documentId)
      const contents = await getDocumentContent(documentId)
      const selectedModel = getModelSession(request)
      const models = await getModels()

      let prompts = []
      if (selectedModel && selectedModel !== '') {
        prompts = await getPrompts('mcu', selectedModel, 'correspondence')
      }
      const personas = []
      const knowledge = await getAllKnowledge()

      return h.view('document-configure-response', { documentId, contents, categories, document, models, selectedModel, personas, prompts, knowledge })
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

      const selectedModel = request.payload.model
      setModelSession(request, selectedModel)

      const selectedPrompt = request.payload.prompt
      setPromptSession(request, selectedPrompt)

      let selectedKnowledge = request.payload.knowledge
      setKnowledgeSession(request, selectedKnowledge)

      if (request.payload.action === 'next') {
        if (!Array.isArray(selectedKnowledge)) {
          selectedKnowledge = [selectedKnowledge]
        }
        setKnowledgeSession(request, selectedKnowledge)

        return h.redirect(`/document/${documentId}/response`)
      }

      return h.redirect(`/document/${documentId}/configure`)
    }
  }
}]
