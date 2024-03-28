const Joi = require('joi')

const schema = {
  baseUrl: Joi.string().required()
}

const config = {
  baseUrl: process.env.DOCUMENTS_API_BASE_URL
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The message queue config is invalid. ${error.message}`)
}

module.exports = value
