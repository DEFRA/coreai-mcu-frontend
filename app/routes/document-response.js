const { sendGenerationRequest } = require('../messaging/outbound/generation-request')
const { categories, document, responses, personas, prompts, models } = require('../models/constants')

module.exports = [{
  method: 'GET',
  path: '/document-response',
  options: {
    handler: (request, h) => {
      const documentId = request.query.documentId

      const fullResponses = responses.map(x => ({
        ...x,
        PersonaTitle: personas.find(p => p.personaId === x.personaId).title,
        PromptTitle: prompts.find(p => p.promptId === x.promptId).title
      }))

      return h.view('document-response', { documentId, categories, document, responses: fullResponses, personas, prompts, models })
    }
  }
},
{
  method: 'POST',
  path: '/document-response',
  options: {
    handler: async (request, h) => {
      const documentId = request.payload.documentId

      if (request.payload.action === 'Generate') {
        await sendGenerationRequest({
          documentId,
          userPrompt: request.payload.usertext,
          knowledge: []
        })
        return h.redirect(`/document-response?documentId=${documentId}`)
      } else if (request.payload.action === 'History') {
        return h.redirect(`/document-history?documentId=${documentId}`)
      } else if (request.payload.action === 'Start') {
        return h.redirect(`/document-configure-response?documentId=${documentId}`)
      }

      const fullResponses = responses.map(x => ({
        ...x,
        PersonaTitle: personas.find(p => p.personaId === x.personaId).title,
        PromptTitle: prompts.find(p => p.promptId === x.promptId).title
      }))

      return h.view('document-response', { documentId, categories, document, responses: fullResponses, personas, prompts, models })
    }
  }
}]
