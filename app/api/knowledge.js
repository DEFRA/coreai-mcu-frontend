const { get } = require('./base')
const { knowledgeApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const listKnowledge = async (category) => {
  return get(`${baseUrl}/knowledge?category=${category}`)
}

module.exports = {
  listKnowledge
}
