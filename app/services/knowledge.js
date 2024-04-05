const { format, parseISO } = require('date-fns')
const { listKnowledge } = require('../api/knowledge')

const formatKnowledge = (knowledge) => {
  const date = parseISO(knowledge.properties.lastModified)
  const lastModified = format(date, 'dd/MM/yyyy HH:mm')

  return {
    documentId: knowledge.name,
    ...knowledge.metadata,
    lastModified
  }
}

const getAllKnowledge = async (category) => {
  const responses = await listKnowledge(category)

  return responses.map(formatKnowledge)
}

module.exports = {
  getAllKnowledge
}
