const { format, parseISO } = require('date-fns')
const { getResponses } = require('../api/responses')

const formatResponse = (response) => {
  const date = parseISO(response.timestamp)
  const generatedOn = format(date, 'dd/MM/yyyy HH:mm')

  return {
    response: response.response,
    documentId: response.document_id,
    llm: response.llm,
    userPrompt: response.userPrompt,
    citations: [],
    generatedOn
  }
}

const getLatestResponse = async (documentId) => {
  const responses = await getResponses(documentId)

  return formatResponse(responses[0])
}

module.exports = {
  getLatestResponse
}
