const mammoth = require('mammoth')
const Joi = require('joi')


const categories = [
  'Farming',
  'Fishing',
  'Environment'
]

module.exports = [{
  method: 'GET',
  path: '/upload-document',
  options: {
    handler: (request, h) => {
      return h.view('upload-document', { categories })
    }
  }
},
{
  method: 'POST',
  path: '/upload-document',
  options: {
    //auth: { scope: [admin] },
    payload: {
      maxBytes: (50 * 1024 * 1024) + 250,
      multipart: true,
      timeout: false,
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    },
    validate: {
      payload: Joi.object({
        uploadtype: Joi.string().valid('file', 'text'),
        document: Joi.when('uploadtype', {
          is: 'file',
          then: Joi.object({
            hapi: Joi.object({
              filename: Joi.string().regex(/^(.+)\.(pdf|doc|docx)$/).message('Incorrect document file type. Must be .pdf, .doc or .docx.')
            }).required().unknown(true)
          }).required().unknown(true),
          otherwise: Joi.optional()
        }),
        usertext: Joi.when('uploadtype', {
          is: 'text',
          then: Joi.string().required(),
          otherwise: Joi.optional()
        }),
        category: Joi.string().valid('Farming', 'Fishing', 'Environment').required()
      }).required().unknown(true),
      failAction: (request, h, err) => {
        return h.view('upload-document', {
          categories,
          uploadtype: request.payload.uploadtype,
          filename: request.payload.document.hapi.filename,
          filetype: request.payload.document.hapi.filename.substr(request.payload.document.hapi.filename.lastIndexOf('.') + 1),
          usertext: request.payload.usertext,
          category: request.payload.category,
          err
        }).takeover(400)
      }
    },
    handler: async (request, h) => {

      // Upload the file or text

      // Generate embeddings, save to vector store

      // Redirect to next page

      ///////////return h.redirect(`${uploadConstants.routes.document.redirectToPlayground}?name=${filename}&persona=${persona}&version=${version}`)
    }
  }
}]
