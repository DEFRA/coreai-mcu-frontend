const { admin } = require('../auth/permissions')
const { clearCdo } = require('../session/cdo')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    auth: { scope: [admin] },
    handler: async (request, h) => {
      clearCdo(request)
      return h.view('home').code(200)
    }
  }
}
