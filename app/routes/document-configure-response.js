const categories = [
  'Farming',
  'Fishing',
  'Environment'
]

module.exports = {
  method: 'GET',
  path: '/document-configure-response',
  options: {
    handler: (request, h) => {
      const DocumentID = request.query.DocumentID

      const document = {
        DocumentID: DocumentID,
        RelatedDocumentID: null,
        UploadedUser: 'A User',
        AssignedUser: 'A User',
        UploadedDate: '01/01/2001',
        DocumentType: 'docx',
        SuggestedCategory: 'Farming',
        UserCategory: 'Farming',
        Contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
        SourceName: 'A Constituent',
        SourceType: 'email',
        SourceAddress: 'constituent@example.com',
        TargetMinister: ''
      }

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

      return h.view('document-configure-response', { DocumentID, categories, document, personas, prompts, models })
    }
  }
}
