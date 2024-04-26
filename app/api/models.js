const { get } = require('./base')
const { promptsApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const listModels = async () => {
  return get(`${baseUrl}/models`)
}

const listVendorModels = async (vendor = '') => {
  return get(`${baseUrl}/vendormodels?deploymentVendor=${vendor}`)
}

module.exports = {
  listModels,
  listVendorModels
}
