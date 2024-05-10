const { keys } = require('../../constants/session/personas')
const { set, get } = require('./base')

const getPersonaSession = (request, key = keys.selectedPersona) => {
  return get(request, keys.entry, key) || ''
}

const setPersonaSession = (request, value, key = keys.selectedPersona) => {
  set(request, keys.entry, key, value)
}

const clearAllPersonasSession = (request) => {
  request.yar.set(keys.entry, null)
}

module.exports = {
  getPersonaSession,
  setPersonaSession,
  clearAllPersonasSession
}
