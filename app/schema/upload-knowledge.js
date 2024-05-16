const Joi = require('joi')

const schema = Joi.object({
  uploadtype: Joi.string().valid('document', 'webpage'),
  title: Joi.string().required(),
  document: Joi.when('uploadtype', {
    is: 'document',
    then: Joi.object({
      hapi: Joi.object({
        filename: Joi.string().regex(/^(.+)\.(pdf|doc|docx)$/).message('Incorrect document file type. Must be .pdf, .doc or .docx.')
      }).required().unknown(true)
    }).required().unknown(true),
    otherwise: Joi.optional()
  }),
  url: Joi.when('uploadtype', {
    is: 'webpage',
    then: Joi.string().required(),
    otherwise: Joi.optional()
  }),
  category: Joi.string().valid('Farming', 'Fishing', 'Environment').required()
}).required().unknown(true)

module.exports = schema
