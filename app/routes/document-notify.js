const { admin } = require('../auth/permissions')
const { getDocumentData } = require('../services/documents')
const { getLatestResponse } = require('../services/responses')
const { sendCorrespondenceEmail } = require('../services/notify')
const { setMessage } = require('../session/mcu/message')

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

      const document = await getDocumentData(documentId)
      setMessage(request, `Document ${document.metadata.fileName} has been completed.`)

      return h.redirect(`/documents/queue`)
    }
  }
}]
