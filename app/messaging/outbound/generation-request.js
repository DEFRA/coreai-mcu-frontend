const { MessageSender } = require('ffc-messaging')
const { generationTopic } = require('../../config/messaging')
const { GENERATION_REQUEST } = require('../../constants/events')

const createMessage = (data) => ({
  body: {
    document_id: data.documentId,
    user_prompt: data.userPrompt,
    knowledge: data.knowledge
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