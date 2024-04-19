const { admin } = require('../auth/permissions')
const { getLatestResponse } = require('../services/responses')
const { sendCorrespondenceEmail } = require('../services/notify')

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

      return h.redirect(`/document/${documentId}/notify`)
    }
  }
}]
