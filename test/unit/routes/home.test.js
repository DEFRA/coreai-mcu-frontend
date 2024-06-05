const home = require('../../../app/routes/home')
const Session = require('../../mocks/session')

describe('/home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return success', async () => {
    const mockRequest = {
      yar: Session
    }

    const mockH = {
      view: jest.fn(() => ({
        ...mockH
      })),
      code: jest.fn()
    }

    await home.options.handler(mockRequest, mockH)

    expect(mockH.view).toHaveBeenCalled()
    expect(mockH.code).toHaveBeenCalledWith(200)
  })
})
