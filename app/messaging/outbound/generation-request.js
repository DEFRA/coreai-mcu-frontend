const { MessageSender } = require('ffc-messaging')
const { generationSubscription } = require('../../config/messaging')
const { GENERATION_REQUEST } = require('../../constants/events')

const createMessage = (data) => ({
  body: {
    document_id: data.documentId,
    userPrompt: data.userPrompt,
    knowledge: data.knowledge
  },
  type: GENERATION_REQUEST,
  source: 'coreai-mcu-frontend'
})

const sendGenerationRequest = async (data) => {
  const sender = new MessageSender(generationSubscription)

  const message = createMessage(data)

  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = {
  sendGenerationRequest
}