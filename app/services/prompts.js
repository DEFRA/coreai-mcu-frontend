const { listPrompts, listPrompt } = require('../api/prompts')

const getPrompts = async (project = 'mcu', model, type) => {
  const responses = await listPrompts(project, model, type)

  return responses
}

const getPrompt = async (project = 'mcu', model, type, name) => {
  const responses = await listPrompt(project, model, type, name)

  return responses
}

module.exports = {
  getPrompts,
  getPrompt
}
