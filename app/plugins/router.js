const routes = [].concat(
  require('../routes/home'),
  require('../routes/upload-document'),
  require('../routes/document-configure-response'),
  require('../routes/document-response'),
  require('../routes/document-history'),
  require('../routes/document-citations'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
