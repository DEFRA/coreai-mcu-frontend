const { parseISO } = require('date-fns')
const { formatInTimeZone } = require('date-fns-tz')
const { LONDON } = require('../constants/time-zones')
const { getDocuments, getDocumentContents, getDocumentMetadata } = require('../api/documents')

const formatDocument = (document) => {
  const date = parseISO(document.properties.createdOn)
  const formattedDate = formatInTimeZone(date, LONDON, 'dd/MM/yyyy HH:mm')

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

const getDocumentsData = async () => {
  try {
    const documents = await getDocuments()

    return formatDocuments(documents)
  } catch (error) {
    console.error('There was a problem getting documents data', error)
    throw error
  }
}

const getDocumentContent = async (id) => {
  try {
    const document = await getDocumentContents(id)

    return document.toString()
  } catch (error) {
    console.error('There was a problem getting document contents', error)
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
  getDocumentContent,
  getDocumentData
}
