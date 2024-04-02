const { getDocuments } = require('../api/documents')

class DocumentsService {

    constructor() {}

    async getDocumentsData() {
        try {
            const documents = await getDocuments()
 
            return JSON.parse(documents)

        } catch (error) {
            console.error('There was a problem getting documents data', error)
            throw error
        }
    }
}

module.exports = DocumentsService
