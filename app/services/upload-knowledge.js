const { uploadKnowledge, updateKnowledgeMetadata } = require('../api/knowledge')
const { mime } = require('../constants/document-types')
const { getExtension } = require('../lib/file')

const getBuffer = (payload) => {
  const buffer = payload.document._data
  const ext = getExtension(payload.document.hapi.filename)

  const type = mime[ext]

  return { buffer, type }
}

const buildMetadataPayload = (payload) => {
  let fileName, source

  if (payload.uploadtype === 'document') {
    fileName = payload.document.hapi.filename
    source = 'frontend'
  } else if (payload.uploadtype === 'webpage') {
    fileName = payload.url
    source = 'web'
  } else {
    throw new Error(`Unsupported upload type: ${payload.uploadtype}`)
  }

  return {
    fileName,
    title: payload.title,
    category: payload.category,
    source
  }
}

const upload = async (payload) => {
  let id
  if (payload.uploadtype === 'document') {
    const { buffer, type } = getBuffer(payload)
    const knowledge = await uploadKnowledge(buffer, type)
    id = knowledge.id
  }

  const metadataPayload = buildMetadataPayload(payload)

  await updateKnowledgeMetadata(id, metadataPayload)

  return id
}

module.exports = {
  upload
}
