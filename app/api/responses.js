const { get, post } = require('./base')
const { responsesApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const getResponses = async (docId) => {
  return get(`${baseUrl}/responses/${docId}`)
}

const uploadResponse = async (document, contentType) => {
  const headers = {
    'Content-Type': contentType
  }

  return post(`${baseUrl}/responses`, document, headers)
}

module.exports = {
  getResponses,
  uploadResponse
}
