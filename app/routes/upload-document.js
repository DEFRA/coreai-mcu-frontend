const getUser = require('../auth/get-user')
const { admin } = require('../auth/permissions')
const { getExtension, getBuffer } = require('../lib/file')
const { categories } = require('../models/constants')
const schema = require('../schema/upload-document')
const { addDocument } = require('../services/documents')

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
      const { payload } = request

      const metadata = {
        fileName: payload.uploadtype === 'file' ? payload.document.hapi.filename : 'txt',
        documentType: payload.uploadtype,
        source: 'frontend',
        sourceAddress: 'dummy',
        userCategory: payload.category,
        targetMinister: 'dummy'
      }

      const { buffer, type } = getBuffer(payload)

      await addDocument(buffer, type, metadata, getUser(request).username)

      return h.redirect('/documents/queue')
    }
  }
}]
