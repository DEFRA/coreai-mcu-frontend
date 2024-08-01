const { get, post, put } = require('./base')
const { documentsApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const getDocuments = async (user) => {
  const query = user ? `?uploadedBy=${user}` : ''

  return get(`${baseUrl}/documents${query}`)
}

const getDocumentById = async (id) => {
  return get(`${baseUrl}/documents/${id}`, false)
}

const getDocumentContents = async (id) => {
  return get(`${baseUrl}/documents/${id}/contents`)
}

const getDocumentMetadata = async (id) => {
  return get(`${baseUrl}/documents/${id}/metadata`)
}

const uploadDocument = async (document, contentType, user) => {
  const headers = {
    'Content-Type': contentType,
    'x-uploaded-by': user
  }

  return post(`${baseUrl}/documents`, document, headers)
}

const updateDocumentMetadata = async (id, metadata) => {
  return put(`${baseUrl}/documents/${id}`, metadata)
}

module.exports = {
  getDocuments,
  getDocumentById,
  getDocumentContents,
  getDocumentMetadata,
  uploadDocument,
  updateDocumentMetadata
}
