const { keys } = require('../../constants/session/message')
const { set, get } = require('./base')

const getMessageSession = (request) => {
  return get(request, keys.entry, keys.sessionMessage) || ''
}

const setMessageSession = (request, value) => {
  set(request, keys.entry, keys.sessionMessage, value)
}

module.exports = {
  getMessageSession,
  setMessageSession
}
