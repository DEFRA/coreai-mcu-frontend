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

  if (responses.length === 0) {
    return []
  }

  return formatResponse(responses[0])
}

const getDocumentResponsesHistoryData = async (id) => {
  try {
      const responses = await getResponses(
        id
      )

      return JSON.parse(responses)

  } catch (error) {
      console.error('There was a problem getting documents history responses data', error)
      throw error
  }
}

module.exports = {
  getLatestResponse,
    getDocumentResponsesHistoryData
}
