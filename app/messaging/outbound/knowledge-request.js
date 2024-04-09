const { MessageSender } = require('ffc-messaging')
const { knowledgeTopic } = require('../../config/messaging')
const { KNOWLEDGE_INGESTION } = require('../../constants/events')

const createMessage = (data) => ({
  body: {
    document_id: data.documentId
  },
  type: KNOWLEDGE_INGESTION,
  source: 'coreai-mcu-frontend'
})

const sendKnowledgeRequest = async (data) => {
  const sender = new MessageSender(knowledgeTopic)

  const message = createMessage(data)

  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = {
  sendKnowledgeRequest
}
