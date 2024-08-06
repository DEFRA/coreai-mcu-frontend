const { get, post, put } = require('./base')
const { knowledgeApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const listKnowledge = async (category = '') => {
  return get(`${baseUrl}/knowledge`)
}

const uploadKnowledge = async (knowledge, contentType, fileName) => {
  const headers = {
    'Content-Type': contentType,
    'filename': fileName
  }

  return post(`${baseUrl}/knowledge`, knowledge, headers)
}

const updateKnowledgeMetadata = async (id, metadata) => {
  return put(`${baseUrl}/knowledge/${id}`, metadata)
}

module.exports = {
  listKnowledge,
  uploadKnowledge,
  updateKnowledgeMetadata
}
