const Wreck = require('@hapi/wreck')

const getOptions = (headers) => ({
  headers: {
    ...headers
  },
  json: true
})

const get = async (url, json) => {
  const options = {
    ...getOptions(),
    json
  }
  
  const { payload } = await Wreck.get(url, options)

  return payload
}

const post = async (url, payload, headers) => {
  const options = {
    ...getOptions(headers),
    payload
  }

  const { payload } = await Wreck.post(url, options)

  return payload
}

const put = async (url, payload) => {
  const options = {
    ...getOptions(headers),
    payload
  }
  
  const { payload } = await Wreck.put(url, options)

  return payload
}
