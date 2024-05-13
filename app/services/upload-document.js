const { uploadDocument, updateDocumentMetadata } = require('../api/documents')
const { mime } = require('../constants/document-types')
const { getExtension } = require('../lib/file')
const { sendTriageRequest } = require('../messaging/outbound/triage-request')

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
    uploadedBy: 'Jane Doe',
    documentType: payload.uploadtype,
    source: 'frontend',
    sourceAddress: 'dummy',
    userCategory: payload.category,
    targetMinister: 'dummy'
  }
}

const upload = async (payload) => {
  const { buffer, type } = getBuffer(payload)

  const { id } = await uploadDocument(buffer, type)

  const metadataPayload = buildMetadataPayload(payload)

  await updateDocumentMetadata(id, metadataPayload)

  await sendTriageRequest({ documentId: id })
}

module.exports = {
  upload
}
