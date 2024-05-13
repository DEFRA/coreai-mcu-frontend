const { get } = require('./base')
const { personasApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const listPersonas = async (project = 'mcu', type) => {
  return get(`${baseUrl}/personas/${project}/${type}`)
}

const listPersona = async (project = 'mcu', type, name) => {
  return get(`${baseUrl}/personas/${project}/${type}/${name}`)
}

module.exports = {
  listPersonas,
  listPersona
}
