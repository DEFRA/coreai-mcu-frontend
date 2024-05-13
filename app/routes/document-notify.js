const { admin } = require('../auth/permissions')
const { getLatestResponse, updateFinalisedResponse } = require('../services/responses')
const { sendCorrespondenceEmail } = require('../services/notify')
const { setMessageSession } = require('../session/mcu/message')
const { getDocumentData } = require('../services/documents')

module.exports = [{
  method: 'GET',
  path: '/document/{documentId}/notify',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.params.documentId

      return h.view('document-notify', { documentId }).code(200)
    }
  }
},
{
  method: 'POST',
  path: '/document/notify',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      const documentId = request.payload.documentId
      const emailAddress = request.payload.emailAddress
      const emailMessage = request.payload.emailMessage
      const content = await getLatestResponse(documentId)

      await sendCorrespondenceEmail(
        emailAddress,
        emailMessage,
        content
      )

      await updateFinalisedResponse('mcu', documentId)

      const document = await getDocumentData(documentId)
      setMessageSession(request, `Document ${document.metadata.fileName} has been completed and the response sent.`)

      return h.redirect('/documents/queue')
    }
  }
}]
