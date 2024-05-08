const { keys } = require('../../constants/session')
const { get } = require('./base')
const { setKnowledgeSession } = require('./knowledge')
const { setMessageSession } = require('./message')

const getCreatedSession = (request) => {
  return get(request, keys.createdSession)
}

const setCreatedSession = (request, session) => {
  request.yar.set(keys.createdSession, session)
}

const clearSession = (request) => {
  setKnowledgeSession(request, null)
  setMessageSession(request, null)
}

module.exports = {
  getCreatedSession,
  setCreatedSession,
  clearSession
}
