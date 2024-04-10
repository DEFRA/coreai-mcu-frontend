const { admin } = require('../auth/permissions')
const { getExtension } = require('../lib/file')
const { categories } = require('../models/constants')
const schema = require('../schema/upload-document')
const { upload } = require('../services/upload-document')

module.exports = [{
  method: 'GET',
  path: '/upload-document',
  options: {
    auth: { scope: [admin] },
    handler: (request, h) => {
      return h.view('upload-document', { categories })
    }
  }
},
{
  method: 'POST',
  path: '/upload-document',
  options: {
    auth: { scope: [admin] },
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
        return h.view('upload-document', {
          categories,
          uploadtype: request.payload.uploadtype,
          filename: request.payload.document.hapi.filename,
          filetype: getExtension(request.payload.document.hapi.filename),
          usertext: request.payload.usertext,
          category: request.payload.category,
          err
        }).takeover(400)
      }
    },
    handler: async (request, h) => {
      await upload(request.payload)

      return h.redirect('/documents/queue')
    }
  }
}]
