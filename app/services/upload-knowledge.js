const { uploadKnowledge, updateKnowledgeMetadata } = require('../api/knowledge')
const { mime } = require('../constants/document-types')
const { getExtension } = require('../lib/file')

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

const buildMetadataPayload = (payload) => {
  const fileName = payload.uploadtype === 'file'
    ? payload.document.hapi.filename
    : 'txt'

  return {
    fileName,
    title: payload.title,
    category: payload.category,
    source: 'frontend'
  }
}

const upload = async (payload) => {
  const { buffer, type } = getBuffer(payload)

  const { id } = await uploadKnowledge(buffer, type, payload.document.hapi.filename)

  const metadataPayload = buildMetadataPayload(payload)

  await updateKnowledgeMetadata(id, metadataPayload)

  return id
}

module.exports = {
  upload
}
