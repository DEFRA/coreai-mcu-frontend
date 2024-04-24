const { keys } = require('../../constants/session/models')
const { set, get } = require('./base')

const getModelsSession = (request) => {
  return get(request, keys.entry, keys.vendorModels) || []
}

const setModelsSession = (request, value) => {
  set(request, keys.entry, keys.vendorModels, value)
}

const clearAllModelsSession = (request) => {
  request.yar.set(keys.entry, null)
}

module.exports = {
  getModelsSession,
  setModelsSession,
  clearAllModelsSession
}
