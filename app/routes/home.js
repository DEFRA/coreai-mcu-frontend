const { admin } = require('../auth/permissions')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      return h.view('home').code(200)
    }
  }
}
