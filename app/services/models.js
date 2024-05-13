const { listModels, listVendorModels } = require('../api/models')

const getModels = async () => {
  const responses = await listModels()

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
