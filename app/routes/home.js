const { admin } = require('../auth/permissions')
const { clearSession } = require('../session/mcu')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      clearSession(request)
      return h.view('home').code(200)
    }
  }
}
