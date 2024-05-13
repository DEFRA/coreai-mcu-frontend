const { parseISO } = require('date-fns')
const { formatInTimeZone } = require('date-fns-tz')
const { getResponses, finaliseResponse, updateFinalResponse, deleteResponses, getFinalisedResponse } = require('../api/responses')
const { LONDON } = require('../constants/time-zones')

const formatResponse = (response) => {
  const date = parseISO(response.timestamp)
  const generatedOn = formatInTimeZone(date, LONDON, 'dd/MM/yyyy HH:mm')

  return {
    response: response.response,
    documentId: response.document_id,
    llm: response.llm,
    userPrompt: response.user_prompt,
    citations: response.citations,
    documentSummary: response.document_summary,
    generatedOn
  }
}

const getLatestResponse = async (documentId) => {
  const responses = await getResponses(documentId)

  if (responses.length === 0) {
    return []
  }

  return formatResponse(responses[0])
}

const getAllResponses = async (id) => {
  const responses = await getResponses(id)

  return responses.map(formatResponse)
}

const getFinalResponse = async (projectName, documentId) => {
  const response = await getFinalisedResponse(projectName, documentId)

  return response
}

const saveFinalResponse = async (document) => {
  const datacontenttype = 'application/json'

  const responses = await finaliseResponse(document, datacontenttype)

  return responses
}

const updateFinalisedResponse = async (projectName, documentId, response) => {
  return updateFinalResponse(projectName, documentId, response)
}

const deleteAllResponses = async (id) => {
  await deleteResponses(id)
}

module.exports = {
  getLatestResponse,
  getAllResponses,
  getFinalResponse,
  saveFinalResponse,
  updateFinalisedResponse,
  deleteAllResponses
}
