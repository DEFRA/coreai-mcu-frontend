const { format, parseISO } = require('date-fns');
const { getDocuments } = require('../api/documents')

class DocumentsService {

    constructor() {}
 
    formatDocumentsData(documentsJSONData) {
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

    async getDocumentsData(id = null) {
        try {
            const documents = id ? await getDocuments(id) : await getDocuments()
            const documentsJSONData = JSON.parse(documents)

            return this.formatDocumentsData(documentsJSONData)

        } catch (error) {
            console.error('There was a problem getting documents data', error)
            throw error
        }
    }
}

module.exports = DocumentsService
