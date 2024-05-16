const { MessageSender } = require('ffc-messaging')
const { knowledgeTopic } = require('../../config/messaging')
const { KNOWLEDGE_INGESTION } = require('../../constants/events')

const createIngestMessage = (data) => ({
  body: {
    document_id: data.documentId,
    type: data.type
  },
  type: KNOWLEDGE_INGESTION,
  source: 'coreai-mcu-frontend'
})

const sendKnowledgeRequest = async (data) => {
  const sender = new MessageSender(knowledgeTopic)
  const type = data.type
  let message

  if (type === 'document' || type === 'webpage') {
    message = createIngestMessage(data)
  } else {
    throw new Error(`Unsupported upload type: ${type}`)
  }

  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = {
  sendKnowledgeRequest
}
