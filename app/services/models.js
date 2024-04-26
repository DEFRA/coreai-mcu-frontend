const { listVendorModels, listModels } = require('../api/models')
const { setModelsSession, getModelsSession } = require('../session/mcu/models')

const getModels = async (request) => {
  let responses = getModelsSession(request)

  if (responses.length === 0) {
    responses = await listModels()

    setModelsSession(request, responses)
  }

  return responses
}

const getVendorModels = async (vendor = '') => {
  const responses = await listVendorModels(vendor)

  return responses
}

module.exports = {
  getModels,
  getVendorModels
}
