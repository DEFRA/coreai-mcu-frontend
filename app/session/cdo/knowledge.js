const { keys } = require('../../constants/cdo/knowledge')

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || []
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getKnowledge = (request) => {
  return get(request, keys.entry) || []
}

const setKnowledge = (request, value) => {
  set(request, keys.entry, value)
}

const addKnowledge = (request, value) => {
  const entryValue = get(request)

  entryValue.push(value)

  request.yar.set(keys.entry, entryValue)
}

const removeKnowledge = (request, value) => {
  const entryValue = get(request)

  if (entryValue.indexOf(value) !== -1) {
    entryValue.splice(entryValue.indexOf(value), 1)

    request.yar.set(keys.entry, entryValue)
  }
}

const clearAllKnowledge = (request) => {
  request.yar.set(keys.entry, null)
}

module.exports = {
  getKnowledge,
  setKnowledge,
  addKnowledge,
  removeKnowledge,
  clearAllKnowledge
}
