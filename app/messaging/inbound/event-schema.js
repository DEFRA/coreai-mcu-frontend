const Joi = require('joi')

const schema = Joi.object({
  specversion: Joi.string().required(),
  type: Joi.string().required(),
  source: Joi.string().required(),
  id: Joi.string().uuid().required(),
  partitionKey: Joi.string().optional(),
  time: Joi.date().required(),
  subject: Joi.string().default('None'),
  datacontenttype: Joi.string().default('None'),
  data: Joi.any().default({})
}).required()

const validateEventMessage = (event) => {
  const { value, error } = schema.validate(event)

  if (error) {
    throw new Error(`Invalid event message: ${error.message}`)
  }

  return value
}

module.exports = {
  validateEventMessage
}
