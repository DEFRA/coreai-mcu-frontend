const Joi = require('joi')

const sharedConfigSchema = {
  appInsights: Joi.object(),
  host: Joi.string(),
  password: Joi.string(),
  username: Joi.string(),
  useCredentialChain: Joi.bool().default(false),
  managedIdentityClientId: Joi.string().when('useCredentialChain', { is: true, then: Joi.required(), otherwise: Joi.forbidden() })
}

const schema = Joi.object({
  generationTopic: {
    address: Joi.string().required(),
    type: Joi.string().required(),
    ...sharedConfigSchema
  },
  knowledgeTopic: {
    address: Joi.string().required(),
    type: Joi.string().required(),
    ...sharedConfigSchema
  },
  triageTopic: {
    address: Joi.string().required(),
    type: Joi.string().required(),
    ...sharedConfigSchema
  },
  eventsSubscription: {
    address: Joi.string().required(),
    topic: Joi.string().required(),
    type: Joi.string().required(),
    ...sharedConfigSchema
  }
})

const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.MESSAGE_QUEUE_HOST,
  password: process.env.MESSAGE_QUEUE_PASSWORD,
  username: process.env.MESSAGE_QUEUE_USER,
  useCredentialChain: process.env.NODE_ENV === 'production',
  managedIdentityClientId: process.env.NODE_ENV === 'production' ? process.env.AZURE_CLIENT_ID : undefined
}

const config = {
  generationTopic: {
    address: process.env.GENERATION_REQUEST_TOPIC,
    type: 'topic',
    ...sharedConfig
  },
  knowledgeTopic: {
    address: process.env.KNOWLEDGE_INGESTION_TOPIC,
    type: 'topic',
    ...sharedConfig
  },
  triageTopic: {
    address: process.env.TRIAGE_REQUEST_TOPIC,
    type: 'topic',
    ...sharedConfig
  },
  eventsSubscription: {
    address: process.env.EVENTS_SUBSCRIPTION,
    topic: process.env.EVENTS_TOPIC_ADDRESS,
    type: 'subscription',
    ...sharedConfig
  }
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The message queue config is invalid. ${error.message}`)
}

module.exports = value
