const { documents } = require('../models/constants')
const { getDocuments } = require('../api/documents')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (request, h) => {

      // this needs to be moved into a controller / service and called from here. the result being passed into the view
      const documentsData = await getDocuments()
      const documents = JSON.parse(documentsData.toString())
      // end

      return h.view('home', { documents }).code(201)
    }
  }
}
