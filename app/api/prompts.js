const { get } = require('./base')
const { promptsApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const listPrompts = async (project = 'mcu', model, type) => {
  return get(`${baseUrl}/prompts/${project}/${model}/${type}`)
}

const listPrompt = async (project = 'mcu', model, type, name) => {
  return get(`${baseUrl}/prompts/${project}/${model}/${type}/${name}`)
}

module.exports = {
  listPrompts,
  listPrompt
}
