const { MessageSender } = require('ffc-messaging')
const { generationTopic } = require('../../config/messaging')
const { GENERATION_REQUEST } = require('../../constants/events')

const createMessage = (data) => ({
  body: {
    document_id: data.documentId,
    knowledge: data.knowledge,
    model_id: data.modelId,
    prompt_id: data.promptId,
    persona_id: data.personaId,
    user_prompt: data.userPrompt,
    project_name: 'mcu',
    type: 'briefing'
  },
  type: GENERATION_REQUEST,
  source: 'coreai-mcu-frontend'
})

const sendGenerationRequest = async (data) => {
  const sender = new MessageSender(generationTopic)

  const message = createMessage(data)

  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = {
  sendGenerationRequest
}
