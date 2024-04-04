const clients = new Map()

const registerClient = (documentId, h) => {
  const clientArray = clients.get(documentId)

  if (clientArray && clientArray.length > 0) {
    clientArray.push(h)
  } else {
    clients.set(documentId, [h])
  }
}

const sendEvent = (documentId, event) => {
  const clientArray = clients.get(documentId)

  if (clientArray) {
    clientArray.forEach(client => {
      console.log('sending event to client')
      client.event({ data: { ...event } })
    })
  }
}

module.exports = {
  registerClient,
  sendEvent
}
