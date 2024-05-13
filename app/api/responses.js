const { get, post, put, del } = require('./base')
const { responsesApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const getResponses = async (documentId) => {
  return get(`${baseUrl}/responses/${documentId}`)
}

const getFinalisedResponse = async (projectName, documentId) => {
  return get(`${baseUrl}/responses/finalise/${projectName}/${documentId}`)
}

const finaliseResponse = async (document, contentType) => {
  const headers = {
    'Content-Type': contentType
  }

  return post(`${baseUrl}/responses/finalise`, document, headers)
}

const updateFinalResponse = async (projectName, documentId, response) => {
  return put(`${baseUrl}/responses/finalise/${projectName}/${documentId}`, { response })
}

const deleteResponses = async (documentId) => {
  return del(`${baseUrl}/responses/${documentId}`)
}

module.exports = {
  getResponses,
  getFinalisedResponse,
  finaliseResponse,
  updateFinalResponse,
  deleteResponses
}
