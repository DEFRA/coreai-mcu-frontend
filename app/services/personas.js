const { listPersonas, listPersona } = require('../api/personas')

const getPersonas = async (request, project = 'mcu', type) => {
  const personas = await listPersonas(project, type)
  return personas
}

const getPersona = async (project = 'mcu', type, name) => {
  const persona = await listPersona(project, type, name)

  return persona
}

module.exports = {
  getPersonas,
  getPersona
}
