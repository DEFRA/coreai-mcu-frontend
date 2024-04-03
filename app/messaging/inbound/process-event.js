const util = require('util')
const { validateEventMessage } = require('./event-schema')
const { RESPONSE_PUBLISHED } = require('../../constants/events')

const processEvent = async (message, receiver) => {
  try {
    const body = validateEventMessage(message.body)
    console.log(`Processing event: ${util.inspect(body)}`)

    if (body.type === RESPONSE_PUBLISHED) {
      console.log('response published event for document: ', body.data.document_id)
    }

    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Error processing ingestion:', err)

    await receiver.deadLetterMessage(message)
  }
}

module.exports = {
  processEvent
}