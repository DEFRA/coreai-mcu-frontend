const { keys } = require('../../constants/session/knowledge')
const { set, get } = require('./base')

const getKnowledgeSession = (request) => {
  return get(request, keys.entry, keys.documentKnowledge) || []
}

const setKnowledgeSession = (request, value) => {
  set(request, keys.entry, keys.documentKnowledge, value)
}

const addKnowledgeSession = (request, value) => {
  const entryValue = get(request)

  entryValue.push(value)

  request.yar.set(keys.entry, entryValue)
}

const removeKnowledgeSession = (request, value) => {
  const entryValue = get(request)

  if (entryValue.indexOf(value) !== -1) {
    entryValue.splice(entryValue.indexOf(value), 1)

    request.yar.set(keys.entry, entryValue)
  }
}

const clearAllKnowledgeSession = (request) => {
  request.yar.set(keys.entry, null)
}

module.exports = {
  getKnowledgeSession,
  setKnowledgeSession,
  addKnowledgeSession,
  removeKnowledgeSession,
  clearAllKnowledgeSession
}
