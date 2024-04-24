const { listModels, listAllModels } = require('../api/models')
const { setModelsSession, getModelsSession } = require('../session/mcu/models')

const getModels = async (vendor = '') => {
  const responses = await listModels(vendor)

  return responses
}

const getAllModels = async (request) => {
  let responses = getModelsSession(request)

  if (responses.length === 0) {
    responses = await listAllModels()

    setModelsSession(request, responses)
  }

  return responses
}

module.exports = {
    getModels,
    getAllModels
}
