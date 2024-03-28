const { get, post, put } = require('./base')
const config = require('../config/documents-api')

const baseUrl = config.baseUrl

console.log(baseUrl)

const getDocuments = async () => {
  console.log(`${baseUrl}/documents`)
  return get(`${baseUrl}/documents`)
}

const getDocumentById = async (id) => {
  return get(`${baseUrl}/documents/${id}`)
}

const getDocumentMetadata = async (id) => {
  return get(`${baseUrl}/documents/${id}/metadata`)
}

const uploadDocument = async (document, contentType) => {
  const headers = {
    'Content-Type': contentType
  }

  return post(`${baseUrl}/documents`, document, headers)
}

const updateDocumentMetadata = async (id, metadata) => {
  return put(`${baseUrl}/documents/${id}`, metadata)
}

module.exports = {
  getDocuments,
  getDocumentById,
  getDocumentMetadata,
  uploadDocument,
  updateDocumentMetadata
}
