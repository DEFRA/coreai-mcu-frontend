const routes = [].concat(
  require('../routes/home'),
  require('../routes/authenticate'),
  require('../routes/login'),
  require('../routes/logout'),
  require('../routes/dev-auth'),
  require('../routes/upload-document'),
  require('../routes/document-configure-response'),
  require('../routes/document-response'),
  require('../routes/document-history'),
  require('../routes/upload-knowledge'),
  require('../routes/document-queue'),
  require('../routes/document-citations'),
  require('../routes/document-finalise'),
  require('../routes/document-edit'),
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
