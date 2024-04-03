const createServer = require('./server')
const messaging = require('./messaging')

const init = async () => {
  const server = await createServer()
  await server.start()
  console.log('Server running on %s', server.info.uri)
  await messaging.start()
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

process.on('SIGTERM', async () => {
  await messaging.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await messaging.stop()
  process.exit(0)
})

init()
