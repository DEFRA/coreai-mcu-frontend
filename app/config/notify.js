const Joi = require('joi')
const uuidRegex = '[0-9a-f]{8}\\b-[0-9a-f]{4}\\b-[0-9a-f]{4}\\b-[0-9a-f]{4}\\b-[0-9a-f]{12}'
const notifyApiKeyRegex = new RegExp(`.*-${uuidRegex}-${uuidRegex}`)

const schema = Joi.object({
  apiKey: Joi.string().pattern(notifyApiKeyRegex),
  carbonCopyEmailAddress: Joi.string().email().allow(null, ''),
  templateIdCorrespondence: Joi.string().uuid()
})

const config = {
  apiKey: process.env.NOTIFY_API_KEY,
  carbonCopyEmailAddress: process.env.CARBON_COPY_EMAIL_ADDRESS,
  templateIdCorrespondence: process.env.NOTIFY_TEMPLATE_ID_CORRESPONDENCE
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`Notify config is invalid. ${error.message}`)
}

module.exports = value
