const { keys } = require('../../constants/cdo')
const { setKnowledge } = require('./knowledge')
const { setMessage } = require('./message')

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getCreatedCdo = (request) => {
  return get(request, keys.createdCdo)
}

const setCreatedCdo = (request, cdo) => {
  request.yar.set(keys.createdCdo, cdo)
}

const clearCdo = (request) => {
  setKnowledge(request, null)
  setMessage(request, null)
}

module.exports = {
  getCreatedCdo,
  setCreatedCdo,
  clearCdo
}
