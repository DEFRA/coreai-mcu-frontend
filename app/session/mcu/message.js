const { keys } = require('../../constants/cdo/message')

const set = (request, entryKey, key, value) => {
  const entryValue = request.yar?.get(entryKey) || {}
  entryValue[key] = typeof (value) === 'string' ? value.trim() : value
  request.yar.set(entryKey, entryValue)
}

const get = (request, entryKey, key) => {
  return key ? request.yar?.get(entryKey)?.[key] : request.yar?.get(entryKey)
}

const getMessage = (request) => {
  return get(request, keys.entry, keys.sessionMessage) || ''
}

const setMessage = (request, value) => {
  set(request, keys.entry, keys.sessionMessage, value)
}

module.exports = {
  getMessage,
  setMessage
}
