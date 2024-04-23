const { keys } = require('../../constants/session')
const { setKnowledge } = require('./knowledge')
const { setMessage } = require('./message')

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getCreatedSession = (request) => {
  return get(request, keys.createdSession)
}

const setCreatedSession = (request, session) => {
  request.yar.set(keys.createdSession, session)
}

const clearSession = (request) => {
  setKnowledge(request, null)
  setMessage(request, null)
}

module.exports = {
  getCreatedSession,
  setCreatedSession,
  clearSession
}
