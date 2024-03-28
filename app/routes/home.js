const { documents } = require('../models/constants')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      return h.view('home', { documents })
    }
  }
}
