const { listPersonas, listPersona } = require('../api/personas')

const getPersonas = async (request, project = 'mcu', type) => {
  const responses = await listPersonas(project, type)

  return responses
}


const getPersona = async (project = 'mcu', type, name) => {
  const response = await listPersona(project, type, name)

  return response
}

module.exports = {
  getPersonas,
  getPersona
}
