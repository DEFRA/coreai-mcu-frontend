const { getExtension } = require('../lib/file')
const { categories } = require('../models/constants')
const schema = require('../schema/upload-knowledge')
const { upload, saveUri } = require('../services/upload-knowledge')

module.exports = [{
  method: 'GET',
  path: '/upload-knowledge',
  options: {
    handler: (request, h) => {
      return h.view('upload-knowledge', { categories })
    }
  }
},
{
  method: 'POST',
  path: '/upload-knowledge',
  options: {
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
      if (request.payload.uploadtype === 'file') {
        await upload(request.payload)
      } else {
        await saveUri(request.payload)
      }

      return h.redirect('/')
    }
  }
}]
