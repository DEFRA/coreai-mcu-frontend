const { admin } = require('../auth/permissions')
const { getExtension } = require('../lib/file')
const { categories } = require('../models/constants')
const schema = require('../schema/upload-knowledge')
const { upload } = require('../services/upload-knowledge')
const { sendKnowledgeRequest } = require('../messaging/outbound/knowledge-request')

module.exports = [{
  method: 'GET',
  path: '/upload-knowledge',
  options: {
    auth: { scope: [admin] },
    handler: (request, h) => {
      return h.view('upload-knowledge', { categories })
    }
  }
},
{
  method: 'POST',
  path: '/upload-knowledge',
  options: {
    auth: { scope: [admin] },
    headers: {
      filename: 'test'
    },
    payload: {
      maxBytes: (50 * 1024 * 1024) + 250,
      multipart: true,
      timeout: false,
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    },
    validate: {
      payload: schema,
      failAction: (request, h, err) => {
        return h.view('upload-knowledge', {
          categories,
          uploadtype: request.payload.uploadtype,
          filename: request.payload.document.hapi.filename,
          filetype: getExtension(request.payload.document.hapi.filename),
          uri: request.payload.uri,
          title: request.payload.title,
          category: request.payload.category,
          err
        }).takeover(400)
      }
    },
    handler: async (request, h) => {
      console.log(request.headers)
      const documentId = await upload(request.payload)

      await sendKnowledgeRequest({
        documentId
      })

      return h.redirect('/')
    }
  }
}]
