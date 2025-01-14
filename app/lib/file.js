const { mime } = require('../constants/document-types')

const getExtension = (filename) => {
  return filename.substr(filename.lastIndexOf('.') + 1)
}

const getBuffer = (payload) => {
  let buffer
  let ext

  if (payload.uploadtype === 'file') {
    buffer = payload.document._data
    ext = getExtension(payload.document.hapi.filename)
  } else {
    buffer = Buffer.from(payload.usertext)
    ext = 'txt'
  }

  const type = mime[ext]

  return { buffer, type }
}

module.exports = {
  getExtension,
  getBuffer
}
