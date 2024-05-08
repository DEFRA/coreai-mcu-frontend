const { admin } = require('../auth/permissions')
const { getDocumentData } = require('../services/documents')
const { getLatestResponse, saveResponse, saveFinalResponse } = require('../services/responses')
const { setMessageSession } = require('../session/mcu/message')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/finalise',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.id
      const response = await getLatestResponse(documentId)

      return h.view('document-finalise', { documentId, response }).code(200)
    }
  }
},
{
  method: 'POST',
  path: '/document/finalise',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.payload.documentId

      const documentMetadata = {
        document_id: documentId,
        llm: 'user',
        user_prompt: '',
        citations: [],
        response: request.payload.usertext
      }

      await saveResponse(
        documentMetadata
      )

      const finaliseDocument = {
        project_name: 'mcu',
        document_id: documentId
      }

      await saveFinalResponse(finaliseDocument)

      if (request.payload.action === 'save_send') {
        return h.redirect(`/document/${documentId}/notify`)
      }

      if (request.payload.action === 'save_edited_response') {
        return h.redirect(`/document/${documentId}/finalise`)
      }

      const document = await getDocumentData(documentId)
      setMessageSession(request, `Document ${document.metadata.fileName} has been completed.`)

      return h.redirect('/documents/queue')
    }
  }
}]
