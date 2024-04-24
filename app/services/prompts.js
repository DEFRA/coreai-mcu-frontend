const { listPrompts, listPrompt } = require('../api/prompts')
const { setPromptsSession, getPromptsSession } = require('../session/mcu/prompts')

const getPrompts = async (request, project = 'mcu', model, type) => {
  let responses = getPromptsSession(request, `${model}_${type}`)

  if (responses.length === 0) {
    responses = await listPrompts(project, model, type)

    setPromptsSession(request, responses, `${model}_${type}`)
  }

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
