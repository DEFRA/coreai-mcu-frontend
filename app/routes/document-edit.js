const Joi = require('joi')

const { admin } = require('../auth/permissions')
const { getFinalResponse, updateFinalisedResponse } = require('../services/responses')

module.exports = [{
  method: 'GET',
  path: '/document/{id}/finalise/edit',
  options: {
    auth: { scope: [admin] },
    validate: {
      params: Joi.object({
        id: Joi.string().uuid().required()
      })
    },
    handler: async (request, h) => {
      const documentId = request.params.id
      const response = await getFinalResponse('mcu', documentId)

      return h.view('document-edit', { documentId, response }).code(200)
    }
  }
},
{
  method: 'POST',
  path: '/document/finalise/edit',
  options: {
    auth: { scope: [admin] },
    validate: {
      payload: Joi.object({
        documentId: Joi.string().uuid().required(),
        usertext: Joi.string().required()
      })
    },
    handler: async (request, h) => {
      const { documentId, usertext } = request.payload

      await updateFinalisedResponse('mcu', documentId, usertext)

      return h.redirect(`/document/${documentId}/finalise`)
    }
  }
}]
