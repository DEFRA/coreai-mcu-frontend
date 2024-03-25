const categories = [
  'Farming',
  'Fishing',
  'Environment'
]

const document = {
  DocumentID: 1,
  RelatedDocumentID: null,
  UploadedUser: 'A User',
  AssignedUser: 'A User',
  UploadedDate: '01/01/2001',
  DocumentType: 'docx',
  SuggestedCategory: 'Farming',
  UserCategory: 'Farming',
  Contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
  SourceName: 'Mr A Test',
  SourceType: 'email',
  SourceAddress: 'test_a@example.com',
  TargetMinister: ''
}

let responses = [
  {
    ResponseID: 1,
    ParentResponseID: null,
    DocumentID: 1,
    ResponseDate: '01/01/2001 12:00:00',
    PersonaID: 1,
    PromptID: 1,
    PromptText: '',
    ContextKnowledge: [1, 2, 3],
    ModelVendor: 'OpenAI',
    LLMModel: 'ChatGPT3.5',
    ModelResponse: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis lacus, tristique eu convallis non, accumsan in arcu. Ut sodales ultrices orci. Phasellus a ipsum lectus. Fusce tincidunt rutrum est, quis iaculis eros lobortis sed. Duis pulvinar iaculis justo. Nulla nec mattis ligula, a auctor ipsum. Nunc semper est non tempus venenatis.

    Nunc at consequat arcu. Integer vitae neque faucibus, blandit neque non, pharetra augue. Aenean eu tincidunt risus. Praesent quis egestas nibh. Nunc pellentesque pulvinar interdum. Fusce dignissim ultrices ante, maximus molestie purus rhoncus vel. Maecenas molestie semper sodales.

    Ut tortor nibh, egestas a lorem eget, faucibus lobortis elit. Nunc molestie porttitor tortor, at rhoncus risus efficitur mollis. Integer id mi eu enim tempus ultrices sed vel enim. Sed euismod eros maximus, tristique nisi a, aliquam est. Aenean ornare diam vel ligula ullamcorper, vitae gravida turpis pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse a malesuada magna. Ut sed libero sagittis turpis convallis viverra in volutpat nibh. Quisque tellus quam`,
    UserResponse: null,
    ResponseSent: false
  },
  {
    ResponseID: 2,
    ParentResponseID: 1,
    DocumentID: 1,
    ResponseDate: '01/01/2001 12:01:00',
    PersonaID: 1,
    PromptID: 1,
    PromptText: '',
    ContextKnowledge: [1, 2, 3],
    ModelVendor: 'OpenAI',
    LLMModel: 'ChatGPT3.5',
    ModelResponse: null,
    UserResponse: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis lacus, tristique eu convallis non, accumsan in arcu. Ut sodales ultrices orci. Phasellus a ipsum lectus. Fusce tincidunt rutrum est, quis iaculis eros lobortis sed. Duis pulvinar iaculis justo. Nulla nec mattis ligula, a auctor ipsum. Nunc semper est non tempus venenatis.`,
    ResponseSent: false
  },
  {
    ResponseID: 3,
    ParentResponseID: 2,
    DocumentID: 1,
    ResponseDate: '01/01/2001 12:00:00',
    PersonaID: 1,
    PromptID: 1,
    PromptText: '',
    ContextKnowledge: [1, 2, 3],
    ModelVendor: 'OpenAI',
    LLMModel: 'ChatGPT3.5',
    ModelResponse: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis lacus, tristique eu convallis non, accumsan in arcu. Ut sodales ultrices orci. Phasellus a ipsum lectus. Fusce tincidunt rutrum est, quis iaculis eros lobortis sed. Duis pulvinar iaculis justo. Nulla nec mattis ligula, a auctor ipsum. Nunc semper est non tempus venenatis.

    Nunc at consequat arcu. Integer vitae neque faucibus, blandit neque non, pharetra augue. Aenean eu tincidunt risus. Praesent quis egestas nibh. Nunc pellentesque pulvinar interdum. Fusce dignissim ultrices ante, maximus molestie purus rhoncus vel. Maecenas molestie semper sodales.

    Ut tortor nibh, egestas a lorem eget, faucibus lobortis elit. Nunc molestie porttitor tortor, at rhoncus risus efficitur mollis. Integer id mi eu enim tempus ultrices sed vel enim. Sed euismod eros maximus, tristique nisi a, aliquam est. Aenean ornare diam vel ligula ullamcorper, vitae gravida turpis pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse a malesuada magna. Ut sed libero sagittis turpis convallis viverra in volutpat nibh. Quisque tellus quam`,
    UserResponse: null,
    ResponseSent: false
  }
]

const personas = [
  {
    PersonaID: 1,
    Title: 'Government official',
    Persona: 'Government official',
    TargetLLM: 'ChatGPT3'
  }
]

const prompts = [
  {
    PromptID: 1,
    Title: 'Ministerial correspondence',
    Prompt: 'You are a....',
    TargetLLM: 'ChatGPT3'
  }
]

const models = [
  {
    Vendor: 'OpenIA',
    Model: 'ChatGPT3'
  }
]

responses = responses.map(x => ({
  ...x,
  PersonaTitle: personas.find(p => p.PersonaID === x.PersonaID).Title,
  PromptTitle: prompts.find(p => p.PromptID === x.PromptID).Title
}))


module.exports = [{
  method: 'GET',
  path: '/document-response',
  options: {
    handler: (request, h) => {
      const DocumentID = request.query.DocumentID

      return h.view('document-response', { DocumentID, categories, document, responses, personas, prompts, models })
    }
  }
},
{
  method: 'POST',
  path: '/document-response',
  options: {
    handler: (request, h) => {
      const DocumentID = request.payload.DocumentID

      if (request.payload.action == 'Generate') {

        //
      } else if (request.payload.action == 'History') {
        return h.redirect(`/document-history?DocumentID=${DocumentID}`)
      } else if (request.payload.action == 'Start') {
        return h.redirect(`/document-configure-response?DocumentID=${DocumentID}`)
      }

      return h.view('document-response', { DocumentID, categories, document, responses, personas, prompts, models })
    }
  }
}]
