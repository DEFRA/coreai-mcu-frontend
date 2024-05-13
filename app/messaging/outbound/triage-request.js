const { MessageSender } = require('ffc-messaging')
const { triageTopic } = require('../../config/messaging')
const { TRIAGE_REQUEST } = require('../../constants/events')

const createMessage = (data) => ({
  body: {
    document_id: data.documentId
  },
  type: TRIAGE_REQUEST,
  source: 'coreai-mcu-frontend'
})

const sendTriageRequest = async (data) => {
  const sender = new MessageSender(triageTopic)
  const message = createMessage(data)

  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = {
  sendTriageRequest
}
