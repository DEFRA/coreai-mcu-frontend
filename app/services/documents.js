const { format, parseISO } = require('date-fns')
const { getDocuments } = require('../api/documents')

const formatDocument = (document) => {
  const date = parseISO(item.properties.createdOn)
  const formattedDate = format(date, 'dd/MM/yyyy')

  return {
    ...item,
    properties: {
      ...item.properties,
      createdOn: formattedDate
    }
  }
}

const formatDocuments = (documentsJSONData) => {
  return documentsJSONData.map(formatDocument)
}

const getDocumentsData = async () => {
  try {
    const documents = await getDocuments()
    const documentsJSONData = JSON.parse(documents)

    return formatDocuments(documentsJSONData)
  } catch (error) {
    console.error('There was a problem getting documents data', error)
    throw error
  }
}

module.exports = {
  getDocumentsData
}
