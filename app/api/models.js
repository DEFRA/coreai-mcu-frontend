const { get } = require('./base')
const { promptsApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const listModels = async (vendor = '') => {
  return get(`${baseUrl}/models?deploymentVendor=${vendor}`)
}

const listAllModels = async () => {
  return get(`${baseUrl}/allmodels`)
}

module.exports = {
  listModels,
  listAllModels
}
