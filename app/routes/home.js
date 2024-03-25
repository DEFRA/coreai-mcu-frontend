module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      const documents = [
        {
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
        },
        {
          DocumentID: 2,
          RelatedDocumentID: null,
          UploadedUser: 'A User',
          AssignedUser: 'A User',
          UploadedDate: '01/02/2001',
          DocumentType: 'docx',
          SuggestedCategory: 'Fishing',
          UserCategory: 'Fishing',
          Contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
          SourceName: 'Mr B Test',
          SourceType: 'email',
          SourceAddress: 'test_b@example.com',
          TargetMinister: ''
        },
        {
          DocumentID: 3,
          RelatedDocumentID: null,
          UploadedUser: 'A User',
          AssignedUser: 'A User',
          UploadedDate: '01/04/2001',
          DocumentType: 'docx',
          SuggestedCategory: 'Farming',
          UserCategory: 'Farming',
          Contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
          SourceName: 'Mr C Test',
          SourceType: 'email',
          SourceAddress: 'test_c@example.com',
          TargetMinister: ''
        }
      ]

      return h.view('home', { documents })
    }
  }
}
