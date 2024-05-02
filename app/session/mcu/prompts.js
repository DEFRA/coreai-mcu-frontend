const { keys } = require('../../constants/session/prompts')
const { set, get } = require('./base')

const getPromptSession = (request, key = keys.selectedPrompt) => {
  return get(request, keys.entry, key) || ''
}

const setPromptSession = (request, value, key = keys.selectedPrompt) => {
  set(request, keys.entry, key, value)
}

const getPromptsSession = (request, key = keys.vendorPrompts) => {
  return get(request, keys.entry, key) || []
}

const setPromptsSession = (request, value, key = keys.vendorPrompts) => {
  set(request, keys.entry, key, value)
}

const clearAllPromptsSession = (request) => {
  request.yar.set(keys.entry, null)
}

module.exports = {
  getPromptSession,
  setPromptSession,
  getPromptsSession,
  setPromptsSession,
  clearAllPromptsSession
}
