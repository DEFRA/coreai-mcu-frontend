const { get, post, put, del } = require('./base')
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

const finaliseResponse = async (document, contentType) => {
  const headers = {
    'Content-Type': contentType
  }

  return post(`${baseUrl}/responses/finalise`, document, headers)
}

const updateFinalResponse = async (projectName, documentId) => {
  return put(`${baseUrl}/responses/finalise/${projectName}/${documentId}`, {})
}

const deleteResponses = async (docId) => {
  return del(`${baseUrl}/responses/${docId}`)
}

module.exports = {
  getResponses,
  uploadResponse,
  finaliseResponse,
  updateFinalResponse,
  deleteResponses
}
