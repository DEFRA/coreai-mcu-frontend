const { format, parseISO } = require('date-fns')
const { getDocuments, getDocumentMetadata } = require('../api/documents')

const formatDocument = (document) => {
  const date = parseISO(document.properties.createdOn)
  const formattedDate = format(date, 'dd/MM/yyyy')

  return {
    ...document,
    documentId: document.name,
    properties: {
      ...document.properties,
      createdOn: formattedDate
    }
  }
}

const formatDocuments = (documents) => {
  return documents.map(formatDocument)
}

const { getDocuments } = require('../api/documents')

const formatDocumentsData = (documentsJSONData) => {
  return documentsJSONData.map(
    item => {
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
  )
}

const getDocumentsData = async () => {
  try {
    const documents = await getDocuments()
    const documentsJSONData = JSON.parse(documents)

    return formatDocumentsData(documentsJSONData)

  } catch (error) {
    console.error('There was a problem getting documents data', error)
    throw error
  }
}

const getDocumentData = async (id) => {
  try {
    const document = await getDocumentMetadata(id)

    return formatDocument(document)
  } catch (error) {
    console.error('There was a problem getting document data', error)
    throw error
  }

}

module.exports = {
  getDocumentsData,
  getDocumentData
}
