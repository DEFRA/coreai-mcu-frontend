const categories = [
  'Farming',
  'Fishing',
  'Environment'
]

const documents = [
  {
    documentId: '11b1fc57-9a1c-4a24-9ab0-84362edd144f',
    relatedDocumentId: null,
    uploadedUser: 'A User',
    assignedUser: 'A User',
    uploadedDate: '01/01/2001',
    documentType: 'docx',
    suggestedCategory: 'Farming',
    userCategory: 'Farming',
    contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    sourceName: 'Mr A Test',
    sourceType: 'email',
    sourceAddress: 'test_a@example.com',
    targetMinister: ''
  },
  {
    documentId: 2,
    relatedDocumentId: null,
    uploadedUser: 'A User',
    assignedUser: 'A User',
    uploadedDate: '01/02/2001',
    documentType: 'docx',
    suggestedCategory: 'Fishing',
    userCategory: 'Fishing',
    contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    sourceName: 'Mr B Test',
    sourceType: 'email',
    sourceAddress: 'test_b@example.com',
    targetMinister: ''
  },
  {
    documentId: 3,
    relatedDocumentId: null,
    uploadedUser: 'A User',
    assignedUser: 'A User',
    uploadedDate: '01/04/2001',
    documentType: 'docx',
    suggestedCategory: 'Farming',
    userCategory: 'Farming',
    contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    sourceName: 'Mr C Test',
    sourceType: 'email',
    sourceAddress: 'test_c@example.com',
    targetMinister: ''
  }
]

const document = documents[0]

const responses = [
  {
    responseId: 1,
    parentResponseId: null,
    documentId: 1,
    responseDate: '01/01/2001 12:00:00',
    personaId: 1,
    promptId: 1,
    promptText: '',
    contextKnowledge: [1, 2, 3],
    modelVendor: 'OpenAI',
    LLMModel: 'ChatGPT3.5',
    modelResponse: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis lacus, tristique eu convallis non, accumsan in arcu. Ut sodales ultrices orci. Phasellus a ipsum lectus. Fusce tincidunt rutrum est, quis iaculis eros lobortis sed. Duis pulvinar iaculis justo. Nulla nec mattis ligula, a auctor ipsum. Nunc semper est non tempus venenatis.

    Nunc at consequat arcu. Integer vitae neque faucibus, blandit neque non, pharetra augue. Aenean eu tincidunt risus. Praesent quis egestas nibh. Nunc pellentesque pulvinar interdum. Fusce dignissim ultrices ante, maximus molestie purus rhoncus vel. Maecenas molestie semper sodales.

    Ut tortor nibh, egestas a lorem eget, faucibus lobortis elit. Nunc molestie porttitor tortor, at rhoncus risus efficitur mollis. Integer id mi eu enim tempus ultrices sed vel enim. Sed euismod eros maximus, tristique nisi a, aliquam est. Aenean ornare diam vel ligula ullamcorper, vitae gravida turpis pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse a malesuada magna. Ut sed libero sagittis turpis convallis viverra in volutpat nibh. Quisque tellus quam`,
    userResponse: null,
    responseSent: false
  },
  {
    responseId: 2,
    parentResponseId: 1,
    documentId: 1,
    responseDate: '01/01/2001 12:01:00',
    personaId: 1,
    promptId: 1,
    promptText: '',
    contextKnowledge: [1, 2, 3],
    modelVendor: 'OpenAI',
    LLMModel: 'ChatGPT3.5',
    modelResponse: null,
    userResponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis lacus, tristique eu convallis non, accumsan in arcu. Ut sodales ultrices orci. Phasellus a ipsum lectus. Fusce tincidunt rutrum est, quis iaculis eros lobortis sed. Duis pulvinar iaculis justo. Nulla nec mattis ligula, a auctor ipsum. Nunc semper est non tempus venenatis.',
    responseSent: false
  },
  {
    responseId: 3,
    parentResponseId: 2,
    documentId: 1,
    responseDate: '01/01/2001 12:00:00',
    personaId: 1,
    promptId: 1,
    promptText: '',
    contextKnowledge: [1, 2, 3],
    modelVendor: 'OpenAI',
    LLMModel: 'ChatGPT3.5',
    modelResponse: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis lacus, tristique eu convallis non, accumsan in arcu. Ut sodales ultrices orci. Phasellus a ipsum lectus. Fusce tincidunt rutrum est, quis iaculis eros lobortis sed. Duis pulvinar iaculis justo. Nulla nec mattis ligula, a auctor ipsum. Nunc semper est non tempus venenatis.

    Nunc at consequat arcu. Integer vitae neque faucibus, blandit neque non, pharetra augue. Aenean eu tincidunt risus. Praesent quis egestas nibh. Nunc pellentesque pulvinar interdum. Fusce dignissim ultrices ante, maximus molestie purus rhoncus vel. Maecenas molestie semper sodales.

    Ut tortor nibh, egestas a lorem eget, faucibus lobortis elit. Nunc molestie porttitor tortor, at rhoncus risus efficitur mollis. Integer id mi eu enim tempus ultrices sed vel enim. Sed euismod eros maximus, tristique nisi a, aliquam est. Aenean ornare diam vel ligula ullamcorper, vitae gravida turpis pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse a malesuada magna. Ut sed libero sagittis turpis convallis viverra in volutpat nibh. Quisque tellus quam`,
    userResponse: null,
    responseSent: false
  }
]

const personas = [
  {
    personaId: 1,
    title: 'Government official',
    persona: 'Government official',
    targetLLM: 'ChatGPT3'
  }
]

const prompts = [
  {
    promptId: 1,
    title: 'Ministerial correspondence',
    prompt: 'You are a....',
    targetLLM: 'ChatGPT3'
  }
]

const models = [
  {
    vendor: 'OpenIA',
    model: 'ChatGPT3'
  }
]

module.exports = {
  categories,
  documents,
  document,
  responses,
  personas,
  prompts,
  models
}
